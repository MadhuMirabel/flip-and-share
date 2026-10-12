import { Icon } from "@/components/icons";
import { StripedPlaceholder } from "./BookSpread";

/* ------------------------------------------------------------------ */
/* SerpCard                                                            */
/* ------------------------------------------------------------------ */

export type SerpCardProps = {
  /** URL or breadcrumb line, e.g. "RocketSTEM › issue-14 › mars-express". */
  url: string;
  title: string;
  description: string;
  /** Small white chips under the description (highlighted result). */
  chips?: string[];
  /**
   * plain = bare result (Publish preview) · highlighted = sky panel with favicon (your result) ·
   * faded = competitor result at 55% · dimmed = 40% (Publish preview when the issue is not public).
   */
  variant?: "plain" | "highlighted" | "faded" | "dimmed";
  /** md = homepage (12 / 17 / 13px) · lg = Publish screen (12.5 / 19 / 13.5px). */
  size?: "md" | "lg";
  /** Entrance delay in seconds for the fasFade reveal; omit for no animation. */
  delay?: number;
  className?: string;
};

const SERP_OPACITY = { plain: "", highlighted: "", faded: "opacity-55", dimmed: "opacity-40" };

/** Google-style search result preview. Decorative mockup text, so it is not a link. */
export function SerpCard({ url, title, description, chips, variant = "plain", size = "md", delay, className = "" }: SerpCardProps) {
  const hi = variant === "highlighted";
  const lg = size === "lg";
  return (
    <div
      className={`flex flex-col gap-1 ${variant === "plain" && lg ? "" : "p-3"} ${hi ? "rounded-lg border border-blue-200 bg-blue-50" : ""} ${SERP_OPACITY[variant]} transition-opacity duration-300 ${className}`}
      style={delay !== undefined ? { animation: `fasFade .5s ease-out ${delay}s both` } : undefined}
    >
      <div className="flex items-center gap-2">
        {hi && (
          <span
            aria-hidden="true"
            className="h-[22px] w-[22px] flex-none rounded-full"
            style={{ background: "linear-gradient(135deg,var(--color-navy-800),var(--color-blue-400))" }}
          />
        )}
        <span className={`${lg ? "text-small" : "text-xs"} text-gray-700`}>{url}</span>
      </div>
      <span className={`${lg ? "text-[19px]" : "text-body-lg"} leading-[1.3] text-google-link`}>{title}</span>
      <span className={`${lg ? "text-menu" : "text-label"} leading-normal text-gray-600`}>{description}</span>
      {chips && chips.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span key={c} className="rounded-full border border-gray-200 bg-white px-2 py-[3px] text-eyebrow text-gray-700">
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SocialPreviewCard                                                   */
/* ------------------------------------------------------------------ */

export type SocialPreviewCardProps = {
  domain: string;
  title: string;
  description: string;
  /** Share image URL; striped placeholder when omitted. */
  image?: string;
  /** Placeholder caption, e.g. "cover image · 1200×630". */
  caption?: string;
  className?: string;
};

/** Open Graph link-preview card (1.91:1 image + domain, title, one-line description). */
export function SocialPreviewCard({ domain, title, description, image, caption = "cover image · 1200×630", className = "" }: SocialPreviewCardProps) {
  return (
    <div className={`overflow-hidden rounded-md border border-gray-200 ${className}`}>
      {image ? (
        <div aria-hidden="true" className="aspect-[1.91/1] bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      ) : (
        <StripedPlaceholder tone="sky" caption={caption} className="aspect-[1.91/1]" />
      )}
      <div className="flex flex-col gap-[3px] bg-gray-50 px-3.5 py-3">
        <span className="text-caption text-gray-500 uppercase">{domain}</span>
        <span className="text-body-sm leading-[1.35] font-semibold text-gray-900">{title}</span>
        <span className="truncate text-label text-gray-500">{description}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SearchBarMock                                                       */
/* ------------------------------------------------------------------ */

/** Static pill search bar with a query (SEO demo). Decorative: not an input. */
export function SearchBarMock({ query, className = "" }: { query: string; className?: string }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-full border border-gray-200 px-4 py-[9px] text-sm text-gray-700 shadow-[0_2px_6px_rgba(0,0,0,0.06)] ${className}`}
    >
      <span className="flex text-gray-400">
        <Icon name="search" size={15} />
      </span>
      {query}
    </div>
  );
}
