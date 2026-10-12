import type { CSSProperties } from "react";

/** The prototype's collaborator palette (PEOPLE, L3080). */
export const PEOPLE = [
  { initials: "PS", color: "var(--color-amber-500)" },
  { initials: "MT", color: "var(--color-blue-500)" },
  { initials: "DL", color: "var(--color-violet-500)" },
  { initials: "JR", color: "var(--color-teal-500)" },
  { initials: "AK", color: "var(--color-pink-500)" },
] as const;

const GRADIENT = {
  /** Profile avatar (My account). */
  profile: "linear-gradient(135deg, var(--color-navy-800), var(--color-blue-400))",
  /** Testimonial avatar (home quote). */
  amber: "linear-gradient(135deg, var(--color-amber-500), var(--color-amber-400))",
};

/** Prototype initials sizes: 24→10, 28/30→11, 32→12, 38/40→13, 52→16, 56→18, 64→20. */
function fontFor(size: number) {
  if (size <= 26) return 10;
  if (size <= 30) return 11;
  if (size <= 34) return 12;
  if (size <= 44) return 13;
  if (size <= 52) return 16;
  if (size <= 58) return 18;
  return 20;
}

const RING = { white: "var(--color-white)", ink: "var(--color-ink-950)" };

export type AvatarProps = {
  initials: string;
  /** Any CSS colour; default blue-500. Ignored when `gradient` is set. */
  color?: string;
  /** Initials colour; default white. Use navy-700 on a blue-100 fill for the app user chip. */
  textColor?: string;
  /** "profile" (navy→blue), "amber" (quote) or any CSS gradient. */
  gradient?: keyof typeof GRADIENT | (string & {});
  size?: number;
  /** Border matching the surface behind an overlapping stack. */
  ring?: "white" | "ink";
  /** Accessible name. Without it the avatar is decorative. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/** Initials in a circle. */
export function Avatar({
  initials,
  color = "var(--color-blue-500)",
  textColor = "var(--color-white)",
  gradient,
  size = 32,
  ring,
  label,
  className = "",
  style,
}: AvatarProps) {
  const bg = gradient ? (gradient in GRADIENT ? GRADIENT[gradient as keyof typeof GRADIENT] : gradient) : color;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-flex flex-none select-none items-center justify-center rounded-full leading-none ${size >= 52 ? "font-extrabold" : "font-bold"} ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color: textColor,
        fontSize: fontFor(size),
        border: ring ? `${size >= 40 ? 3 : 2}px solid ${RING[ring]}` : undefined,
        ...style,
      }}
    >
      {initials}
    </span>
  );
}

export type AvatarStackProps = {
  people: readonly { initials: string; color?: string; name?: string }[];
  size?: number;
  /** Negative overlap in px; default 12 (≤40px) or 14 (56px), 8 below 32px. */
  overlap?: number;
  ring?: "white" | "ink";
  /** Green online dot on the last avatar. */
  presence?: boolean;
  /** Gentle bob, staggered 5s/6s/7s (fasSFloat). */
  float?: boolean;
  /** Pop in one by one (fasPop, .12s stagger). */
  pop?: boolean;
  /** Avatar drop shadow (shadow-avatar), used on the light CTA stack. */
  shadow?: boolean;
  /** Accessible summary, e.g. "Priya, Marco and Dana are editing". */
  label?: string;
  className?: string;
};

/** Overlapping row of avatars with optional presence dot and motion. */
export function AvatarStack({
  people,
  size = 40,
  overlap,
  ring = "white",
  presence = false,
  float = false,
  pop = false,
  shadow = false,
  label,
  className = "",
}: AvatarStackProps) {
  const ml = overlap ?? (size >= 56 ? 14 : size >= 32 ? 12 : 8);
  const dot = size >= 56 ? 14 : size >= 40 ? 12 : 10;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-flex items-center ${className}`}
    >
      {people.map((p, i) => {
        const last = i === people.length - 1;
        return (
          <span
            key={`${p.initials}-${i}`}
            className="relative inline-flex"
            style={{
              marginLeft: i === 0 ? 0 : -ml,
              zIndex: i + 1,
              animation: pop ? `fasPop .5s cubic-bezier(.2,.8,.2,1) ${i * 0.12}s both` : undefined,
            }}
          >
            <span
              className={`relative inline-flex rounded-full ${shadow ? "shadow-avatar" : ""}`}
              style={{ animation: float ? `fasSFloat ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` : undefined }}
            >
              <Avatar initials={p.initials} color={p.color} size={size} ring={ring} />
              {presence && last && (
                <span
                  className="absolute -right-0.5 -bottom-0.5 rounded-full bg-green-500"
                  style={{ width: dot, height: dot, border: `2px solid ${RING[ring]}` }}
                />
              )}
            </span>
          </span>
        );
      })}
    </span>
  );
}
