export type CursorGlyph = "arrow" | "hand" | "grab";

const GLYPH: Record<CursorGlyph, { w: number; h: number; d: string }> = {
  arrow: { w: 22, h: 28, d: "M2 1.5l17 12.5-7.2 1.2 4.2 9.3-3.6 1.6-4.2-9.3L2 22z" },
  hand: {
    w: 26,
    h: 30,
    d: "M9 15V4.5A2.5 2.5 0 0 1 14 4.5V13m0-1.5a2.5 2.5 0 0 1 5 0V14m0-1a2.5 2.5 0 0 1 5 0v7.5C24 25.6 20.6 29 16.5 29h-2.8c-2.8 0-5.4-1.4-6.9-3.8l-4.6-7a2.4 2.4 0 0 1 3.9-2.7L9 18.5",
  },
  grab: {
    w: 26,
    h: 28,
    d: "M8 14v-3.5a2.5 2.5 0 0 1 5 0V13m0-2.5a2.5 2.5 0 0 1 5 0V13m0-1a2.5 2.5 0 0 1 5 0v7C23 24.5 19.5 28 15 28h-2.5c-2.7 0-5.2-1.3-6.7-3.5l-3.3-5a2.4 2.4 0 0 1 3.7-3L8 18",
  },
};

export type FakeCursorProps = {
  /** Position inside the nearest positioned ancestor (CSS length, usually %). Changes glide over .9s. */
  x: string;
  y: string;
  glyph?: CursorGlyph;
  /** Pressed: scales the cursor to .85 and plays a fasRipple ring at the tip. */
  pressed?: boolean;
  className?: string;
};

/**
 * Scripted demo cursor (reader demo). Purely presentational: the parent drives x / y / glyph / pressed
 * from its own timeline, so this needs no client state. Always aria-hidden.
 */
export function FakeCursor({ x, y, glyph = "arrow", pressed = false, className = "" }: FakeCursorProps) {
  const g = GLYPH[glyph];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[5] ${className}`}
      style={{
        left: x,
        top: y,
        transform: `translate(-9%,-5%) scale(${pressed ? 0.85 : 1})`,
        transformOrigin: "9% 5%",
        transition: "left .9s cubic-bezier(.4,0,.2,1), top .9s cubic-bezier(.4,0,.2,1), transform .18s ease",
        filter: "drop-shadow(0 3px 5px rgba(0,0,0,.4))",
      }}
    >
      {pressed && (
        <span
          className="absolute top-px left-0.5 h-7 w-7 rounded-full border-2 border-blue-500"
          style={{ transform: "translate(-50%,-50%)", animation: "fasRipple .6s ease-out both" }}
        />
      )}
      <svg width={g.w} height={g.h} viewBox={`0 0 ${g.w} ${g.h}`} fill="none" className="block">
        <path
          d={g.d}
          fill="var(--color-gray-900)"
          stroke="var(--color-white)"
          strokeWidth={1.6}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
