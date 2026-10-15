import type { CSSProperties } from "react";
import { COVERS } from "@/lib/covers";

const EASE = "cubic-bezier(.2,.8,.2,1)";

/** One `fasD*` keyframe on the scene's shared 10-second loop. */
const loop = (name: string, ease = EASE): CSSProperties => ({ animation: `${name} 10s ${ease} infinite` });

const cover = (src: string): CSSProperties => ({ backgroundImage: `url(${JSON.stringify(src)})` });

const READ_BARS = ["40%", "62%", "50%", "78%", "92%"];

/**
 * Book a demo hero visual (prototype L1491-1506): a screen-shared call where a PDF becomes a flipbook,
 * gets a link, a video and an ad, and starts counting reads, while the specialist's video tile talks.
 * Decorative; hidden under 900px. Reduced motion shows the finished frame (globals.css `[data-demo-scene]`).
 */
export function DemoCallScene() {
  const src = COVERS[1];
  return (
    <div data-demo-scene aria-hidden="true" className="relative h-[330px] max-[900px]:hidden">
      {/* Shared screen */}
      <div
        className="absolute top-[6%] left-0 h-[260px] w-[84%] overflow-hidden rounded-lg border border-blue-200/18 bg-navy-900 shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]"
        style={loop("fasDCard")}
      >
        <div className="flex items-center gap-1.5 border-b border-blue-200/12 px-3 py-[9px]">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="ml-2 min-w-0 truncate text-[11px] font-semibold text-blue-200">Demo · screen sharing</span>
          <span className="ml-2 flex flex-none items-center gap-[5px] font-mono text-[10px] font-bold text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" style={{ animation: "fasDBlink 1.2s ease-in-out infinite" }} />
            LIVE
          </span>
        </div>

        <div className="relative h-[222px] bg-linear-to-b from-blue-50 to-white">
          {/* The uploaded PDF… */}
          <div
            className="absolute top-[14%] left-[8%] flex aspect-[3/4] w-[26%] flex-col overflow-hidden rounded-sm border border-gray-200 bg-white shadow-[0_20px_40px_-22px_rgba(0,0,0,.55)]"
            style={loop("fasDPdf", "ease-in-out")}
          >
            <span className="bg-red-500 px-1.5 py-[3px] text-[9px] font-extrabold text-white">PDF</span>
            <span className="flex-1 bg-cover bg-center" style={cover(src)} />
          </div>

          {/* …becomes a flipbook spread with a video */}
          <div
            className="absolute top-[12%] left-[14%] flex h-[150px] w-[72%] shadow-[0_22px_40px_-20px_rgba(12,74,110,.55)]"
            style={loop("fasDBook")}
          >
            <span className="flex-1 rounded-l-sm bg-cover bg-center" style={cover(src)} />
            <span className="flex flex-1 flex-col gap-1.5 rounded-r-sm border-l border-gray-200 bg-white p-3">
              <span className="h-[7px] w-[70%] rounded-sm bg-navy-800 opacity-80" />
              <span className="h-[5px] w-[90%] rounded-sm bg-blue-100" />
              <span className="h-[5px] w-[80%] rounded-sm bg-blue-100" />
              <span className="relative mt-1.5 flex h-[54px] items-center justify-center rounded-sm bg-blue-100">
                <span
                  className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-500"
                  style={loop("fasDPopB")}
                >
                  <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-white" />
                </span>
              </span>
            </span>
          </div>

          <span
            className="absolute top-[30%] left-[22%] rounded-full bg-navy-800 px-2 py-1 text-[10px] font-bold text-white"
            style={loop("fasDPopA")}
          >
            Link
          </span>
          <span
            className="absolute top-[62%] left-[30%] rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold text-white"
            style={loop("fasDPopC")}
          >
            Ad · Shop
          </span>

          {/* Reads start counting */}
          <div
            className="absolute top-[58%] left-[58%] flex w-[36%] flex-col gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-[0_20px_40px_-22px_rgba(0,0,0,.55)]"
            style={loop("fasDRise")}
          >
            <span className="text-[10px] font-bold text-navy-800">Reads today</span>
            <span className="flex h-9 items-end gap-1">
              {READ_BARS.map((h, i) => (
                <span
                  key={h}
                  className={`flex-1 origin-bottom rounded-t-sm ${i === READ_BARS.length - 1 ? "bg-blue-500" : "bg-blue-200"}`}
                  style={{ height: h, ...loop("fasDBar") }}
                />
              ))}
            </span>
          </div>

          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            className="absolute top-0 left-0 drop-shadow-[0_2px_3px_rgba(0,0,0,.35)]"
            style={loop("fasDCursor", "ease-in-out")}
          >
            <path d="M1 1l6 18 3-7 7-3z" fill="var(--color-gray-900)" stroke="var(--color-white)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Specialist video tile */}
      <div
        className="absolute -top-[10%] -right-[2%] z-2 flex aspect-[4/3] w-[28%] flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-white/85 bg-linear-135 from-navy-800 to-blue-500 shadow-[0_18px_36px_-16px_rgba(0,0,0,.6)]"
        style={{ animation: "fasDFloat 6s ease-in-out infinite" }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-sm font-bold text-white">
          MR
        </span>
        <span className="text-2xs font-semibold text-white">Maria · Specialist</span>
        <span className="flex h-2.5 items-end gap-0.5">
          {[0, 0.15, 0.3, 0.45].map((d) => (
            <span
              key={d}
              className="h-2.5 w-[3px] origin-bottom rounded-full bg-green-300"
              style={{ animation: `fasDTalk .9s ease-in-out ${d}s infinite` }}
            />
          ))}
        </span>
      </div>

      <div
        className="absolute top-[78%] left-0 flex items-center gap-2 rounded-full bg-white py-2 pr-3 pl-2 shadow-[0_18px_36px_-16px_rgba(0,0,0,.55)]"
        style={loop("fasDRise2")}
      >
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-blue-500 text-2xs font-bold text-white">
          You
        </span>
        <span className="text-xs text-gray-700">
          Uploaded <b className="text-navy-800">october-issue.pdf</b>
        </span>
      </div>

      <div
        className="absolute top-[84%] right-0 flex items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-2 text-small font-bold whitespace-nowrap text-green-800 shadow-[0_18px_36px_-16px_rgba(0,0,0,.5)]"
        style={loop("fasDDone")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5L20 7" />
        </svg>
        Live flipbook in 12 min
      </div>
    </div>
  );
}
