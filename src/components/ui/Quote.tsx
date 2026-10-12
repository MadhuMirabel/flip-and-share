import Link from "next/link";
import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";

/** Navy testimonial strip with a 52px gradient avatar (home trust band). Stacks at ≤820px. */
export function QuoteFigure({
  quote,
  initials,
  attribution,
  avatarGradient = "amber",
  link,
  className = "",
}: {
  quote: ReactNode;
  initials: string;
  /** e.g. "Jordan M · Publisher, OC Parenting". */
  attribution: ReactNode;
  avatarGradient?: "amber" | "profile" | (string & {});
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <figure
      className={`m-0 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-[18px] rounded-lg bg-navy-800 px-[26px] py-[22px] text-white shadow-[0_30px_50px_-36px_rgba(12,74,110,.6)] max-[820px]:grid-cols-1 ${className}`}
    >
      <Avatar initials={initials} gradient={avatarGradient} size={52} />
      <div className="flex min-w-0 flex-col gap-1.5">
        <blockquote className="m-0 text-[clamp(16px,1.7vw,19px)] leading-[1.45] tracking-[-.01em]">{quote}</blockquote>
        <figcaption className="text-label text-blue-200">
          {attribution}
          {link && (
            <Link href={link.href} className="ml-2 text-blue-300 hover:text-white">
              {link.label}
            </Link>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

/** White quote card with a large Georgia “ mark (use-case pages). */
export function QuoteCard({ quote, attribution, className = "" }: { quote: ReactNode; attribution: ReactNode; className?: string }) {
  return (
    <figure className={`relative m-0 flex flex-col gap-3.5 rounded-lg border border-gray-200 bg-white px-7 py-[26px] ${className}`}>
      <span aria-hidden="true" className="absolute top-2 left-[22px] font-[Georgia,serif] text-[56px] leading-none text-blue-200">
        “
      </span>
      <blockquote className="relative m-0 text-body-lg leading-[1.55] text-gray-900">
        <p className="m-0">{quote}</p>
      </blockquote>
      <figcaption className="text-menu text-gray-500">{attribution}</figcaption>
    </figure>
  );
}

/** Editorial pull quote with a blue left rule (case studies). Text is wrapped in curly quotes. */
export function PullQuote({ quote, attribution, className = "" }: { quote: string; attribution: ReactNode; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <blockquote className="m-0 border-l-[3px] border-blue-500 pl-[18px] text-[19px] leading-normal tracking-[-.01em] text-pretty text-gray-900">
        “{quote}”
      </blockquote>
      <figcaption className="mt-2.5 text-menu text-gray-500 not-italic">{attribution}</figcaption>
    </figure>
  );
}

/** Pricing testimonial: quote, then avatar, name, role and plan badge. */
export function TestimonialCard({
  quote,
  name,
  role,
  initials,
  color,
  plan,
  className = "",
}: {
  quote: ReactNode;
  name: string;
  role: string;
  initials: string;
  /** Avatar colour (CSS). */
  color?: string;
  plan?: string;
  className?: string;
}) {
  return (
    <figure className={`m-0 flex flex-col gap-3.5 rounded-lg border border-gray-200 bg-white px-7 py-[26px] ${className}`}>
      <span aria-hidden="true" className="font-[Georgia,serif] text-[32px] leading-[.6] text-blue-200">
        “
      </span>
      <blockquote className="m-0 text-base leading-[1.6] text-gray-900">{quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <Avatar initials={initials} color={color} size={38} />
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-bold text-navy-800">{name}</span>
          <span className="text-small text-gray-500">{role}</span>
        </span>
        {plan && (
          <span className="ml-auto flex-none rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-navy-700">{plan}</span>
        )}
      </figcaption>
    </figure>
  );
}
