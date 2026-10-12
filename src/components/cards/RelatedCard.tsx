import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";

/** The prototype's six pastel accents (README "Pastel card set"). */
export type PastelTone = "sky" | "amber" | "violet" | "green" | "pink" | "teal";

/** Token classes per pastel tone: 100 surface, 200 border, 700 text. */
export const PASTEL: Record<PastelTone, { bg: string; border: string; text: string }> = {
  sky: { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-700" },
  amber: { bg: "bg-amber-100", border: "border-amber-200", text: "text-amber-700" },
  violet: { bg: "bg-violet-100", border: "border-violet-200", text: "text-violet-700" },
  green: { bg: "bg-green-100", border: "border-green-200", text: "text-green-700" },
  pink: { bg: "bg-pink-100", border: "border-pink-200", text: "text-pink-700" },
  teal: { bg: "bg-teal-100", border: "border-teal-200", text: "text-teal-700" },
};

/** Related-feature colour rotation: sky, amber, lavender, mint, pink, teal (prototype L3570). */
export const PASTEL_CYCLE: readonly PastelTone[] = ["sky", "amber", "violet", "green", "pink", "teal"];

/** Tone for the n-th card in a list. */
export function pastelAt(index: number): PastelTone {
  return PASTEL_CYCLE[((index % PASTEL_CYCLE.length) + PASTEL_CYCLE.length) % PASTEL_CYCLE.length];
}

type RelatedCardProps = {
  icon: IconName;
  title: string;
  href: string;
  /** Explicit tone; otherwise picked from PASTEL_CYCLE by `index`. */
  tone?: PastelTone;
  index?: number;
  className?: string;
};

/** Pastel "Related features" card: white icon tile, title, trailing arrow. The whole card is one link. */
export function RelatedCard({ icon, title, href, tone, index = 0, className = "" }: RelatedCardProps) {
  const t = PASTEL[tone ?? pastelAt(index)];
  return (
    <Link
      href={href}
      data-hovercard
      className={`flex items-center gap-3 rounded-lg border p-[18px] text-navy-800 transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:text-navy-800 hover:shadow-card-hover ${t.bg} ${t.border} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-md bg-white shadow-[0_2px_6px_-2px_rgba(0,0,0,0.15)] ${t.text}`}
      >
        <Icon name={icon} size={18} />
      </span>
      <span className="text-body-sm leading-[1.4] font-semibold">{title}</span>
      <span aria-hidden="true" className={`fas-arrow ml-auto ${t.text}`}>
        →
      </span>
    </Link>
  );
}

/** Auto-fill grid (min 240px) for RelatedCard. */
export function RelatedCardGrid({
  items,
  className = "",
}: {
  items: { icon: IconName; title: string; href: string; tone?: PastelTone }[];
  className?: string;
}) {
  return (
    <ul className={`m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5 p-0 ${className}`}>
      {items.map((it, i) => (
        <li key={it.href + it.title}>
          <RelatedCard {...it} index={i} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
