import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Pill link with a blue icon ("Explore other use cases"). Hover: blue-300 border, blue-50 fill, blue text. */
export function LinkChip({ icon, label, href, className = "" }: { icon?: IconName; label: string; href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-[9px] text-menu font-semibold text-gray-700 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 ${className}`}
    >
      {icon && (
        <span className="inline-flex text-blue-600">
          <Icon name={icon} size={14} />
        </span>
      )}
      {label}
    </Link>
  );
}

/** Wrapping row of LinkChips with an optional eyebrow label. */
export function LinkChipCloud({
  items,
  label,
  className = "",
}: {
  items: { icon?: IconName; label: string; href: string }[];
  /** Eyebrow above the chips, e.g. "Explore other use cases". Also names the nav landmark. */
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label ?? "Related links"} className={`flex flex-col gap-4 ${className}`}>
      {label && <Eyebrow as="h2">{label}</Eyebrow>}
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((it) => (
          <li key={it.href}>
            <LinkChip {...it} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
