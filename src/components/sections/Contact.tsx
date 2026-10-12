import type { ReactNode } from "react";
import { IconTile } from "@/components/ui/IconTile";
import { SITE } from "@/lib/site";

const LINK = "font-semibold text-blue-600 hover:text-blue-700";

/** Blue-50 callout with a navy phone tile: "Call us at … or email …". */
export function ContactStrip({
  lead = "Call us at",
  className = "",
}: {
  /** Text before the phone number. */
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-[40px_minmax(0,1fr)] items-center gap-3.5 rounded-lg border border-blue-200 bg-blue-50 px-[18px] py-4 ${className}`}>
      <IconTile name="phone" tone="navy" size={40} />
      <span className="text-sm leading-[1.55] text-gray-700">
        {lead}{" "}
        <a href={SITE.phoneHref} className={LINK}>
          {SITE.phone}
        </a>{" "}
        or email{" "}
        <a href={SITE.emailHref} className={`${LINK} [overflow-wrap:anywhere]`}>
          {SITE.email}
        </a>
      </span>
    </div>
  );
}

type ContactLinkCardsProps = {
  title?: ReactNode;
  /** Sub-line under the phone number. */
  phoneNote?: ReactNode;
  /** Sub-line under the email address. */
  emailNote?: ReactNode;
  titleAs?: "span" | "h2" | "h3";
  className?: string;
};

/** "Prefer to talk now?" panel: phone and email link cards on a blue gradient. */
export function ContactLinkCards({
  title = "Prefer to talk now?",
  phoneNote = "Mon–Fri, 9 AM – 6 PM ET",
  emailNote = "Replies within one business day",
  titleAs: Title = "span",
  className = "",
}: ContactLinkCardsProps) {
  const card =
    "flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3.5 py-3 text-navy-800 transition-colors duration-200 hover:border-blue-500 hover:text-navy-800";
  return (
    <div
      className={`flex flex-col gap-3.5 rounded-lg border border-blue-200 p-6 ${className}`}
      style={{ background: "linear-gradient(135deg, var(--color-blue-50), var(--color-blue-100))" }}
    >
      <Title className="m-0 text-base font-bold text-navy-800">{title}</Title>
      <a href={SITE.phoneHref} className={card}>
        <IconTile name="phone" tone="sky" size={34} />
        <span className="flex flex-col">
          <span className="text-body font-bold">{SITE.phone}</span>
          <span className="text-small text-gray-500">{phoneNote}</span>
        </span>
      </a>
      <a href={SITE.emailHref} className={card}>
        <IconTile name="mail" tone="sky" size={34} />
        <span className="flex min-w-0 flex-col">
          <span className="text-body-sm leading-[1.4] font-bold [overflow-wrap:anywhere]">{SITE.email}</span>
          <span className="text-small text-gray-500">{emailNote}</span>
        </span>
      </a>
    </div>
  );
}
