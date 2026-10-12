const COLOR = {
  green: "var(--color-green-500)",
  violet: "var(--color-violet-600)",
  blue: "var(--color-blue-500)",
  red: "var(--color-red-600)",
  amber: "var(--color-amber-500)",
  white: "var(--color-white)",
};

export type DotColor = keyof typeof COLOR;

/** Small live/online indicator. Decorative unless `label` is given (then read as text). */
export function LiveDot({
  color = "green",
  size = 8,
  mode = "pulse",
  label,
  className = "",
}: {
  color?: DotColor;
  size?: 6 | 7 | 8 | 9;
  /** pulse = fasPulse halo (1.4s, 1.6s for blue) · blink = fasBlink on/off · none. */
  mode?: "pulse" | "blink" | "none";
  label?: string;
  className?: string;
}) {
  const animation =
    mode === "pulse"
      ? `fasPulse ${color === "blue" ? "1.6s ease-out" : "1.4s ease-in-out"} infinite`
      : mode === "blink"
        ? "fasBlink 1s step-end infinite"
        : undefined;
  return (
    <>
      <span
        aria-hidden="true"
        className={`inline-block flex-none rounded-full ${className}`}
        style={{ width: size, height: size, background: COLOR[color], animation }}
      />
      {label && <span className="sr-only">{label}</span>}
    </>
  );
}

/** Ringed marker with a soft halo that pulses (hotspots, "you are here"). */
export function PulseMarker({
  color = "blue",
  size = 12,
  border = 2,
  halo = 5,
  duration = 2,
  className = "",
}: {
  color?: "blue" | "amber" | "white";
  size?: 10 | 12 | 14 | 18;
  /** White border width (2–3px). */
  border?: 2 | 3;
  /** Static halo spread in px (4–6). */
  halo?: 4 | 5 | 6;
  /** Pulse period in seconds. */
  duration?: number;
  className?: string;
}) {
  const c = COLOR[color];
  return (
    <span
      aria-hidden="true"
      className={`inline-block flex-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: c,
        border: `${border}px solid ${color === "white" ? "var(--color-blue-500)" : "var(--color-white)"}`,
        boxShadow: `0 0 0 ${halo}px color-mix(in srgb, ${c} 28%, transparent)`,
        animation: `fasPulse ${duration}s ease-out infinite`,
      }}
    />
  );
}
