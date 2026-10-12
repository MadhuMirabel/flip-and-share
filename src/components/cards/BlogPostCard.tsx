import Link from "next/link";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { PASTEL, type PastelTone } from "./RelatedCard";

export type BlogPostCardProps = {
  variant?: "card" | "featured" | "compact";
  title: string;
  excerpt?: string;
  category: string;
  /** Category label colour (prototype BLOG_CC: Ad sales sky, Readership amber, Production violet, Print + digital teal, Product updates green). */
  categoryTone?: PastelTone;
  /** Cover image URL shown rotated in the media panel. */
  cover?: string;
  /** CSS background of the media panel. Defaults to a sky gradient. */
  mediaBackground?: string;
  /** Cover tilt in degrees (the blog alternates -4 / 4). */
  rotate?: number;
  author?: string;
  authorInitials?: string;
  /** CSS colour of the author disc (featured variant). */
  authorColor?: string;
  date?: string;
  minutes?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const DEFAULT_MEDIA = "linear-gradient(135deg,var(--color-blue-100),var(--color-blue-200))";

function Root({
  href,
  onClick,
  className,
  children,
}: {
  href?: string;
  onClick?: () => void;
  className: string;
  children: ReactNode;
}) {
  const cls = `cursor-pointer text-left text-gray-900 no-underline hover:text-gray-900 ${className}`;
  if (href !== undefined) {
    return (
      <Link href={href} data-hovercard className={cls}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} data-hovercard className={`w-full ${cls}`}>
        {children}
      </button>
    );
  }
  return <div className={className}>{children}</div>;
}

/** Decorative rotated cover (the card title already names the post). */
function TiltedCover({ src, width, rotate, big }: { src?: string; width: string; rotate: number; big?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block aspect-[3/4] bg-white bg-cover bg-center ${big ? "rounded-sm shadow-[0_30px_50px_-20px_rgba(0,0,0,0.5)]" : "rounded-sm shadow-[0_20px_30px_-14px_rgba(0,0,0,0.5)]"}`}
      style={{ width, transform: `rotate(${rotate}deg)`, backgroundImage: src ? `url(${src})` : undefined }}
    />
  );
}

/** Blog post teaser: grid `card`, two-column `featured` hero card, or text-only `compact` ("Keep reading"). */
export function BlogPostCard({
  variant = "card",
  title,
  excerpt,
  category,
  categoryTone = "sky",
  cover,
  mediaBackground = DEFAULT_MEDIA,
  rotate = -4,
  author,
  authorInitials,
  authorColor = "var(--color-navy-800)",
  date,
  minutes,
  href,
  onClick,
  className = "",
}: BlogPostCardProps) {
  const cc = PASTEL[categoryTone].text;
  // A <button> may only hold phrasing content, so headings and paragraphs degrade to spans there.
  const asButton = href === undefined && onClick !== undefined;
  const H2 = asButton ? "span" : "h2";
  const H3 = asButton ? "span" : "h3";
  const P = asButton ? "span" : "p";

  if (variant === "compact") {
    return (
      <Root
        href={href}
        onClick={onClick}
        className={`flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5 transition-shadow duration-200 hover:shadow-lift ${className}`}
      >
        <span className={`text-caption font-bold ${cc}`}>{category}</span>
        <span className="text-base leading-[1.3] font-bold text-navy-800">{title}</span>
        {minutes != null && <span className="text-small text-gray-500">{minutes} min read</span>}
      </Root>
    );
  }

  if (variant === "featured") {
    return (
      <Root
        href={href}
        onClick={onClick}
        className={`grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lift ${className}`}
      >
        <span className="relative flex min-h-[260px] items-center justify-center" style={{ background: mediaBackground }}>
          <TiltedCover src={cover} width="44%" rotate={rotate} big />
          <span className="absolute top-[18px] left-[18px]">
            <Badge tone="white" size="sm" uppercase className="bg-white! px-2.5! py-[5px]! text-navy-800!">
              Featured
            </Badge>
          </span>
        </span>
        <span className="flex flex-col justify-center gap-3 p-8">
          <span className={`text-xs font-bold tracking-[0.04em] ${cc}`}>{category}</span>
          <H2 className="m-0 block font-bold text-[clamp(24px,3vw,32px)] leading-[1.15] tracking-[-0.025em] text-navy-800">{title}</H2>
          {excerpt && <P className="m-0 text-body leading-[1.6] text-gray-600">{excerpt}</P>}
          <span className="mt-1.5 flex items-center gap-2.5">
            {authorInitials && <Avatar initials={authorInitials} color={authorColor} size={32} />}
            <span className="text-label text-gray-700">
              {author && <b>{author}</b>}
              {date && ` · ${date}`}
              {minutes != null && ` · ${minutes} min read`}
            </span>
          </span>
        </span>
      </Root>
    );
  }

  return (
    <Root
      href={href}
      onClick={onClick}
      className={`flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-lift ${className}`}
    >
      <span className="relative flex h-[170px] items-center justify-center" style={{ background: mediaBackground }}>
        <TiltedCover src={cover} width="34%" rotate={rotate} />
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5">
        <span className={`text-caption font-bold tracking-[0.04em] ${cc}`}>{category}</span>
        <H3 className="m-0 text-body-lg leading-[1.3] font-bold tracking-[-0.01em] text-navy-800">{title}</H3>
        {excerpt && <span className="text-menu leading-[1.55] text-gray-600">{excerpt}</span>}
        <span className="mt-auto pt-2 text-small text-gray-500">
          {[author, date, minutes != null ? `${minutes} min` : null].filter(Boolean).join(" · ")}
        </span>
      </span>
    </Root>
  );
}
