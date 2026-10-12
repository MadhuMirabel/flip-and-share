import { useId, type CSSProperties, type ReactNode } from "react";

/*
 * Closing-banner illustration (prototype `data-ctaart`, script `ART` map / `artFor`).
 * Colours use Tailwind fill-/stroke- utilities so every value comes from the token set.
 */

/** The 12 `ART` map kinds plus every page-specific banner illustration from the prototype markup. */
export type CtaArtKind =
  // ART map (use cases, feature detail)
  | "rocket"
  | "play"
  | "link"
  | "form"
  | "cart"
  | "lock"
  | "search"
  | "layout"
  | "share"
  | "embed"
  | "social"
  | "tags"
  // page-specific
  | "analytics" // bars + trend line
  | "mobile" // phone with red "1" badge
  | "ai" // violet text lines + sparkles
  | "team" // three avatars + status pill
  | "qr" // QR glyph + green scan line
  | "admgr" // 4-panel page with an AD block
  | "news" // bell with "3" badge
  | "solutions" // compass
  | "why" // page + magnifier
  | "product" // PDF page + cursor
  | "templates" // layout page + amber check (same drawing as `layout`)
  | "examples" // globe + spinning arc + LIVE pill
  | "company" // browser card with two pages
  | "resources" // open book
  | "features" // 2×2 tiles with a plus
  | "integrations"; // plug

export const CTA_ART_KINDS: CtaArtKind[] = [
  "rocket", "play", "link", "form", "cart", "lock", "search", "layout", "share", "embed", "social", "tags",
  "analytics", "mobile", "ai", "team", "qr", "admgr", "news", "solutions", "why", "product", "templates",
  "examples", "company", "resources", "features", "integrations",
];

const FEATURE_ART: Record<string, CtaArtKind> = {
  share: "share",
  embed: "embed",
  links: "play",
  access: "lock",
  forms: "form",
  sales: "rocket",
  seo: "search",
  social: "social",
};

/** Prototype `artFor(slug)`: feature-detail / use-case slug → banner art (default `link`). */
export function featureArt(slug: string): CtaArtKind {
  return FEATURE_ART[slug] ?? "link";
}

const PATH_CAPS = { strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Small white tick used in several drawings. */
function Tick({ d }: { d: string }) {
  return <path d={d} fill="none" className="stroke-white" strokeWidth="2.5" {...PATH_CAPS} />;
}

const ART: Record<CtaArtKind, ReactNode> = {
  rocket: (
    <>
      <path d="M150 72c26 24 34 60 22 100h-44c-12-40-4-76 22-100z" className="fill-white stroke-blue-200" fillOpacity=".92" strokeWidth="2" />
      <circle cx="150" cy="122" r="13" className="fill-blue-500" />
      <path d="M128 150l-22 26 24-4zM172 150l22 26-24-4z" className="fill-blue-300" />
      <path d="M138 172h24l-12 30z" className="fill-amber-500" fillOpacity=".9" />
      <path d="M144 172h12l-6 18z" className="fill-amber-200" />
    </>
  ),
  play: (
    <>
      <rect x="88" y="90" width="124" height="112" rx="10" className="fill-white stroke-blue-200" fillOpacity=".92" />
      <rect x="100" y="102" width="100" height="70" rx="6" className="fill-navy-800" fillOpacity=".85" />
      <path d="M142 122l22 15-22 15z" className="fill-white" />
      <rect x="100" y="182" width="100" height="6" rx="3" className="fill-blue-100" />
      <rect x="100" y="182" width="58" height="6" rx="3" className="fill-blue-500" />
      <circle cx="158" cy="185" r="6" className="fill-blue-500" />
    </>
  ),
  link: (
    <>
      <rect x="92" y="80" width="116" height="130" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <g className="fill-blue-200">
        <rect x="106" y="96" width="70" height="6" rx="3" />
        <rect x="106" y="110" width="88" height="5" rx="2.5" />
        <rect x="106" y="122" width="80" height="5" rx="2.5" />
      </g>
      <rect x="106" y="140" width="88" height="50" rx="5" className="fill-blue-100" />
      <circle cx="150" cy="165" r="18" className="fill-blue-500" fillOpacity=".95" />
      <Tick d="M143 168l4 4 8-8M146 160h8a6 6 0 0 1 0 12h-2M154 172h-8a6 6 0 0 1 0-12h2" />
      <circle cx="196" cy="140" r="9" className="fill-amber-500" />
    </>
  ),
  form: (
    <>
      <rect x="96" y="78" width="108" height="140" rx="8" className="fill-white stroke-blue-200" fillOpacity=".92" />
      <rect x="108" y="92" width="60" height="7" rx="3.5" className="fill-navy-800" fillOpacity=".8" />
      <g className="fill-blue-50 stroke-blue-200">
        <rect x="108" y="108" width="84" height="18" rx="4" />
        <rect x="108" y="132" width="84" height="18" rx="4" />
        <rect x="108" y="156" width="84" height="18" rx="4" />
      </g>
      <rect x="114" y="114" width="40" height="6" rx="3" className="fill-blue-300" />
      <rect x="108" y="184" width="84" height="20" rx="5" className="fill-blue-500" />
      <rect x="132" y="192" width="36" height="4" rx="2" className="fill-white" />
      <circle cx="200" cy="90" r="12" className="fill-green-600" />
      <Tick d="M194 90l4 4 8-8" />
    </>
  ),
  cart: (
    <>
      <path d="M96 96h20l16 70h64l14-50H128" fill="none" className="stroke-navy-800" strokeOpacity=".85" strokeWidth="7" {...PATH_CAPS} />
      <circle cx="140" cy="190" r="10" className="fill-navy-800" fillOpacity=".85" />
      <circle cx="188" cy="190" r="10" className="fill-navy-800" fillOpacity=".85" />
      <rect x="142" y="126" width="42" height="30" rx="4" className="fill-blue-500" fillOpacity=".9" />
      <circle cx="204" cy="100" r="16" className="fill-amber-500" />
      <text x="204" y="105" fontSize="13" fontWeight="800" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
        $
      </text>
    </>
  ),
  lock: (
    <>
      <rect x="96" y="80" width="108" height="130" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <g className="fill-blue-200">
        <rect x="110" y="96" width="70" height="6" rx="3" />
        <rect x="110" y="110" width="80" height="5" rx="2.5" />
        <rect x="110" y="122" width="76" height="5" rx="2.5" />
      </g>
      <rect x="96" y="140" width="108" height="70" rx="8" className="fill-blue-100" fillOpacity=".9" />
      <rect x="130" y="160" width="40" height="34" rx="6" className="fill-navy-800" fillOpacity=".9" />
      <path d="M138 160v-10a12 12 0 0 1 24 0v10" fill="none" className="stroke-navy-800" strokeOpacity=".9" strokeWidth="5" />
      <circle cx="150" cy="177" r="4" className="fill-white" />
    </>
  ),
  search: (
    <>
      <rect x="88" y="94" width="124" height="34" rx="17" className="fill-white stroke-blue-200" fillOpacity=".95" />
      <circle cx="106" cy="111" r="7" fill="none" className="stroke-blue-500" strokeWidth="3" />
      <path d="M111 116l5 5" className="stroke-blue-500" strokeWidth="3" strokeLinecap="round" />
      <rect x="122" y="108" width="60" height="6" rx="3" className="fill-blue-200" />
      <rect x="88" y="140" width="124" height="60" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <rect x="100" y="152" width="90" height="7" rx="3.5" className="fill-google-link" fillOpacity=".7" />
      <rect x="100" y="166" width="100" height="5" rx="2.5" className="fill-blue-200" />
      <rect x="100" y="178" width="80" height="5" rx="2.5" className="fill-blue-200" />
      <circle cx="204" cy="140" r="12" className="fill-green-600" />
      <Tick d="M198 140l4 4 8-8" />
    </>
  ),
  layout: (
    <>
      <rect x="95" y="80" width="110" height="130" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <rect x="108" y="94" width="84" height="26" rx="4" className="fill-blue-500" fillOpacity=".85" />
      <rect x="108" y="128" width="38" height="68" rx="4" className="fill-blue-100" />
      <rect x="154" y="128" width="38" height="30" rx="4" className="fill-blue-100" />
      <rect x="154" y="166" width="38" height="30" rx="4" className="fill-blue-200" />
      <circle cx="205" cy="200" r="12" className="fill-amber-500" />
      <Tick d="M199 200l4 4 8-8" />
    </>
  ),
  share: (
    <>
      <circle cx="112" cy="145" r="16" className="fill-blue-500" />
      <circle cx="188" cy="104" r="16" className="fill-violet-500" />
      <circle cx="188" cy="186" r="16" className="fill-amber-500" />
      <path d="M126 138l48-28M126 152l48 28" className="stroke-navy-800" strokeOpacity=".6" strokeWidth="4" strokeLinecap="round" />
      <rect x="86" y="188" width="70" height="22" rx="11" className="fill-white stroke-blue-200" fillOpacity=".95" />
      <rect x="96" y="197" width="50" height="4" rx="2" className="fill-blue-300" />
    </>
  ),
  embed: (
    <>
      <rect x="86" y="86" width="128" height="120" rx="10" className="fill-white stroke-blue-200" fillOpacity=".92" />
      <rect x="86" y="86" width="128" height="18" rx="10" className="fill-blue-100" />
      <rect x="100" y="116" width="52" height="76" rx="4" className="fill-blue-100" />
      <rect x="160" y="116" width="40" height="6" rx="3" className="fill-blue-200" />
      <rect x="160" y="128" width="34" height="5" rx="2.5" className="fill-blue-200" />
      <rect x="118" y="132" width="44" height="60" rx="3" className="fill-blue-500 stroke-white" fillOpacity=".85" strokeWidth="2" />
      <text x="140" y="166" fontSize="16" fontWeight="800" className="fill-white" textAnchor="middle" fontFamily="monospace">
        {"</>"}
      </text>
    </>
  ),
  social: (
    <>
      <rect x="92" y="84" width="116" height="122" rx="10" className="fill-white stroke-blue-200" fillOpacity=".92" />
      <circle cx="110" cy="102" r="9" className="fill-blue-500" />
      <rect x="124" y="97" width="50" height="5" rx="2.5" className="fill-blue-200" />
      <rect x="124" y="106" width="30" height="4" rx="2" className="fill-blue-100" />
      <rect x="104" y="120" width="92" height="52" rx="6" className="fill-blue-100" />
      <rect x="118" y="128" width="26" height="36" rx="3" className="fill-blue-500" fillOpacity=".85" />
      <rect x="150" y="132" width="40" height="5" rx="2.5" className="fill-blue-300" />
      <rect x="150" y="142" width="34" height="5" rx="2.5" className="fill-blue-300" />
      <g className="fill-navy-800" fillOpacity=".7">
        <path d="M108 186c0-4 6-4 6 0s-6 6-6 6-6-2-6-6 6-4 6 0z" transform="translate(4 -2)" />
        <rect x="128" y="182" width="28" height="5" rx="2.5" />
      </g>
      <circle cx="196" cy="90" r="14" className="fill-pink-500" />
      <path d="M190 88l3 5 3-5 3 5 3-5" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  tags: (
    <>
      <rect x="95" y="80" width="110" height="130" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <g className="fill-blue-200">
        <rect x="108" y="96" width="60" height="6" rx="3" />
        <rect x="108" y="110" width="84" height="5" rx="2.5" />
      </g>
      <g className="fill-blue-100 stroke-blue-300">
        <rect x="108" y="130" width="40" height="18" rx="9" />
        <rect x="154" y="130" width="38" height="18" rx="9" />
        <rect x="108" y="156" width="52" height="18" rx="9" />
      </g>
      <rect x="166" y="156" width="26" height="18" rx="9" className="fill-blue-500" />
      <path d="M186 100l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" className="fill-violet-500" fillOpacity=".9" />
    </>
  ),
  analytics: (
    <>
      <rect x="95" y="80" width="110" height="130" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <rect x="112" y="150" width="14" height="40" rx="3" className="fill-blue-200" />
      <rect x="134" y="130" width="14" height="60" rx="3" className="fill-blue-300" />
      <rect x="156" y="112" width="14" height="78" rx="3" className="fill-blue-500" />
      <rect x="178" y="98" width="14" height="92" rx="3" className="fill-navy-800" fillOpacity=".85" />
      <path d="M112 128l24-14 22 8 26-24" fill="none" className="stroke-green-600" strokeWidth="3" {...PATH_CAPS} />
    </>
  ),
  mobile: (
    <>
      <rect x="112" y="60" width="78" height="160" rx="14" className="fill-ink-950" fillOpacity=".9" />
      <rect x="119" y="74" width="64" height="132" rx="8" className="fill-white" />
      <rect x="127" y="86" width="48" height="60" rx="4" className="fill-blue-100" />
      <rect x="127" y="154" width="40" height="6" rx="3" className="fill-blue-200" />
      <rect x="127" y="166" width="30" height="6" rx="3" className="fill-blue-200" />
      <circle cx="176" cy="84" r="9" className="fill-red-500" />
      <text x="176" y="88" fontSize="10" fontWeight="700" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
        1
      </text>
    </>
  ),
  ai: (
    <>
      <rect x="95" y="80" width="110" height="130" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <rect x="112" y="100" width="60" height="7" rx="3.5" className="fill-violet-500" fillOpacity=".7" />
      <rect x="112" y="116" width="76" height="5" rx="2.5" className="fill-violet-200" />
      <rect x="112" y="128" width="70" height="5" rx="2.5" className="fill-violet-200" />
      <rect x="112" y="140" width="64" height="5" rx="2.5" className="fill-violet-200" />
      <path d="M175 160l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" className="fill-violet-500" fillOpacity=".9" />
      {/* #a78bfa (violet-400) has no token; violet-300 is the nearest token */}
      <path d="M120 165l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" className="fill-violet-300" />
    </>
  ),
  team: (
    <>
      <circle cx="118" cy="120" r="22" className="fill-blue-500" fillOpacity=".9" />
      <circle cx="182" cy="120" r="22" className="fill-amber-500" fillOpacity=".9" />
      <circle cx="150" cy="160" r="26" className="fill-violet-500 stroke-white" fillOpacity=".9" strokeWidth="4" />
      <rect x="96" y="196" width="108" height="26" rx="13" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <circle cx="112" cy="209" r="5" className="fill-green-600" />
      <rect x="124" y="205" width="60" height="8" rx="4" className="fill-blue-200" />
    </>
  ),
  qr: (
    <>
      <rect x="100" y="90" width="100" height="100" rx="10" className="fill-white stroke-blue-200" fillOpacity=".92" />
      <g className="fill-navy-800" fillOpacity=".9">
        <rect x="112" y="102" width="28" height="28" rx="4" />
        <rect x="160" y="102" width="28" height="28" rx="4" />
        <rect x="112" y="150" width="28" height="28" rx="4" />
        <rect x="160" y="150" width="10" height="10" />
        <rect x="178" y="150" width="10" height="10" />
        <rect x="160" y="168" width="10" height="10" />
        <rect x="178" y="168" width="10" height="10" />
      </g>
      <g className="fill-white">
        <rect x="120" y="110" width="12" height="12" />
        <rect x="168" y="110" width="12" height="12" />
        <rect x="120" y="158" width="12" height="12" />
      </g>
      <rect
        x="96"
        y="138"
        width="108"
        height="3"
        rx="1.5"
        className="fill-green-500"
        style={{ animation: "fasScanY 2.6s ease-in-out infinite alternate" }}
      />
    </>
  ),
  admgr: (
    <>
      <rect x="92" y="84" width="116" height="126" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <g className="fill-blue-100">
        <rect x="104" y="98" width="42" height="52" rx="3" />
        <rect x="154" y="98" width="42" height="52" rx="3" />
        <rect x="104" y="158" width="42" height="40" rx="3" />
      </g>
      <rect x="154" y="158" width="42" height="40" rx="3" className="fill-blue-500" fillOpacity=".9" />
      <text x="175" y="182" fontSize="9" fontWeight="700" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
        AD
      </text>
      <rect x="110" y="112" width="30" height="5" rx="2.5" className="fill-blue-200" />
      <rect x="160" y="112" width="30" height="5" rx="2.5" className="fill-blue-200" />
    </>
  ),
  news: (
    <>
      <path d="M150 78c-24 0-40 18-40 42v30l-14 20h108l-14-20v-30c0-24-16-42-40-42z" className="fill-white stroke-blue-200" fillOpacity=".92" strokeWidth="2" />
      <circle cx="150" cy="186" r="12" className="fill-navy-800" fillOpacity=".85" />
      <circle cx="186" cy="88" r="14" className="fill-blue-500" />
      <text x="186" y="93" fontSize="12" fontWeight="700" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
        3
      </text>
    </>
  ),
  solutions: (
    <>
      <circle cx="150" cy="145" r="58" className="fill-white stroke-blue-200" fillOpacity=".92" strokeWidth="2" />
      <circle cx="150" cy="145" r="44" fill="none" className="stroke-blue-100" strokeWidth="2" />
      <path d="M150 100l12 36-12 12-12-12z" className="fill-blue-500" />
      <path d="M150 190l-12-36 12-12 12 12z" className="fill-navy-800" fillOpacity=".8" />
      <circle cx="150" cy="145" r="6" className="fill-white stroke-navy-800" strokeWidth="2" />
    </>
  ),
  why: (
    <>
      <rect x="92" y="84" width="96" height="126" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <g className="fill-blue-200">
        <rect x="106" y="100" width="56" height="7" rx="3.5" />
        <rect x="106" y="116" width="66" height="5" rx="2.5" />
        <rect x="106" y="128" width="60" height="5" rx="2.5" />
        <rect x="106" y="140" width="64" height="5" rx="2.5" />
      </g>
      <circle cx="176" cy="166" r="28" className="fill-blue-100 stroke-blue-500" fillOpacity=".9" strokeWidth="5" />
      <path d="M197 187l18 18" className="stroke-blue-500" strokeWidth="8" strokeLinecap="round" />
      <circle cx="176" cy="166" r="14" className="fill-blue-500" fillOpacity=".25" />
    </>
  ),
  product: (
    <>
      <rect x="92" y="78" width="104" height="134" rx="8" className="fill-white stroke-blue-200" fillOpacity=".9" />
      <rect x="92" y="78" width="104" height="26" rx="8" className="fill-red-500" fillOpacity=".85" />
      <text x="144" y="96" fontSize="11" fontWeight="800" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
        PDF
      </text>
      <g className="fill-blue-200">
        <rect x="106" y="118" width="70" height="5" rx="2.5" />
        <rect x="106" y="130" width="60" height="5" rx="2.5" />
        <rect x="106" y="142" width="66" height="5" rx="2.5" />
      </g>
      <rect x="106" y="158" width="72" height="40" rx="4" className="fill-blue-100" />
      <path d="M168 176l8 24 4-9 9-4z" className="fill-gray-900 stroke-white" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  templates: null, // filled below: identical to `layout` in the prototype
  examples: (
    <>
      <circle cx="150" cy="145" r="56" className="fill-white stroke-blue-200" fillOpacity=".92" strokeWidth="2" />
      <ellipse cx="150" cy="145" rx="24" ry="56" fill="none" className="stroke-blue-300" strokeWidth="2" />
      <path d="M94 145h112M104 118h92M104 172h92" className="stroke-blue-300" strokeWidth="2" />
      <circle
        cx="150"
        cy="145"
        r="56"
        fill="none"
        className="stroke-blue-500"
        strokeWidth="3"
        strokeDasharray="40 300"
        strokeLinecap="round"
        style={{ transformOrigin: "150px 145px", animation: "fasSpin 6s linear infinite" }}
      />
      <rect x="176" y="176" width="46" height="18" rx="9" className="fill-blue-500" />
      <text x="199" y="189" fontSize="9" fontWeight="700" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
        LIVE
      </text>
    </>
  ),
  company: (
    <>
      <rect x="86" y="90" width="128" height="94" rx="10" className="fill-white stroke-blue-200" fillOpacity=".92" />
      <rect x="86" y="90" width="128" height="18" rx="10" className="fill-blue-100" />
      <circle cx="98" cy="99" r="3" className="fill-slate-300" />
      <circle cx="108" cy="99" r="3" className="fill-slate-300" />
      <rect x="100" y="118" width="46" height="56" rx="3" className="fill-blue-500" fillOpacity=".8" />
      <rect x="150" y="118" width="46" height="56" rx="3" className="fill-blue-300" fillOpacity=".8" />
      <path d="M120 200c14-16 46-16 60 0" fill="none" className="stroke-navy-800" strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="200" r="7" className="fill-navy-800" fillOpacity=".85" />
    </>
  ),
  resources: (
    <>
      <path d="M150 90c-20-10-42-12-60-6v110c18-6 40-4 60 6z" className="fill-white stroke-blue-200" fillOpacity=".92" strokeWidth="2" />
      <path d="M150 90c20-10 42-12 60-6v110c-18-6-40-4-60 6z" className="fill-blue-100 stroke-blue-200" strokeWidth="2" />
      <g className="fill-blue-200">
        <rect x="102" y="108" width="36" height="5" rx="2.5" />
        <rect x="102" y="120" width="30" height="5" rx="2.5" />
        <rect x="102" y="132" width="34" height="5" rx="2.5" />
      </g>
      <g className="fill-blue-300">
        <rect x="162" y="108" width="36" height="5" rx="2.5" />
        <rect x="162" y="120" width="30" height="5" rx="2.5" />
      </g>
      <rect x="162" y="134" width="36" height="30" rx="3" className="fill-blue-500" fillOpacity=".8" />
    </>
  ),
  features: (
    <>
      <g className="fill-white stroke-blue-200" fillOpacity=".92">
        <rect x="96" y="86" width="50" height="50" rx="8" />
        <rect x="154" y="86" width="50" height="50" rx="8" />
        <rect x="96" y="144" width="50" height="50" rx="8" />
      </g>
      <rect x="154" y="144" width="50" height="50" rx="8" className="fill-blue-500" fillOpacity=".9" />
      <path d="M172 169h14M179 162v14" className="stroke-white" strokeWidth="3" strokeLinecap="round" />
      <g className="fill-blue-300">
        <circle cx="121" cy="111" r="9" />
        <rect x="169" y="102" width="20" height="18" rx="3" />
        <path d="M112 178l9-14 9 14z" />
      </g>
    </>
  ),
  integrations: (
    <>
      <rect x="104" y="112" width="92" height="66" rx="14" className="fill-white stroke-blue-200" fillOpacity=".92" strokeWidth="2" />
      <rect x="122" y="84" width="12" height="34" rx="4" className="fill-navy-800" fillOpacity=".85" />
      <rect x="166" y="84" width="12" height="34" rx="4" className="fill-navy-800" fillOpacity=".85" />
      <path d="M150 178v28" className="stroke-blue-500" strokeWidth="7" strokeLinecap="round" />
      <circle cx="150" cy="145" r="10" className="fill-blue-500" />
    </>
  ),
};
ART.templates = ART.layout;

const anim = (origin: string, animation: string): CSSProperties => ({ transformOrigin: origin, animation });

/**
 * The banner SVG on its own (viewBox 330×300, `xMinYMid slice`): two drifting gradient blobs,
 * the centre illustration and the floating check badge. Fills its parent. Gradient ids are unique per instance.
 */
export function CtaArtSvg({ kind, className = "" }: { kind: CtaArtKind; className?: string }) {
  const id = `fas${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const g1 = `${id}-blob`;
  const g2 = `${id}-blob2`;
  return (
    <svg
      viewBox="0 0 330 300"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={g1} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-blue-400)" }} stopOpacity=".35" />
          <stop offset="1" style={{ stopColor: "var(--color-blue-500)" }} stopOpacity=".08" />
        </linearGradient>
        <linearGradient id={g2} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-blue-300)" }} stopOpacity=".3" />
          <stop offset="1" style={{ stopColor: "var(--color-blue-200)" }} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g style={anim("130px 150px", "fasBlobA 14s ease-in-out infinite")}>
        <path d="M80 10c70-40 170-10 210 60s10 160-70 200S30 290-10 210-10 50 80 10z" fill={`url(#${g1})`} />
      </g>
      <g style={anim("100px 170px", "fasBlobB 18s ease-in-out infinite")}>
        <path d="M0 110c30-80 130-90 190-40s60 150 0 200S40 300-10 240-30 190 0 110z" fill={`url(#${g2})`} />
      </g>
      <g style={anim("150px 150px", "fasPageDrift 9s ease-in-out infinite")}>{ART[kind]}</g>
      <g style={anim("196px 86px", "fasSFloat 6s ease-in-out infinite")}>
        <circle cx="196" cy="86" r="15" className="fill-white stroke-blue-200" />
        <path d="M189 86l5 5 9-10" fill="none" className="stroke-green-600" strokeWidth="2.5" {...PATH_CAPS} />
      </g>
    </svg>
  );
}

/**
 * The absolutely positioned art layer used inside `ClosingCtaBanner`
 * (left -90px, top/bottom -70px, 380px wide; hidden at ≤760px).
 */
export function CtaArt({ kind, className = "" }: { kind: CtaArtKind; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -top-[70px] -bottom-[70px] -left-[90px] z-0 w-[380px] overflow-hidden max-[760px]:hidden ${className}`}
    >
      <CtaArtSvg kind={kind} />
    </div>
  );
}
