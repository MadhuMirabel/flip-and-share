"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { useToast } from "@/components/site/Providers";
import { SAMPLE_PAGES } from "@/lib/covers";
import styles from "./Collab.module.css";
import { INITIAL_PINS, PEOPLE, type Pin } from "./data";

const MINI =
  "cursor-pointer rounded-sm border px-2.5 py-[5px] text-xs font-semibold transition-[background-color,border-color,color] duration-200";

/** Pinned-comment review demo (prototype `SpreadCommentDemo`, L874–897). */
export function ReviewDemo() {
  const toast = useToast();
  const [pins, setPins] = useState<Pin[]>(INITIAL_PINS);
  const [sel, setSel] = useState(0);
  const [draft, setDraft] = useState<{ x: string; y: string } | null>(null);
  const [text, setText] = useState("");
  const [approved, setApproved] = useState(false);
  const nextId = useRef(INITIAL_PINS.length);

  const open = pins.filter((p) => !p.done).length;
  const canApprove = open === 0 && !approved;

  const openDraftAt = (x: string, y: string) => {
    if (approved) return;
    setDraft({ x, y });
    setText("");
  };
  const addPin = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    openDraftAt(
      `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`,
      `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
    );
  };
  const post = () => {
    if (!draft) return;
    const txt = text.trim() || "Check this before we go live.";
    setPins((l) => [
      ...l,
      { id: nextId.current++, x: draft.x, y: draft.y, who: "MT", when: "now", text: txt, assignee: /@dana/i.test(txt) ? "Dana L" : "Priya S", done: false },
    ]);
    setSel(pins.length);
    setDraft(null);
  };
  const resolve = (id: number) => setPins((l) => l.map((p) => (p.id === id ? { ...p, done: !p.done } : p)));
  const approve = () => {
    if (canApprove) {
      setApproved(true);
      toast("Spread approved. Logged to the publish report.", "success");
    } else if (approved) {
      setApproved(false);
      setPins(INITIAL_PINS);
      nextId.current = INITIAL_PINS.length;
      setSel(0);
      setDraft(null);
    } else {
      toast("Resolve the open comments first.");
    }
  };
  const onCardKey = (e: KeyboardEvent<HTMLElement>, i: number) => {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <Reveal className="grid items-start gap-6 grid-cols-[minmax(0,1.5fr)_minmax(min(280px,100%),1fr)] max-[900px]:grid-cols-1">
      <div className="relative flex justify-center rounded-lg bg-slate-100 p-7 pb-10">
        <div
          onClick={addPin}
          className="relative flex aspect-[3/2] w-full max-w-[560px] cursor-crosshair shadow-panel"
          role="group"
          aria-label="Pages 12 and 13 of the October issue. Click anywhere on the spread to leave a comment."
        >
          <div className="flex-1 rounded-l-sm bg-white bg-cover bg-top" style={{ backgroundImage: `url(${JSON.stringify(SAMPLE_PAGES.page8)})` }} />
          <div
            className="flex-1 rounded-r-sm border-l bg-white bg-cover bg-top"
            style={{ backgroundImage: `url(${JSON.stringify(SAMPLE_PAGES.page41)})`, borderLeftColor: "rgba(0,0,0,.08)" }}
          />
          {pins.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Comment ${i + 1}${p.done ? " (resolved)" : ""}: ${p.text}`}
              aria-pressed={sel === i}
              onClick={(e) => {
                e.stopPropagation();
                setSel(i);
                setDraft(null);
              }}
              className={`fas-motion ${styles.pin} absolute flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[50%_50%_50%_0] border-2 border-white p-0 text-xs font-bold text-white transition-colors duration-300 ${
                p.done ? "bg-green-600" : sel === i ? "bg-navy-800" : "bg-amber-500"
              }`}
              style={{ left: p.x, top: p.y, rotate: "-45deg", transform: "translate(-50%,-100%)", boxShadow: "0 6px 14px rgba(0,0,0,.3)" }}
            >
              <span aria-hidden="true" style={{ rotate: "45deg" }}>
                {i + 1}
              </span>
            </button>
          ))}
          {approved && (
            <div
              className={`fas-motion ${styles.veil} absolute inset-0 flex items-center justify-center bg-green-50/70`}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                role="status"
                className={`fas-motion ${styles.stamp} flex items-center gap-2.5 rounded-full bg-green-600 px-[18px] py-3 text-body font-bold text-white`}
                style={{ boxShadow: "0 12px 30px -10px rgba(22,163,74,.6)" }}
              >
                ✓ Spread approved by Mark T · just now
              </span>
            </div>
          )}
        </div>
        <div className="absolute bottom-3.5 left-7 flex items-center gap-1.5 text-xs text-gray-500">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-500" />
          Pages 12–13 · 3 viewing
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="m-0 text-body font-bold text-navy-800">Comments · pages 12–13</h3>
          <span aria-live="polite">
            <Badge tone={open ? "warning" : "success"} size="sm" className="text-xs! px-[9px]!">
              {open ? `${open} open` : "All resolved"}
            </Badge>
          </span>
        </div>
        <button
          type="button"
          onClick={() => openDraftAt("50%", "50%")}
          className="sr-only focus:not-sr-only focus:self-start focus:rounded-sm focus:border focus:border-gray-200 focus:bg-white focus:px-2.5 focus:py-1 focus:text-xs focus:font-semibold"
        >
          Add a comment
        </button>

        {pins.map((p, i) => {
          const who = PEOPLE[p.who];
          return (
            <article
              key={p.id}
              tabIndex={0}
              aria-label={`Comment ${i + 1} by ${who.name}`}
              aria-current={sel === i}
              onClick={() => setSel(i)}
              onKeyDown={(e) => onCardKey(e, i)}
              style={{ animationDelay: p.id < INITIAL_PINS.length ? `${i * 0.08}s` : undefined }}
              className={`fas-motion ${styles.thread} flex cursor-pointer flex-col gap-3 rounded-lg border bg-white p-3.5 transition-[border-color] duration-200 ${
                sel === i ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <div className={`flex flex-col gap-3 transition-opacity duration-300 ${p.done ? "opacity-60" : ""}`}>
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`flex h-[26px] w-[26px] flex-none items-center justify-center rounded-[50%_50%_50%_0] text-caption font-bold text-white transition-colors duration-300 ${
                      p.done ? "bg-green-600" : "bg-amber-500"
                    }`}
                    style={{ rotate: "-45deg" }}
                  >
                    <span style={{ rotate: "45deg" }}>{i + 1}</span>
                  </span>
                  <Avatar initials={who.ini} color={who.color} size={28} />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-label font-semibold text-gray-900">
                      {who.name} <span className="font-normal text-gray-400">· {p.when + (p.when === "now" ? "" : " ago")}</span>
                    </span>
                    <span className="text-caption text-gray-500">{who.role}</span>
                  </div>
                </div>
                <p className={`m-0 text-menu leading-[1.5] text-gray-700 ${p.done ? "line-through" : ""}`}>{p.text}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge tone="gray" size="sm" className="text-caption! px-2!">
                  → {p.assignee}
                </Badge>
                <button
                  type="button"
                  aria-pressed={p.done}
                  onClick={(e) => {
                    e.stopPropagation();
                    resolve(p.id);
                  }}
                  className={`${MINI} ml-auto ${p.done ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 bg-white text-gray-700"}`}
                >
                  {p.done ? "✓ Resolved" : "Resolve"}
                </button>
              </div>
            </article>
          );
        })}

        {draft && (
          <div className={`fas-motion ${styles.thread} flex flex-col gap-2.5 rounded-lg border border-blue-500 bg-white p-3.5`}>
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") post();
                if (e.key === "Escape") setDraft(null);
              }}
              aria-label="New comment"
              placeholder="Write a comment… @mention to assign"
              className="rounded-sm border border-gray-200 px-[11px] py-[9px] text-menu outline-none focus:border-blue-500"
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={post}
                className="cursor-pointer rounded-sm border-0 bg-blue-500 px-3 py-[7px] text-small font-semibold text-white transition-colors duration-150 hover:bg-blue-600"
              >
                Post
              </button>
              <button type="button" onClick={() => setDraft(null)} className="cursor-pointer border-0 bg-transparent text-small text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-disabled={!(canApprove || approved) || undefined}
          onClick={approve}
          className={`mt-1 rounded-md border-0 p-3 text-sm font-semibold transition-[background-color,color] duration-300 ${
            approved
              ? "cursor-pointer bg-green-50 text-green-700"
              : canApprove
                ? "cursor-pointer bg-green-600 text-white hover:bg-green-700"
                : "cursor-not-allowed bg-gray-100 text-gray-500"
          }`}
        >
          {approved ? "Approved · reset demo" : "Approve spread"}
        </button>
        <span className="text-center text-xs text-gray-500">
          {approved
            ? "Stamped: Mark T · Publisher · just now"
            : open
              ? "Approval unlocks when every comment is resolved."
              : "Ready. Approval is stamped with your name and time."}
        </span>
      </div>
    </Reveal>
  );
}
