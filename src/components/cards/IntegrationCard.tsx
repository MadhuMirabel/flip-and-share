"use client";

import { useId, useState } from "react";
import { Badge } from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/* Brand data (prototype L3549 / L3546). Brand colours are brand data, */
/* not design tokens, so they stay as raw CSS values here.             */
/* ------------------------------------------------------------------ */

import {
  INTEGRATION_CATEGORIES,
  INTEGRATIONS,
  INTEGRATION_PILLS,
  integrationSteps,
  TAG_TONE,
  type Integration,
  type IntegrationTag,
} from "@/components/cards/integrations-data";

// Re-exported for existing client-side imports. Server components import from integrations-data directly.
export { INTEGRATION_CATEGORIES, INTEGRATIONS, INTEGRATION_PILLS, integrationSteps };
export type { Integration, IntegrationTag };

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
