import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** 3:4 cover drawn as a CSS background (remote covers; next.config has no remotePatterns), exposed as an image. */
function Cover({ src, title, className, children }: { src?: string; title: string; className: string; children?: ReactNode }) {
  return (
    <span
      role="img"
      aria-label={`${title} cover`}
      className={`relative block aspect-[3/4] overflow-hidden bg-gray-200 bg-cover bg-center ${className}`}
      style={{ backgroundImage: src ? `url(${src})` : undefined }}
    >
      {children}
    </span>
  );
}

export type PublicationCardProps = {
  title: string;
  /** e.g. "October 2026 · OC Parenting". */
  meta?: string;
  category?: string;
  cover?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

/** Store / Examples publication: 3:4 cover with category pill, title, meta. Lifts 3px on hover. */
export function PublicationCard({ title, meta, category, cover, href, onClick, className = "" }: PublicationCardProps) {
  const cls = `flex w-full flex-col gap-2.5 text-left text-gray-900 no-underline transition-transform duration-150 hover:-translate-y-[3px] hover:text-gray-900 ${href !== undefined || onClick ? "cursor-pointer" : ""} ${className}`;
  const body = (
    <>
      <Cover src={cover} title={title} className="rounded-sm shadow-cover">
        {category && (
          <span className="absolute top-2.5 left-2.5">
            <Badge tone="white" size="sm">
              {category}
            </Badge>
          </span>
        )}
      </Cover>
      <span className="flex flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-navy-800">{title}</span>
        {meta && <span className="text-label text-gray-500">{meta}</span>}
      </span>
    </>
  );
  if (href !== undefined) {
    return (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${cls} border-0 bg-transparent p-0`}>
        {body}
      </button>
    );
  }
  return <div className={cls}>{body}</div>;
}

/** Small 64×84 cover used beside case-study names. */
export function MiniCover({ src, title, width = 64, className = "" }: { src?: string; title: string; width?: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`${title} cover`}
      className={`block flex-none rounded-sm bg-gray-200 bg-cover bg-center shadow-[0_10px_24px_-12px_rgba(12,74,110,0.5)] ${className}`}
      style={{ width, height: Math.round((width * 84) / 64), backgroundImage: src ? `url(${src})` : undefined }}
    />
  );
}

export type ExamplePublicationCardProps = {
  variant?: "inline" | "overlay";
  title: string;
  cover?: string;
  /** Inline: grey sub line. */
  subtitle?: string;
  eyebrow?: string;
  /** Inline: trailing link, e.g. "Browse more in the Store". */
  linkLabel?: string;
  href?: string;
  className?: string;
};

/** "EXAMPLE PUBLICATION" block: `inline` (120px cover beside text) or `overlay` (4:3 image with a navy fade and caption). */
export function ExamplePublicationCard({
  variant = "inline",
  title,
  cover,
  subtitle,
  eyebrow = "Example publication",
  linkLabel,
  href,
  className = "",
}: ExamplePublicationCardProps) {
  if (variant === "overlay") {
    return (
      <div className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-navy-800 shadow-panel ${className}`}>
        <span
          role="img"
          aria-label={`${title} cover`}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: cover ? `url(${cover})` : undefined }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--color-navy-800) 85%, transparent))",
          }}
        />
        <div className="absolute right-5 bottom-[18px] left-5 flex flex-col gap-1 text-white">
          <span className="text-xs text-blue-200 uppercase">{eyebrow}</span>
          <span className="text-lg font-bold">{title}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex items-start gap-[22px] ${className}`}>
      <Cover src={cover} title={title} className="w-[120px] flex-none rounded-sm shadow-[0_20px_40px_-18px_rgba(12,74,110,0.5)]" />
      <div className="flex flex-col gap-2.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <span className="text-h3 tracking-[-0.01em] text-navy-800">{title}</span>
        {subtitle && <span className="text-sm leading-normal text-gray-500">{subtitle}</span>}
        {linkLabel && href !== undefined && (
          <Link href={href} className="text-sm font-semibold text-blue-600">
            {linkLabel} <span className="fas-arrow">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
