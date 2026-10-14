"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { PhoneFrame } from "@/components/mockups/DeviceFrames";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SettingRow } from "@/components/ui/Toggle";
import { COVERS } from "@/lib/covers";
import styles from "./OfflineLibraryDemo.module.css";

/* Prototype `ISSUES` (title, sub line, cover index) and `mbChips`. */
const ISSUES: [string, string, number][] = [
  ["October 2026", "OC Parenting", 0],
  ["September 2026", "OC Parenting", 1],
  ["RV News · Sep", "DRN Media", 2],
  ["Out & About · Fall", "Wisconsin", 3],
];

const CHIPS = [
  "Download per issue or auto-download new issues",
  "Progress and bookmarks sync across devices",
  "Video plays from cache if downloaded",
  "Forms submit when back online",
  "Storage manager per title",
];

const CLOUD = "M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7z";

/** Offline reading demo (prototype L723–743, state `mb*`): tap an issue to save it, flip the network, watch the sync queue. */
export function OfflineLibraryDemo() {
  const [online, setOnline] = useState(true);
  const [saved, setSaved] = useState<Record<number, boolean>>({ 0: true });
  const [dl, setDl] = useState<{ i: number; pct: number } | null>(null);
  const [queue, setQueue] = useState(0);
  const [toast, setToast] = useState({ text: "", on: false });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const say = useCallback((text: string) => {
    clearTimeout(timer.current);
    setToast({ text, on: true });
    timer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Simulated download: +7% every 90ms, then one extra tick to finish.
  const dlIndex = dl?.i ?? null;
  useEffect(() => {
    if (dlIndex === null) return;
    let pct = 0;
    const id = setInterval(() => {
      if (pct >= 100) {
        clearInterval(id);
        setDl(null);
        setSaved((s) => ({ ...s, [dlIndex]: true }));
        say("Saved for offline · 42 MB");
        return;
      }
      pct = Math.min(100, pct + 7);
      setDl({ i: dlIndex, pct });
    }, 90);
    return () => clearInterval(id);
  }, [dlIndex, say]);

  const pick = (i: number) => {
    if (saved[i]) {
      if (!online) setQueue((q) => q + 1);
      say(online ? `Opening ${ISSUES[i][0]}…` : "Opened offline. Read queued for sync.");
      return;
    }
    if (dl) return;
    if (!online) {
      say("No connection. This issue isn't downloaded yet.");
      return;
    }
    setDl({ i, pct: 0 });
  };

  const toggleNet = () => {
    setOnline(!online);
    if (online) {
      say("Airplane mode. Saved issues still open.");
    } else {
      setQueue(0);
      if (queue) say(`Back online. ${queue} read${queue > 1 ? "s" : ""} synced to analytics.`);
    }
  };

  const queueHint = queue
    ? "Page views, time on page and hotspot taps recorded on the device. They post to the dashboard when the network returns."
    : online
      ? "Nothing waiting. Reads post to analytics as they happen."
      : "Open a saved issue while offline to see the queue grow.";

  return (
    <section aria-labelledby="offline-title" className="mx-auto box-border w-full max-w-page px-8 pt-24 pb-20 max-sm:px-5">
      <div className="grid items-center gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" }}>
        <div className="flex justify-center">
          <PhoneFrame size="xl">
            <div className="flex items-center justify-between px-4 pt-[34px] pb-2">
              <span className="text-[17px] font-bold text-navy-800">Library</span>
              <span className={`flex items-center gap-1.5 text-eyebrow font-semibold transition-colors duration-300 ${online ? "text-green-700" : "text-amber-700"}`}>
                <span aria-hidden="true" className={`h-[7px] w-[7px] rounded-full transition-colors duration-300 ${online ? "bg-green-500" : "bg-amber-500"}`} />
                {online ? "Online" : "Offline"}
              </span>
            </div>
            <div aria-hidden="true" className="flex gap-1.5 px-4 pb-2.5">
              <span className="rounded-full bg-navy-800 px-2.5 py-[5px] text-eyebrow font-semibold text-white">All</span>
              <span className="rounded-full bg-gray-100 px-2.5 py-[5px] text-eyebrow font-semibold text-gray-700">Downloaded</span>
            </div>
            <div className="grid flex-1 grid-cols-2 content-start gap-3 overflow-hidden px-4">
              {ISSUES.map(([title, sub, ci], i) => {
                const isSaved = !!saved[i];
                const dlPct = dl && dl.i === i ? dl.pct : null;
                const downloading = dlPct !== null;
                const locked = !online && !isSaved && !downloading;
                const state = isSaved ? "saved for offline" : downloading ? `downloading ${dlPct}%` : locked ? "not available offline" : "not downloaded";
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => pick(i)}
                    aria-label={`${title}, ${sub}, ${state}`}
                    className={`${styles.tile} flex cursor-pointer flex-col gap-1.5 border-0 bg-transparent p-0 text-left`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <span
                      className={`relative block aspect-[3/4] w-full rounded-sm bg-gray-200 shadow-[0_8px_20px_-10px_rgba(0,0,0,.4)] transition-opacity duration-300 ${
                        !online && !isSaved ? "opacity-45" : ""
                      }`}
                      style={{ backgroundImage: `url(${JSON.stringify(COVERS[ci % COVERS.length])})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                      {downloading && (
                        <span className={`${styles.veil} absolute inset-0 flex items-center justify-center rounded-sm bg-navy-800/55`}>
                          <span className={`${styles.ring} flex h-[38px] w-[38px] items-center justify-center rounded-full`} style={{ "--p": `${dlPct}%` } as CSSProperties}>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-[9px] font-bold text-white">{dlPct}%</span>
                          </span>
                        </span>
                      )}
                      {isSaved && (
                        <span className={`${styles.badge} absolute right-[5px] bottom-[5px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-green-600 text-[10px] text-white`}>
                          ✓
                        </span>
                      )}
                      {locked && (
                        <span className="absolute right-[5px] bottom-[5px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-gray-400 text-white">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d={CLOUD} />
                          </svg>
                        </span>
                      )}
                    </span>
                    <span className="truncate text-[10.5px] font-semibold text-gray-900">{title}</span>
                    <span className="text-[9.5px] text-gray-500">{isSaved ? `${sub} · saved` : sub}</span>
                  </button>
                );
              })}
            </div>
            <div
              role="status"
              aria-live="polite"
              className={`${styles.toast} ${toast.on ? styles.toastOn : ""} absolute right-3.5 bottom-[70px] left-3.5 rounded-lg bg-gray-900 px-3 py-[9px] text-[11px] text-white shadow-toast`}
            >
              {toast.text}
            </div>
            <div aria-hidden="true" className="flex justify-around border-t border-gray-200 px-4 pt-2.5 pb-[18px] text-[9.5px] font-semibold text-gray-400">
              <span className="text-navy-800">Library</span>
              <span>Reading</span>
              <span>Saved</span>
              <span>Account</span>
            </div>
          </PhoneFrame>
        </div>

        <div className="flex min-w-0 flex-col gap-[18px]">
          <SectionHeader
            id="offline-title"
            eyebrow="OFFLINE READING · TRY IT"
            title="Download once. Read anywhere. Count everything later."
            lead="Tap an issue on the phone to save it, then flip the network off. Saved issues still open. The others wait, and tell the reader why."
          />
          <div className="flex flex-col gap-2.5">
            <SettingRow
              checked={online}
              onChange={toggleNet}
              title="Network"
              description={online ? "Connected · flip off to simulate airplane mode" : "Offline · saved issues open, others wait"}
            />
            <Card padding="none" className="gap-2 px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-navy-800">Reads queued for sync</span>
                <span className={`text-xl font-bold tabular-nums transition-colors duration-300 ${queue ? "text-blue-600" : "text-gray-400"}`}>{queue}</span>
              </div>
              <span className="text-small leading-normal text-gray-500">{queueHint}</span>
            </Card>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {CHIPS.map((c) => (
              <li key={c}>
                <Badge tone="info" size="md" className="whitespace-normal">
                  {c}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
