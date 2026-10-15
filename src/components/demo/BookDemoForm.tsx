"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";
import { useToast } from "@/components/site/Providers";
import { Button, IconButton } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Stepper } from "@/components/ui/Stepper";
import {
  DEMO_BOOKING_DAYS,
  DEMO_MINUTES,
  DEMO_PREP,
  DEMO_SLOTS,
  DEMO_STEPS,
  DEMO_TIME_ZONES,
  DEMO_TOPICS,
  DEMO_VOLUMES,
  parseTopics,
  type DemoTimeZone,
} from "@/components/demo/data";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Details = { name: string; email: string; company: string; phone: string; volume: string; topics: string[]; note: string };
type DetailErrors = Partial<Record<"name" | "email" | "company", string>>;

/* ---------- Dates ---------- */

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const fmtDay = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
const fmtMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

/** Weekdays after today, up to DEMO_BOOKING_DAYS ahead. */
const isBookable = (d: Date, today: Date) => d.getDay() % 6 !== 0 && d > today && d <= addDays(today, DEMO_BOOKING_DAYS);

/** Each day offers a stable, different subset of slots (prototype rule). */
const slotsFor = (d: Date) => DEMO_SLOTS.filter((_, i) => (i * 5 + d.getDate() * 7 + d.getMonth()) % 4 !== 0);

/** The viewer's US zone when it's one we list, else Eastern. */
function guessTimeZone(): string {
  try {
    const iana = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return DEMO_TIME_ZONES.find((z) => z.iana === iana)?.value ?? "ET";
  } catch {
    return "ET";
  }
}

/** "9:30 AM" → [9, 30]; "1:00 PM" → [13, 0]. */
function parseSlot(slot: string): [number, number] {
  const [, h, m, ap] = /^(\d+):(\d+) (AM|PM)$/.exec(slot) ?? ["", "9", "0", "AM"];
  return [(Number(h) % 12) + (ap === "PM" ? 12 : 0), Number(m)];
}

/** Downloads a one-event .ics for the booked call. */
function downloadIcs(day: Date, slot: string, zone: DemoTimeZone) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const [h, m] = parseSlot(slot);
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
  const end = new Date(start.getTime() + DEMO_MINUTES * 60_000);
  const local = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FlipAndShare//Book a demo//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${stamp}-${local(start)}@flipandshare.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${zone.iana}:${local(start)}`,
    `DTEND;TZID=${zone.iana}:${local(end)}`,
    "SUMMARY:FlipAndShare demo",
    "DESCRIPTION:30 minutes with a publishing specialist. Bring a recent issue PDF.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "flipandshare-demo.ics" });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ---------- Form ---------- */

/** Reads `?topic=` so CTAs like "Plan my migration" can pre-select topics. */
function BookDemoFromUrl() {
  return <BookDemoForm initialTopics={parseTopics(useSearchParams().get("topic"))} />;
}

/**
 * Book a demo card: details → calendar → confirmation. The prerendered HTML holds the form without
 * URL topics; it swaps in the URL-aware form on the client.
 */
export function BookDemo() {
  return (
    <Suspense fallback={<BookDemoForm />}>
      <BookDemoFromUrl />
    </Suspense>
  );
}

/**
 * The three steps (prototype L1519-1556). Booking is client-side only: wire `book()` to the
 * scheduling service / CRM in production.
 */
export function BookDemoForm({ initialTopics = [] }: { initialTopics?: string[] }) {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<Details>({
    name: "",
    email: "",
    company: "",
    phone: "",
    volume: "",
    topics: initialTopics,
    note: "",
  });
  const [errors, setErrors] = useState<DetailErrors>({});

  // Calendar state. `today` is captured when the calendar opens, so nothing date-based renders on the server.
  const [today, setToday] = useState<Date | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [tz, setTz] = useState("ET");
  const [slotError, setSlotError] = useState("");

  // Move focus to the new step so keyboard and screen-reader users land on it.
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.focus({ preventScroll: true });
    // Keep the step tabs in view below the sticky header.
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 96) window.scrollBy({ top: top - 96, behavior: "smooth" });
  }, [step]);

  const set = <K extends keyof Details>(key: K, value: Details[K]) => {
    setDetails((d) => ({ ...d, [key]: value }));
    if (key in errors)
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof DetailErrors];
        return next;
      });
  };

  const submitDetails = (e: FormEvent) => {
    e.preventDefault();
    const next: DetailErrors = {};
    if (!details.name.trim()) next.name = "Enter your name.";
    if (!EMAIL.test(details.email.trim())) next.email = "Enter a valid work email.";
    if (!details.company.trim()) next.company = "Enter your company.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!today) {
      setToday(startOfDay(new Date()));
      setTz(guessTimeZone());
    }
    setStep(1);
  };

  const book = () => {
    if (!day || !time) {
      setSlotError("Pick a day and a time.");
      return;
    }
    setSlotError("");
    setStep(2);
  };

  const zone = DEMO_TIME_ZONES.find((z) => z.value === tz) ?? DEMO_TIME_ZONES[0];
  const when = day && time ? `${fmtDay(day)} at ${time} ${zone.short}` : "";
  const firstName = details.name.trim().split(/\s+/)[0] || "there";

  return (
    <div ref={cardRef} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-form">
      <Stepper variant="tabs" tinted steps={DEMO_STEPS} current={step} label="Booking steps" />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="group"
        aria-label={`Step ${step + 1} of ${DEMO_STEPS.length}: ${DEMO_STEPS[step].label}`}
        className="outline-none"
      >
        {step === 0 && (
          <form noValidate onSubmit={submitDetails} className="flex flex-col gap-[18px] p-7 max-sm:p-5" style={{ animation: "fasFade .35s ease both" }}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-4 gap-y-1">
              <Field
                label="Full name"
                autoComplete="name"
                placeholder="Alex Morgan"
                required
                value={details.name}
                error={errors.name}
                onChange={(e) => set("name", e.target.value)}
              />
              <Field
                label="Work email"
                type="email"
                autoComplete="email"
                placeholder="alex@yourmagazine.com"
                required
                value={details.email}
                error={errors.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <Field
                label="Company or publication"
                autoComplete="organization"
                placeholder="Northlight Media"
                required
                value={details.company}
                error={errors.company}
                onChange={(e) => set("company", e.target.value)}
              />
              <Field
                label="Phone"
                labelSuffix="Optional"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (954) 555-0142"
                value={details.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span aria-hidden="true" className="text-small font-semibold text-gray-700">
                Publications per year
              </span>
              <ChipGroup
                label="Publications per year"
                tone="primary"
                size="lg"
                items={DEMO_VOLUMES.map((v) => ({ value: v, label: v }))}
                value={details.volume}
                onChange={(v) => set("volume", v)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span aria-hidden="true" className="text-small font-semibold text-gray-700">
                What would you like to see? <span className="font-normal text-gray-500">Pick any</span>
              </span>
              <ChipGroup
                multiple
                label="What would you like to see? Pick any"
                tone="choice"
                shape="rounded"
                size="lg"
                items={DEMO_TOPICS}
                value={details.topics}
                onChange={(v) => set("topics", v)}
              />
            </div>

            <Field
              multiline
              rows={3}
              label="Anything we should know?"
              labelSuffix="Optional"
              placeholder="e.g. We publish 6 regional titles and sell print ads through Magazine Manager."
              value={details.note}
              onChange={(e) => set("note", e.target.value)}
            />

            <div className="flex flex-wrap items-center gap-3.5">
              <span className="min-w-[220px] flex-1 text-small text-gray-500">We&apos;ll only use your details to arrange the call.</span>
              <Button type="submit" size="lg" radius="md" iconRight="arrow">
                Choose a time
              </Button>
            </div>
          </form>
        )}

        {step === 1 && today && (
          <PickTime
            today={today}
            monthOffset={monthOffset}
            onMonth={setMonthOffset}
            day={day}
            onDay={(d) => {
              setDay(d);
              setTime("");
              setSlotError("");
            }}
            time={time}
            onTime={(t) => {
              setTime(t);
              setSlotError("");
            }}
            zone={zone}
            onZone={setTz}
            error={slotError}
            onBack={() => setStep(0)}
            onBook={book}
          />
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-3.5 px-7 py-9 text-center max-sm:px-5" style={{ animation: "fasFade .4s ease both" }}>
            <span
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-green-100 text-green-600"
              style={{ animation: `fasPop .5s cubic-bezier(.2,.8,.2,1) both` }}
            >
              <Icon name="check" size={28} />
            </span>
            <h2 className="m-0 text-[26px] font-bold tracking-[-0.02em] text-navy-800">You&apos;re booked, {firstName}.</h2>
            <p className="m-0 max-w-[460px] text-body leading-[1.6] text-gray-600">
              {when}. A calendar invite with the video link is on its way to <b className="text-gray-900">{details.email.trim()}</b>.
            </p>
            <div className="mt-1 flex w-full max-w-[460px] flex-col gap-2.5 rounded-lg border border-gray-200 bg-slate-50 px-[18px] py-4 text-left">
              <h3 className="m-0 text-label font-bold text-navy-800">Before the call</h3>
              <CheckList variant="icon" size="sm" items={DEMO_PREP} />
            </div>
            <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
              <Button
                variant="neutral"
                radius="md"
                iconLeft="calendar"
                onClick={() => {
                  if (!day) return;
                  downloadIcs(day, time, zone);
                  toast("flipandshare-demo.ics downloaded.", "success");
                }}
              >
                Add to calendar
              </Button>
              <Button href="/signup" size="lg" radius="md">
                Start a free account now
              </Button>
            </div>
            <Button variant="text" onClick={() => setStep(1)}>
              Change the time
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Step 2: calendar + times ---------- */

type PickTimeProps = {
  today: Date;
  monthOffset: number;
  onMonth: (offset: number) => void;
  day: Date | null;
  onDay: (d: Date) => void;
  time: string;
  onTime: (t: string) => void;
  zone: DemoTimeZone;
  onZone: (value: string) => void;
  error: string;
  onBack: () => void;
  onBook: () => void;
};

function PickTime({ today, monthOffset, onMonth, day, onDay, time, onTime, zone, onZone, error, onBack, onBook }: PickTimeProps) {
  const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1));
  // Months the booking window reaches past the current one.
  const last = addDays(today, DEMO_BOOKING_DAYS);
  const maxOffset = (last.getFullYear() - today.getFullYear()) * 12 + last.getMonth() - today.getMonth();
  const picked = day && time ? `${fmtDay(day)} · ${time} ${zone.short}` : "No time selected yet";

  return (
    <div className="flex flex-col gap-[18px] p-7 max-sm:p-5" style={{ animation: "fasFade .35s ease both" }}>
      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 max-[640px]:grid-cols-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <IconButton
              icon="prev"
              tone="plain"
              size={32}
              label="Previous month"
              disabled={monthOffset <= 0}
              onClick={() => onMonth(monthOffset - 1)}
            />
            <h2 aria-live="polite" className="m-0 text-body font-bold text-navy-800">
              {fmtMonth(month)}
            </h2>
            <IconButton
              icon="next"
              tone="plain"
              size={32}
              label="Next month"
              disabled={monthOffset >= maxOffset}
              onClick={() => onMonth(monthOffset + 1)}
            />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DOW.map((d) => (
              <span key={d} aria-hidden="true" className="py-1 text-caption font-semibold text-gray-500">
                {d}
              </span>
            ))}
            {Array.from({ length: month.getDay() }, (_, i) => (
              <span key={`lead-${i}`} />
            ))}
            {dates.map((d) => {
              const ok = isBookable(d, today);
              const on = !!day && sameDay(d, day);
              const isToday = sameDay(d, today);
              return (
                <button
                  key={d.getDate()}
                  type="button"
                  disabled={!ok}
                  aria-pressed={ok ? on : undefined}
                  aria-label={`${fmtDay(d)}${isToday ? ", today" : ""}${ok ? "" : ", unavailable"}`}
                  onClick={() => onDay(d)}
                  className={`relative aspect-square rounded-md border-0 text-menu transition-colors duration-200 ${
                    on
                      ? "cursor-pointer bg-blue-500 font-semibold text-white"
                      : ok
                        ? "cursor-pointer bg-blue-50 font-semibold text-navy-800 hover:bg-blue-100"
                        : "bg-transparent text-slate-300"
                  }`}
                >
                  {d.getDate()}
                  {isToday && <span aria-hidden="true" className="absolute bottom-[5px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="m-0 text-sm font-bold text-navy-800">{day ? fmtDay(day) : "Available times"}</h3>
            <Select
              label="Time zone"
              hideLabel
              size="sm"
              value={zone.value}
              onChange={(e) => onZone(e.target.value)}
              options={DEMO_TIME_ZONES.map((z) => ({ value: z.value, label: z.label }))}
            />
          </div>
          {day ? (
            <div role="group" aria-label={`Open times on ${fmtDay(day)}`} className="grid max-h-[300px] grid-cols-2 gap-2 overflow-auto">
              {slotsFor(day).map((t) => {
                const on = t === time;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onTime(t)}
                    className={`cursor-pointer rounded-md border-[1.5px] px-2 py-[11px] text-menu font-semibold tabular-nums transition-colors duration-200 ${
                      on ? "border-blue-500 bg-blue-500 text-white" : "border-blue-200 bg-white text-navy-800 hover:border-blue-500"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState variant="placeholder" className="flex-1">
              Pick a highlighted day to see open times.
            </EmptyState>
          )}
        </div>
      </div>

      {error && (
        <span role="alert" className="text-small text-red-600">
          {error}
        </span>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3.5">
        <Button variant="neutral" radius="md" onClick={onBack}>
          Back
        </Button>
        <span aria-live="polite" className="min-w-[180px] flex-1 text-right text-label text-gray-700 max-sm:text-left">
          {picked}
        </span>
        <Button size="lg" radius="md" onClick={onBook}>
          Book the call
        </Button>
      </div>
    </div>
  );
}
