import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { stripes } from "@/components/mockups/BookSpread";

/*
 * "Issuu-style" product-scene kit, ported from the prototype's tourScene(i) / featScene(kind) helpers
 * (L3152–3285) and design/PROJECT_NOTES.md. Every primitive is absolutely positioned with % offsets inside
 * <SceneStage>, loops on SCENE_PERIOD with the fasS* keyframes, and is decorative (the stage carries the label).
 * Global CSS freezes the loops under prefers-reduced-motion.
 */

/** Loop length in seconds shared by every scene primitive. */
export const SCENE_PERIOD = 7;

/** Team avatar colours (README): blue-500, amber-500, violet-500, teal-500, pink-500. */
export const SCENE_AVATAR_COLORS = [
  "var(--color-blue-500)",
  "var(--color-amber-500)",
  "var(--color-violet-500)",
  "var(--color-teal-500)",
  "var(--color-pink-500)",
] as const;


/** `rise(d)`: card rises in, holds, fades up (fasMCard). */
export function rise(delay = 0): CSSProperties {
  return { animation: `fasMCard ${SCENE_PERIOD}s linear ${delay}s infinite backwards` };
}
/** `pop(d)`: scale pop in / out (fasMPop). */
export function pop(delay = 0): CSSProperties {
  return { animation: `fasMPop ${SCENE_PERIOD}s linear ${delay}s infinite backwards` };
}
/** `flt`: gentle 6s idle float (fasMFloat). */
export const float: CSSProperties = { animation: "fasMFloat 6s linear infinite" };

/** Absolute placement in % (or px) of the 4:3 stage. */
export type ScenePos = {
  left?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  width?: string | number;
  height?: string | number;
};

/** CSS custom properties are valid style keys at runtime; this widens the type for them. */
type VarStyle = CSSProperties & Record<`--${string}`, string>;

/* ------------------------------------------------------------------ */
/* Stage                                                               */
/* ------------------------------------------------------------------ */

export type SceneStageProps = {
  /**
   * glow = soft sky radial glow fading into white, no box (README, default) ·
   * panel = boxed sky panel with a 14px radius and blue-100 border (PROJECT_NOTES) · none = transparent.
   */
  backdrop?: "glow" | "panel" | "none";
  /** Height of the area the 4:3 scene is centred in (the scene itself is at most 440px wide). */
  height?: number | string;
  /** Accessible description of the whole scene; without it the scene is aria-hidden. */
  label?: string;
  className?: string;
  children: ReactNode;
};

const GLOW = "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--color-blue-400) 18%, transparent), transparent 65%)";
const PANEL =
  "radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--color-blue-400) 18%, transparent), transparent 60%), linear-gradient(180deg, var(--color-blue-50), var(--color-white))";

/** Centred 4:3 wrap (max 440px) inside an optional sky backdrop. */
export function SceneStage({ backdrop = "glow", height = 340, label, className = "", children }: SceneStageProps) {
  const bg = backdrop === "glow" ? GLOW : backdrop === "panel" ? PANEL : undefined;
  return (
    <div
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`relative w-full overflow-hidden ${backdrop === "panel" ? "rounded-lg border border-blue-100" : ""} ${className}`}
      style={{ height, background: bg }}
    >
      <div className="absolute top-1/2 left-1/2 aspect-[4/3] w-[min(100%,440px)] -translate-x-1/2 -translate-y-1/2">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export type SceneCardProps = ScenePos & {
  /** Rise-in delay in seconds (fasMCard on the 7s loop). */
  rise?: number;
  /** Idle float instead of a rise (fasMFloat 6s). Ignored when `rise` is set. */
  float?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Floating white UI card: radius 10, gray-200 border, shadow-float. */
export function SceneCard({ left, top, right, bottom, width, height, rise: d, float: f, className = "", style, children }: SceneCardProps) {
  const anim = d !== undefined ? rise(d) : f ? float : undefined;
  return (
    <div
      className={`fas-motion absolute rounded-lg border border-gray-200 bg-white shadow-float ${className}`}
      style={{ left, top, right, bottom, width, height, ...anim, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export type SceneCoverProps = ScenePos & {
  src?: string;
  /** Fly in from an offset: x / y (CSS lengths), r (rotation), delay (s). Uses fasMFly with --fx/--fy/--fr. */
  fly?: { x: string; y: string; r: string; delay: number };
  /** Idle float instead of a fly-in. */
  float?: boolean;
  radius?: number;
  /** sm = 0 16px 28px -14px (tour covers) · lg = 0 30px 50px -22px (hero cover in a scene). */
  shadow?: "sm" | "lg";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** 3:4 magazine cover; striped sky placeholder without `src`. */
export function SceneCover({ src, fly, float: f, radius = 6, shadow = "sm", left, top, right, bottom, width, height, className = "", style, children }: SceneCoverProps) {
  const s: VarStyle = {
    left,
    top,
    right,
    bottom,
    width,
    height,
    borderRadius: radius,
    background: src ? `var(--color-white) url(${src}) center/cover` : stripes("sky", 6),
  };
  if (fly) {
    s["--fx"] = fly.x;
    s["--fy"] = fly.y;
    s["--fr"] = fly.r;
    s.animation = `fasMFly ${SCENE_PERIOD}s linear ${fly.delay}s infinite backwards`;
  } else if (f) {
    Object.assign(s, float);
  }
  return (
    <div
      className={`fas-motion absolute aspect-[3/4] ${shadow === "sm" ? "shadow-[0_16px_28px_-14px_rgba(0,0,0,0.5)]" : "shadow-[0_30px_50px_-22px_rgba(0,0,0,0.55)]"} ${className}`}
      style={{ ...s, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Avatar, cursor, pill                                                */
/* ------------------------------------------------------------------ */

/** 30px team avatar with a 2px white border; pops in on the loop. */
export function SceneAvatar({
  initials,
  color = SCENE_AVATAR_COLORS[0],
  delay = 0,
  left,
  top,
  right,
  bottom,
}: { initials: string; color?: string; delay?: number } & Omit<ScenePos, "width" | "height">) {
  return (
    <span
      className="fas-motion absolute flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]"
      style={{ left, top, right, bottom, background: color, ...pop(delay) }}
    >
      {initials}
    </span>
  );
}

/** Black arrow cursor that travels by (`to[0]`, `to[1]`), clicks and returns (fasMCursor). */
export function SceneCursor({
  to,
  delay = 0,
  left,
  top,
  right,
  bottom,
}: { to: [string, string]; delay?: number } & Omit<ScenePos, "width" | "height">) {
  const s: VarStyle = {
    left,
    top,
    right,
    bottom,
    "--cx": to[0],
    "--cy": to[1],
    animation: `fasMCursor ${SCENE_PERIOD}s linear ${delay}s infinite backwards`,
    filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))",
  };
  return (
    <svg width={18} height={22} viewBox="0 0 18 22" className="fas-motion absolute z-[5]" style={s}>
      <path d="M1 1l6 18 3-7 7-3z" fill="var(--color-gray-900)" stroke="var(--color-white)" strokeWidth={1.5} />
    </svg>
  );
}

const PILL = {
  green: "bg-green-100 text-green-800",
  navy: "bg-navy-800 text-white",
  white: "border border-gray-200 bg-white text-navy-800",
};

/**
 * Outcome pill at the end of the loop ("Page 6 placed"). `center` centres it on `left`
 * with an outer wrapper, because fasMCard animates transform and would cancel a translateX(-50%).
 */
export function ScenePill({
  children,
  tone = "navy",
  delay = 0,
  center = false,
  left,
  top,
  right,
  bottom,
}: { children: ReactNode; tone?: keyof typeof PILL; delay?: number; center?: boolean } & Omit<ScenePos, "width" | "height">) {
  const pill = (
    <span
      className={`fas-motion block rounded-full px-[9px] py-1 text-2xs leading-tight font-bold whitespace-nowrap shadow-[0_8px_16px_-8px_rgba(0,0,0,0.35)] ${PILL[tone]}`}
      style={rise(delay)}
    >
      {children}
    </span>
  );
  return (
    <span className={`absolute ${center ? "-translate-x-1/2" : ""}`} style={{ left, top, right, bottom }}>
      {pill}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Small parts                                                         */
/* ------------------------------------------------------------------ */

/** 6px grey skeleton bar. */
export function SceneLine({ width = "100%", height = 6, className = "", style }: { width?: string | number; height?: number; className?: string; style?: CSSProperties }) {
  return <span className={`block rounded-sm bg-gray-200 ${className}`} style={{ width, height, ...style }} />;
}

/** 10px / 700 / .04em label inside scene cards ("EMBED", "BOOKSHELF"). Colour defaults to gray-500. */
export function SceneLabel({ children, className = "text-gray-500", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={`text-[10px] font-bold tracking-[0.04em] ${className}`} style={style}>
      {children}
    </span>
  );
}

/** 38×20 switch that turns on during the loop (fasMTrack + fasMKnob). */
export function SceneToggle({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="fas-motion relative h-5 w-[38px] flex-none rounded-full bg-gray-300"
      style={{ animation: `fasMTrack ${SCENE_PERIOD}s linear ${delay}s infinite backwards` }}
    >
      <span
        className="fas-motion absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
        style={{ animation: `fasMKnob ${SCENE_PERIOD}s linear ${delay}s infinite backwards` }}
      />
    </span>
  );
}

/** Column chart whose bars grow on the loop (fasMGrow). Values are % heights. */
export function SceneBars({
  values,
  highlight = [],
  delay = 0.4,
  step = 0.06,
  gap = 5,
  className = "",
}: {
  values: number[];
  /** Indexes drawn in blue-500 (others blue-200). */
  highlight?: number[];
  delay?: number;
  step?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={`grid min-h-0 items-end ${className}`} style={{ gridTemplateColumns: `repeat(${values.length},1fr)`, gap }}>
      {values.map((h, n) => (
        <span
          key={n}
          className={`fas-motion block origin-bottom rounded-t-sm ${highlight.includes(n) ? "bg-blue-500" : "bg-blue-200"}`}
          style={{ height: `${h}%`, animation: `fasMGrow ${SCENE_PERIOD}s linear ${delay + n * step}s infinite backwards` }}
        />
      ))}
    </div>
  );
}

/** Round white badge with an icon, e.g. the lock on a "Subscribers only" overlay. */
export function SceneIconDisc({ name, size = 36 }: { name: IconName; size?: number }) {
  return (
    <span className="flex items-center justify-center rounded-full bg-white text-navy-800" style={{ width: size, height: size }}>
      <Icon name={name} size={16} />
    </span>
  );
}
