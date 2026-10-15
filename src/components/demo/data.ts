import type { IconName } from "@/components/icons";

/* Book a demo page content (prototype `isDemo` screen, design/FlipAndShare Prototype.dc.html L1470-1574, logic L3954-3980). */

export const DEMO_CHIPS: { icon: IconName; label: string }[] = [
  { icon: "clock", label: "30 minutes" },
  { icon: "file", label: "Bring your own PDF" },
  { icon: "check", label: "No obligation" },
];

export const DEMO_STEPS = [{ label: "Your details" }, { label: "Pick a time" }, { label: "Confirmed" }];

export const DEMO_VOLUMES = ["1–4", "5–12", "13–50", "50+"];

export const DEMO_TOPICS: { value: string; label: string; icon: IconName }[] = [
  { value: "flip", label: "PDF to flipbook", icon: "upload" },
  { value: "ads", label: "Ads and Ad Manager", icon: "megaphone" },
  { value: "analytics", label: "Analytics", icon: "chart" },
  { value: "qr", label: "QR codes", icon: "qr" },
  { value: "shop", label: "Shoppable pages", icon: "cart" },
  { value: "migrate", label: "Switching tools", icon: "send" },
  { value: "team", label: "Team and approvals", icon: "users" },
  { value: "ent", label: "SSO and white label", icon: "lock" },
];

/** Reads `?topic=migrate` (or a comma list) into known topic values, so CTAs can pre-select what to show. */
export function parseTopics(raw: string | null): string[] {
  if (!raw) return [];
  const known = new Set(DEMO_TOPICS.map((t) => t.value));
  return [...new Set(raw.split(","))].filter((t) => known.has(t));
}

export type DemoTimeZone = { value: string; label: string; short: string; iana: string };

export const DEMO_TIME_ZONES: DemoTimeZone[] = [
  { value: "ET", label: "Eastern (ET)", short: "ET", iana: "America/New_York" },
  { value: "CT", label: "Central (CT)", short: "CT", iana: "America/Chicago" },
  { value: "MT", label: "Mountain (MT)", short: "MT", iana: "America/Denver" },
  { value: "PT", label: "Pacific (PT)", short: "PT", iana: "America/Los_Angeles" },
];

/** Every bookable slot; each day offers a different subset (see `slotsFor`). */
export const DEMO_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:30 PM",
  "3:00 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

/** Bookable window: weekdays from tomorrow up to this many days ahead. */
export const DEMO_BOOKING_DAYS = 30;

/** Call length in minutes (used for the calendar file). */
export const DEMO_MINUTES = 30;

export const DEMO_EXPECT = [
  {
    title: "Your goals",
    time: "5 min",
    body: "What you publish, how you sell ads today and what you want to improve.",
    tone: "bg-blue-100 text-blue-700",
  },
  {
    title: "Your issue, live",
    time: "15 min",
    body: "We turn your PDF into a flipbook, add links, video and an ad, and publish it.",
    tone: "bg-amber-100 text-amber-700",
  },
  {
    title: "Analytics and revenue",
    time: "5 min",
    body: "Reads, clicks, QR scans and the advertiser report you can sell.",
    tone: "bg-green-100 text-green-700",
  },
  {
    title: "Plan and next steps",
    time: "5 min",
    body: "The right plan, migration help and a written summary after the call.",
    tone: "bg-violet-100 text-violet-700",
  },
];

export const DEMO_PREP = [
  "Have a recent issue PDF ready, any size.",
  "Invite a colleague who handles ad sales or production.",
  "Note one thing you want your digital edition to do better.",
];
