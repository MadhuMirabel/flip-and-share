"use client";

import { useId, useState } from "react";
import { Badge } from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/* Brand data (prototype L3549 / L3546). Brand colours are brand data, */
/* not design tokens, so they stay as raw CSS values here.             */
/* ------------------------------------------------------------------ */

export type IntegrationTag = "Built in" | "Plugin" | "Connect" | "Business";

export type Integration = {
  initials: string;
  /** CSS background of the logo tile (colour or gradient). */
  brand: string;
  name: string;
  category: string;
  description: string;
  tag: IntegrationTag;
};

export const INTEGRATION_CATEGORIES = [
  "All",
  "Mirabel",
  "Design",
  "Websites",
  "Analytics",
  "CRM",
  "Email",
  "Commerce",
  "Automation",
  "Advertising",
  "Developers",
] as const;

export const INTEGRATIONS: Integration[] = [
  { initials: "MM", brand: "linear-gradient(135deg,#0c4a6e,#38bdf8)", name: "Magazine Manager", category: "Mirabel", description: "Booked insertions land on the flat plan. Advertiser click reports flow back to the account.", tag: "Built in" },
  { initials: "DS", brand: "linear-gradient(135deg,#0369a1,#7dd3fc)", name: "Digital Studio", category: "Mirabel", description: "Design, flat plan and Ad Adviser. Publish straight to FlipAndShare.", tag: "Built in" },
  { initials: "MK", brand: "#7c3aed", name: "Marketing Manager", category: "Mirabel", description: "Send new-issue emails and sync lead-form contacts to lists.", tag: "Built in" },
  { initials: "Id", brand: "#be185d", name: "Adobe InDesign", category: "Design", description: "Export from InDesign and publish in one step, keeping links and layers.", tag: "Plugin" },
  { initials: "C", brand: "#06b6d4", name: "Canva", category: "Design", description: "Design brochures and catalogs in Canva, then publish them here.", tag: "Connect" },
  { initials: "WP", brand: "#1e293b", name: "WordPress", category: "Websites", description: "Embed any edition with a shortcode or block. Updates automatically.", tag: "Plugin" },
  { initials: "GA", brand: "#f97316", name: "Google Analytics 4", category: "Analytics", description: "Page views, hotspot clicks and QR scans as GA4 events.", tag: "Connect" },
  { initials: "GTM", brand: "#2563eb", name: "Google Tag Manager", category: "Analytics", description: "Fire your own tags on reader events.", tag: "Connect" },
  { initials: "AM", brand: "#16a34a", name: "Google Ad Manager", category: "Advertising", description: "Serve display ads between pages and track impressions.", tag: "Connect" },
  { initials: "HS", brand: "#ea580c", name: "HubSpot", category: "CRM", description: "Lead-form submissions become HubSpot contacts with the issue and page.", tag: "Connect" },
  { initials: "SF", brand: "#0ea5e9", name: "Salesforce", category: "CRM", description: "Push leads and advertiser engagement to Salesforce.", tag: "Business" },
  { initials: "MC", brand: "#ca8a04", name: "Mailchimp", category: "Email", description: "Add subscribers from lead forms to Mailchimp audiences.", tag: "Connect" },
  { initials: "Z", brand: "#f97316", name: "Zapier", category: "Automation", description: "Connect 6,000+ apps to new issues, leads and scans.", tag: "Connect" },
  { initials: "SH", brand: "#65a30d", name: "Shopify", category: "Commerce", description: "Tag Shopify products on the page. Readers buy without leaving.", tag: "Connect" },
  { initials: "ST", brand: "#8b5cf6", name: "Stripe", category: "Commerce", description: "Sell issues and subscriptions with Stripe checkout.", tag: "Connect" },
  { initials: "API", brand: "#334155", name: "REST API & webhooks", category: "Developers", description: "Create, publish and pull analytics from any system.", tag: "Business" },
];

/** "Works with your tools" logo pills on the Features page (fxInteg; names and colours differ slightly from the list above). */
export const INTEGRATION_PILLS: { initials: string; brand: string; name: string }[] = [
  { initials: "MM", brand: "linear-gradient(135deg,#0c4a6e,#38bdf8)", name: "Magazine Manager" },
  { initials: "Id", brand: "#be185d", name: "Adobe InDesign" },
  { initials: "C", brand: "#06b6d4", name: "Canva" },
  { initials: "WP", brand: "#1e293b", name: "WordPress" },
  { initials: "GA", brand: "#f97316", name: "Google Analytics" },
  { initials: "GTM", brand: "#2563eb", name: "Tag Manager" },
  { initials: "MC", brand: "#facc15", name: "Mailchimp" },
  { initials: "HS", brand: "#ea580c", name: "HubSpot" },
  { initials: "SF", brand: "#0ea5e9", name: "Salesforce" },
  { initials: "Z", brand: "#f97316", name: "Zapier" },
];

const TAG_TONE = { "Built in": "success", Plugin: "violet", Connect: "info", Business: "warning" } as const;

/** The three setup steps the prototype shows for each integration. */
export function integrationSteps(name: string, tag: IntegrationTag): string[] {
  return [
    tag === "Built in" ? "Sign in with your Mirabel account" : tag === "Plugin" ? `Install the ${name} plugin` : `Click Connect and authorise ${name}`,
    "Choose which titles and events to sync",
    "Data flows both ways from the next issue",
  ];
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function LogoTile({ initials, brand, size }: { initials: string; brand: string; size: 30 | 42 }) {
  return (
    <span
      aria-hidden="true"
      className={`flex flex-none items-center justify-center font-extrabold tracking-[-0.02em] text-white ${size === 42 ? "rounded-lg text-xs" : "rounded-md text-eyebrow"}`}
      style={{ width: size, height: size, background: brand }}
    >
      {initials}
    </span>
  );
}

export type ConnectState = "connect" | "connected" | "business";

const CONNECT: Record<ConnectState, { label: string; cls: string }> = {
  connect: { label: "Connect", cls: "bg-blue-500 text-white hover:bg-blue-600" },
  connected: { label: "✓ Connected", cls: "bg-green-100 text-green-800" },
  business: { label: "Available on Business", cls: "bg-gray-100 text-gray-500 hover:text-gray-700" },
};

export type IntegrationCardProps = Integration & {
  /** Controlled expanded state; omit to let the card manage it. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Defaults to "business" for Business-tagged items, otherwise "connect". */
  connectState?: ConnectState;
  /** Called by the Connect button (route Business items to /pricing). */
  onConnect?: () => void;
  steps?: string[];
  className?: string;
};

/** Expandable integration card. The header is a disclosure button (aria-expanded); the Connect button lives in the panel. */
export function IntegrationCard({
  initials,
  brand,
  name,
  category,
  description,
  tag,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  connectState,
  onConnect,
  steps,
  className = "",
}: IntegrationCardProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const panelId = useId();
  const state = connectState ?? (tag === "Business" ? "business" : "connect");
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open);
    onOpenChange?.(!open);
  };

  return (
    <div
      className={`flex flex-col gap-2.5 rounded-lg border bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-blue-300 hover:shadow-lift ${open ? "border-blue-500" : "border-gray-200"} ${className}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full cursor-pointer flex-col gap-2.5 border-0 bg-transparent p-0 text-left"
      >
        <span className="flex w-full items-center gap-3">
          <LogoTile initials={initials} brand={brand} size={42} />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[15.5px] font-bold text-navy-800">{name}</span>
            <span className="text-xs text-gray-500">{category}</span>
          </span>
          <Badge tone={TAG_TONE[tag]} size="sm" className="ml-auto font-bold!">
            {tag}
          </Badge>
        </span>
        <span className="text-menu leading-[1.55] text-gray-600">{description}</span>
      </button>
      {open && (
        <div
          id={panelId}
          className="flex flex-col gap-1.5 border-t border-gray-100 pt-2"
          style={{ animation: "fasFade .3s ease-out both" }}
        >
          <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
            {(steps ?? integrationSteps(name, tag)).map((st, i) => (
              <li key={i} className="grid grid-cols-[20px_minmax(0,1fr)] gap-2 text-label text-gray-700">
                <b className="text-blue-600">{i + 1}</b>
                {st}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={onConnect}
            className={`mt-1.5 cursor-pointer self-start rounded-md border-0 px-3.5 py-[9px] text-label font-semibold transition-colors duration-200 ${CONNECT[state].cls}`}
          >
            {CONNECT[state].label}
          </button>
        </div>
      )}
    </div>
  );
}

/** Compact logo pill ("Works with your tools"). */
export function IntegrationPill({ initials, brand, name, className = "" }: { initials: string; brand: string; name: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-2.5 ${className}`}>
      <LogoTile initials={initials} brand={brand} size={30} />
      <span className="text-sm font-semibold text-navy-800">{name}</span>
    </span>
  );
}
