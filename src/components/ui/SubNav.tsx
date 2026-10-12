"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type SubNavItem = { label: string; href: string };

/** The seven platform pages (prototype `subNav`). */
export const PLATFORM_SUBNAV: SubNavItem[] = [
  { label: "Overview", href: "/platform" },
  { label: "Analytics", href: "/platform/analytics" },
  { label: "QR Codes", href: "/platform/qr" },
  { label: "Ad Manager", href: "/platform/ad-manager" },
  { label: "Collaboration", href: "/platform/collaboration" },
  { label: "AI", href: "/platform/ai" },
  { label: "Mobile", href: "/platform/mobile" },
];

type SubNavProps = {
  items?: SubNavItem[];
  /** Accessible name of the <nav>. */
  label?: string;
  /** Stick under the 61px site header (default). Turn off for previews. */
  sticky?: boolean;
  /** Override the active href (otherwise the current pathname, exact match). */
  activeHref?: string;
  className?: string;
};

/**
 * Secondary page navigation under the header: white/95 + blur bar,
 * 2px blue underline on the current page (`aria-current="page"`).
 * Uses usePathname: under Cache Components, wrap in <Suspense> on routes with unknown dynamic params.
 */
export function SubNav({
  items = PLATFORM_SUBNAV,
  label = "Platform",
  sticky = true,
  activeHref,
  className = "",
}: SubNavProps) {
  const pathname = usePathname();
  const current = activeHref ?? pathname;
  return (
    <nav
      aria-label={label}
      className={`${sticky ? "sticky top-[61px] z-[15]" : "relative"} border-b border-gray-200 bg-white/95 backdrop-blur-[8px] ${className}`}
    >
      <div className="no-scrollbar mx-auto flex max-w-page gap-1 overflow-x-auto px-8 max-sm:px-5">
        {items.map((it) => {
          const on = it.href === current;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={on ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 px-3.5 pb-3 pt-3.5 text-sm font-semibold transition-colors duration-150 ${
                on ? "border-blue-500 text-navy-800 hover:text-navy-800" : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
