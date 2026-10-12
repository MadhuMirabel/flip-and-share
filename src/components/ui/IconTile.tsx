import { Icon, type IconName } from "@/components/icons";

export type TileTone =
  | "plain" // no fill: dropdown items inherit the link colour
  | "white" // white disc with tile shadow (promo cards)
  | "sky" // blue-100 / blue-600 (default)
  | "sky-soft" // blue-50 / blue-600 (settings rows, usage cards)
  | "navy" // navy-800 / white (contact strip)
  | "active" // blue-500 / white (selected card)
  | "violet"
  | "amber"
  | "mint"
  | "pink"
  | "teal"
  | "gray"; // "Without FlipAndShare" column

const TONE: Record<TileTone, string> = {
  plain: "text-inherit",
  white: "bg-white text-blue-600 shadow-tile",
  sky: "bg-blue-100 text-blue-600",
  "sky-soft": "bg-blue-50 text-blue-600",
  navy: "bg-navy-800 text-white",
  active: "bg-blue-500 text-white",
  violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-700",
  mint: "bg-green-100 text-green-700",
  pink: "bg-pink-100 text-pink-700",
  teal: "bg-teal-100 text-teal-700",
  gray: "bg-gray-200 text-gray-500",
};

export type TileSize = 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44 | 48;

/** Radii by size: ≤30 → 6px (sm), 32–38 → 8px (md), 40+ → 10px (lg). */
function radiusFor(size: TileSize) {
  if (size <= 30) return "rounded-sm";
  if (size <= 38) return "rounded-md";
  return "rounded-lg";
}

/**
 * Square icon holder. `fluid` adds the prototype's hover blob + icon sway
 * (on hover of the tile or any ancestor with `data-hovercard`).
 */
export function IconTile({
  name,
  tone = "sky",
  size = 30,
  iconSize,
  circle = false,
  fluid = false,
  className = "",
}: {
  name: IconName;
  tone?: TileTone;
  size?: TileSize;
  iconSize?: number;
  circle?: boolean;
  fluid?: boolean;
  className?: string;
}) {
  const shape = tone === "plain" ? "" : circle ? "rounded-full" : radiusFor(size);
  const glyph = iconSize ?? (size <= 28 ? 16 : size <= 38 ? 18 : size <= 44 ? 20 : 22);
  return (
    <span
      aria-hidden="true"
      className={`relative flex flex-none items-center justify-center ${shape} ${TONE[tone]} ${fluid ? "fas-fluidtile overflow-hidden" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      {fluid && (
        <span
          className="fas-fluidblob pointer-events-none absolute rounded-full bg-current opacity-0 blur-[6px]"
          style={{ width: Math.round(size * 0.65), height: Math.round(size * 0.65) }}
        />
      )}
      <span className="relative flex">
        <Icon name={name} size={glyph} />
      </span>
    </span>
  );
}
