/**
 * Integration catalogue (prototype `I` list, script L3549). Plain data, kept out of the client card file
 * so server components (e.g. the hero orbit) can import it.
 */

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

export const TAG_TONE = { "Built in": "success", Plugin: "violet", Connect: "info", Business: "warning" } as const;

/** The three setup steps the prototype shows for each integration. */
export function integrationSteps(name: string, tag: IntegrationTag): string[] {
  return [
    tag === "Built in" ? "Sign in with your Mirabel account" : tag === "Plugin" ? `Install the ${name} plugin` : `Click Connect and authorise ${name}`,
    "Choose which titles and events to sync",
    "Data flows both ways from the next issue",
  ];
}
