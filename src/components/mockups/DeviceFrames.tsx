import type { CSSProperties, ReactNode } from "react";

type A11y = { role?: "img"; "aria-label"?: string; "aria-hidden"?: true };
/** Mockups are decorative unless labelled; a label makes the root an image with that name. */
function a11y(label?: string, decorative = false): A11y {
  if (label) return { role: "img", "aria-label": label };
  return decorative ? { "aria-hidden": true } : {};
}

/* ------------------------------------------------------------------ */
/* PhoneFrame: the classic flat phone (platform pages)                 */
/* ------------------------------------------------------------------ */

export type PhoneSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Measured prototype phones: xs QR scanner (150×290), sm QR (190×360), md/lg/xl mobile page (190/230/250 wide). */
const PHONE: Record<PhoneSize, { w: number; h: number; r: number; p: number; sr: number; notch: boolean }> = {
  xs: { w: 150, h: 290, r: 26, p: 8, sr: 20, notch: false },
  sm: { w: 190, h: 360, r: 30, p: 9, sr: 22, notch: false },
  md: { w: 190, h: 380, r: 38, p: 10, sr: 30, notch: true },
  lg: { w: 230, h: 470, r: 38, p: 10, sr: 30, notch: true },
  xl: { w: 250, h: 500, r: 38, p: 10, sr: 30, notch: true },
};

export type PhoneFrameProps = {
  size?: PhoneSize;
  /** Screen background: white (default) or slate-900. */
  screen?: "light" | "dark";
  /** Override the size preset's notch. */
  notch?: boolean;
  /** brand = navy-tinted drop shadow (mobile page) · dark = black shadow (QR scanner). */
  shadow?: "brand" | "dark";
  label?: string;
  className?: string;
  style?: CSSProperties;
  /** Classes for the screen (e.g. flex centring). */
  screenClassName?: string;
  children?: ReactNode;
};

/** Flat #111827 phone with a notch and rounded screen. */
export function PhoneFrame({
  size = "md",
  screen = "light",
  notch,
  shadow = "brand",
  label,
  className = "",
  style,
  screenClassName = "",
  children,
}: PhoneFrameProps) {
  const s = PHONE[size];
  return (
    <div
      {...a11y(label)}
      className={`relative box-border flex-none bg-gray-900 ${shadow === "brand" ? "shadow-[0_40px_80px_-30px_rgba(12,74,110,0.6)]" : "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"} ${className}`}
      style={{ width: s.w, height: s.h, borderRadius: s.r, padding: s.p, ...style }}
    >
      {(notch ?? s.notch) && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 z-[2] h-6 w-[90px] -translate-x-1/2 rounded-b-lg bg-gray-900"
          style={{ top: s.p }}
        />
      )}
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden ${screen === "dark" ? "bg-slate-900" : "bg-white"} ${screenClassName}`}
        style={{ borderRadius: s.sr }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* IPhoneFrame: realistic phone (reader demo)                          */
/* ------------------------------------------------------------------ */

/* Zinc bezel tones from the prototype; no FlipAndShare token exists for them. */
const BEZEL = "linear-gradient(160deg,#3f3f46,#18181b 40%,#27272a)";
const SIDE_BUTTON = "#3f3f46";

export type IPhoneFrameProps = {
  /** Status-bar time. */
  time?: string;
  /** Battery fill, 0–100. */
  battery?: number;
  label?: string;
  /** Size it with a width class or style (the height follows the 9 / 18.5 aspect). */
  className?: string;
  style?: CSSProperties;
  screenClassName?: string;
  children?: ReactNode;
};

/** Realistic phone: gradient bezel, side buttons, dynamic island and a 9:41 status bar. Fluid width. */
export function IPhoneFrame({ time = "9:41", battery = 70, label, className = "w-[200px]", style, screenClassName = "", children }: IPhoneFrameProps) {
  return (
    <div
      {...a11y(label)}
      className={`relative aspect-[9/18.5] shadow-[0_40px_60px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.15)] ${className}`}
      style={{ background: BEZEL, borderRadius: "11% / 5.4%", padding: "2.4%", ...style }}
    >
      <span aria-hidden="true" className="absolute top-[22%] -left-[1.5%] h-[6%] w-[1.5%] rounded-l-sm" style={{ background: SIDE_BUTTON }} />
      <span aria-hidden="true" className="absolute top-[31%] -left-[1.5%] h-[10%] w-[1.5%] rounded-l-sm" style={{ background: SIDE_BUTTON }} />
      <span aria-hidden="true" className="absolute top-[28%] -right-[1.5%] h-[14%] w-[1.5%] rounded-r-sm" style={{ background: SIDE_BUTTON }} />
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-black" style={{ borderRadius: "9.5% / 4.7%" }}>
        <span
          aria-hidden="true"
          className="absolute top-[2.2%] left-1/2 z-[3] h-[3.4%] w-[28%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_var(--color-gray-900)]"
        />
        <div aria-hidden="true" className="relative z-[2] flex h-[8%] flex-none items-center justify-between px-[8%] text-[7px] font-bold text-white">
          <span>{time}</span>
          <span className="flex items-center gap-[3px]">
            <span className="flex items-end gap-px">
              {[3, 4, 5, 6].map((h) => (
                <span key={h} className="w-0.5 bg-white" style={{ height: h }} />
              ))}
            </span>
            <span className="box-border h-1.5 w-3 rounded-sm border border-white p-px">
              <span className="block h-full bg-green-500" style={{ width: `${Math.max(0, Math.min(100, battery))}%` }} />
            </span>
          </span>
        </div>
        <div className={`relative min-h-0 flex-1 ${screenClassName}`}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TabletFrame                                                         */
/* ------------------------------------------------------------------ */

export type TabletFrameProps = {
  label?: string;
  className?: string;
  style?: CSSProperties;
  screenClassName?: string;
  children?: ReactNode;
};

/** 4:3 tablet: dark bezel with an inner ring, camera dot, slate screen. Max 560px wide. */
export function TabletFrame({ label, className = "", style, screenClassName = "", children }: TabletFrameProps) {
  return (
    <div
      {...a11y(label)}
      className={`relative aspect-[4/3] w-full max-w-[560px] rounded-lg bg-gray-900 p-4 shadow-[0_50px_80px_-40px_rgba(0,0,0,0.8),inset_0_0_0_2px_var(--color-gray-700)] ${className}`}
      style={style}
    >
      {/* Camera dot: #1f2937 (Tailwind gray-800) has no FlipAndShare token. */}
      <span aria-hidden="true" className="absolute top-[7px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1f2937]" />
      <div className={`relative h-full w-full overflow-hidden rounded-lg bg-slate-900 text-slate-200 ${screenClassName}`}>{children}</div>
    </div>
  );
}
