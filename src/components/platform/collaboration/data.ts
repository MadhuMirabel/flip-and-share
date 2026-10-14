/* Collaboration demo data: prototype PEOPLE (L3080), TEAM_PINS (L3081), roleRows (L3719), teamFeed (L3721). */

export type PersonKey = "PS" | "MT" | "DL" | "JR" | "AK";
export type Person = { ini: PersonKey; name: string; role: string; color: string };

export const PEOPLE: Record<PersonKey, Person> = {
  PS: { ini: "PS", name: "Priya S", role: "Editor", color: "var(--color-amber-500)" },
  MT: { ini: "MT", name: "Mark T", role: "Publisher", color: "var(--color-blue-500)" },
  DL: { ini: "DL", name: "Dana L", role: "Designer", color: "var(--color-violet-500)" },
  JR: { ini: "JR", name: "Jon R", role: "Sales", color: "var(--color-teal-500)" },
  AK: { ini: "AK", name: "Ana K", role: "Advertiser", color: "var(--color-pink-500)" },
};

/** Hero stack order: Object.values(PEOPLE) in the prototype. */
export const HERO_PEOPLE: Person[] = [PEOPLE.PS, PEOPLE.MT, PEOPLE.DL, PEOPLE.JR, PEOPLE.AK];

export type Pin = {
  id: number;
  x: string;
  y: string;
  who: PersonKey;
  when: string;
  text: string;
  assignee: string;
  done: boolean;
};

export const INITIAL_PINS: Pin[] = [
  { id: 0, x: "22%", y: "38%", who: "PS", when: "2h", text: "Swap this ad for the Harbour Motors full page. Bay Auto moved to p20.", assignee: "Dana L", done: false },
  { id: 1, x: "68%", y: "30%", who: "JR", when: "1h", text: "Client asked for the October offer copy here, not September.", assignee: "Priya S", done: false },
  { id: 2, x: "58%", y: "74%", who: "DL", when: "20m", text: "Caption was cut off. Fixed and re-exported.", assignee: "Priya S", done: true },
];

export const ROLE_HEADS: PersonKey[] = ["MT", "PS", "DL", "JR", "AK"];

/** 1 = allowed, 2 = own items only, 0 = no. Columns follow ROLE_HEADS. */
export const ROLE_ROWS: [string, ...(0 | 1 | 2)[]][] = [
  ["Edit flat plan and pages", 1, 1, 1, 0, 0],
  ["Place and swap ads", 1, 1, 0, 1, 0],
  ["Comment and assign", 1, 1, 1, 1, 2],
  ["Upload creative", 1, 1, 1, 1, 1],
  ["Approve proof", 1, 1, 0, 0, 0],
  ['Sign "materials received"', 1, 0, 0, 1, 0],
  ["Publish and unpublish", 1, 0, 0, 0, 0],
  ["View analytics", 1, 1, 1, 1, 2],
  ["Manage billing and roles", 1, 0, 0, 0, 0],
];

export const TEAM_CHIPS = [
  "Proof links, no login",
  "Approve or reject per page",
  "Two sign-off gates",
  "Who and when on everything",
  "Publish report PDF",
  "Version history",
];

export const TEAM_FEED: [PersonKey, string, string][] = [
  ["MT", "signed Proof approved by editor", "11:05 AM"],
  ["PS", "resolved comment #3 on pages 12–13", "10:58 AM"],
  ["DL", "replaced artwork on page 13", "10:51 AM"],
  ["JR", "signed All materials received · 22 of 22", "10:42 AM"],
  ["AK", "approved page 20 via proof link", "10:30 AM"],
  ["PS", "assigned comment #1 to Dana L", "9:12 AM"],
  ["DL", "copied layout from September · pages 4–9", "Yesterday"],
];
