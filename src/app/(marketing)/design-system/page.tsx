import type { Metadata } from "next";
import { Icon, ICON_PATHS, type IconName } from "@/components/icons";
import { Button, IconButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile, type TileTone } from "@/components/ui/IconTile";
import { CardsDemo } from "./demos/CardsDemo";
import { ChartsDemo } from "./demos/ChartsDemo";
import { DisplayDemo } from "./demos/DisplayDemo";
import { FormsDemo } from "./demos/FormsDemo";
import { MockupsDemo } from "./demos/MockupsDemo";
import { NavigationDemo } from "./demos/NavigationDemo";
import { SectionsDemo } from "./demos/SectionsDemo";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const SWATCHES: { group: string; tokens: [string, string][] }[] = [
  {
    group: "Ocean",
    tokens: [
      ["ink-950", "#0b1f2e"],
      ["navy-900", "#0f2f45"],
      ["navy-800", "#0c4a6e"],
      ["navy-700", "#075985"],
      ["blue-700", "#0369a1"],
      ["blue-600", "#0284c7"],
      ["blue-500", "#0ea5e9"],
      ["blue-400", "#38bdf8"],
      ["blue-300", "#7dd3fc"],
      ["blue-200", "#bae6fd"],
      ["blue-100", "#e0f2fe"],
      ["blue-50", "#f0f9ff"],
    ],
  },
  {
    group: "Neutrals",
    tokens: [
      ["gray-900", "#111827"],
      ["gray-700", "#374151"],
      ["gray-600", "#4b5563"],
      ["gray-500", "#6b7280"],
      ["gray-400", "#9ca3af"],
      ["gray-300", "#d1d5db"],
      ["gray-200", "#e5e7eb"],
      ["gray-100", "#f3f4f6"],
      ["slate-400", "#94a3b8"],
      ["slate-300", "#cbd5e1"],
      ["slate-100", "#f1f5f9"],
      ["slate-50", "#f8fafc"],
    ],
  },
  {
    group: "Accents",
    tokens: [
      ["amber-500", "#f59e0b"],
      ["amber-700", "#b45309"],
      ["amber-100", "#fef3c7"],
      ["violet-500", "#8b5cf6"],
      ["violet-700", "#6d28d9"],
      ["violet-100", "#ede9fe"],
      ["green-600", "#16a34a"],
      ["green-800", "#166534"],
      ["green-100", "#dcfce7"],
      ["teal-500", "#14b8a6"],
      ["pink-500", "#ec4899"],
      ["red-600", "#dc2626"],
    ],
  },
];

const TYPE: [string, string, string][] = [
  ["text-display", "Display", "Turn PDFs into interactive digital experiences."],
  ["text-h1", "H1", "Professional publishing without enterprise pricing."],
  ["text-h2", "H2", "Everything from first draft to results."],
  ["text-h3", "H3", "Built for publishers who sell pages"],
  ["text-body-lg", "Body lg 17", "Create beautiful flipbooks, catalogs and brochures that people can actually engage with."],
  ["text-body", "Body 15", "Create beautiful flipbooks, catalogs and brochures that people can actually engage with."],
  ["text-sm", "Small 14", "Buttons, nav links and inputs."],
  ["text-small", "Label 12.5", "Labels and small print."],
  ["text-caption", "Caption 11.5", "Menu item descriptions."],
];

const RADII = [
  ["rounded-sm", "6"],
  ["rounded-md", "8"],
  ["rounded-lg", "10"],
  ["rounded-full", "full"],
];

const SHADOWS = ["shadow-tile", "shadow-card-hover", "shadow-float", "shadow-dropdown", "shadow-cover", "shadow-form", "shadow-toast", "shadow-modal"];

const TILE_TONES: TileTone[] = ["sky", "sky-soft", "white", "navy", "active", "violet", "amber", "mint", "pink", "teal", "gray"];

const TOC: [string, string][] = [
  ["ds-colour", "Colour"],
  ["ds-type", "Typography"],
  ["ds-buttons", "Buttons"],
  ["ds-forms", "Forms & selection"],
  ["ds-display", "Display"],
  ["ds-navigation", "Navigation & overlays"],
  ["ds-charts", "Charts"],
  ["ds-sections", "Sections & banners"],
  ["ds-cards", "Cards"],
  ["ds-mockups", "Mockups & scenes"],
  ["ds-icons", "Icons"],
  ["ds-shape", "Radius & elevation"],
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-20 border-t border-gray-200 py-14">
      <h2 id={id} className="m-0 mb-6 text-h2 text-navy-800">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <Container className="pb-24 pt-16">
      <Eyebrow>Internal · not indexed</Eyebrow>
      <h1 className="mb-3 mt-2 text-h1 text-navy-800">FlipAndShare design system</h1>
      <p className="m-0 max-w-[680px] text-body-lg text-gray-600">
        Tokens and shared components, rendered from the code. Documentation lives in <code>docs/design-system.md</code>.
      </p>
      <nav aria-label="Design system sections" className="mt-6 flex flex-wrap gap-2">
        {TOC.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-label font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          >
            {label}
          </a>
        ))}
      </nav>

      <Section id="ds-colour" title="Colour">
        <div className="flex flex-col gap-8">
          {SWATCHES.map((g) => (
            <div key={g.group}>
              <Eyebrow as="h3" className="mb-3">
                {g.group}
              </Eyebrow>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3 p-0">
                {g.tokens.map(([name, hex]) => (
                  <li key={name} className="overflow-hidden rounded-lg border border-gray-200">
                    <span className="block h-14" style={{ background: hex }} />
                    <span className="flex flex-col px-3 py-2">
                      <span className="text-small font-semibold text-gray-900">{name}</span>
                      <span className="font-mono text-xs text-gray-500">{hex}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="ds-type" title="Typography">
        <div className="flex flex-col gap-5">
          {TYPE.map(([cls, label, sample]) => (
            <div key={cls} className="grid grid-cols-[140px_minmax(0,1fr)] items-baseline gap-6 max-sm:grid-cols-1 max-sm:gap-1">
              <span className="font-mono text-xs text-gray-500">
                {label}
                <br />
                {cls}
              </span>
              <span className={`${cls} ${cls.startsWith("text-h") || cls === "text-display" ? "text-navy-800" : "text-gray-900"}`}>
                {sample}
              </span>
            </div>
          ))}
          <div className="grid grid-cols-[140px_minmax(0,1fr)] items-baseline gap-6 max-sm:grid-cols-1 max-sm:gap-1">
            <span className="font-mono text-xs text-gray-500">Eyebrow</span>
            <span className="flex flex-wrap gap-6">
              <Eyebrow>Light eyebrow</Eyebrow>
              <span className="rounded-sm bg-ink-950 px-2 py-1">
                <Eyebrow tone="dark">Dark eyebrow</Eyebrow>
              </span>
              <span className="rounded-sm bg-ink-950 px-2 py-1">
                <Eyebrow tone="amber">Amber eyebrow</Eyebrow>
              </span>
            </span>
          </div>
        </div>
      </Section>

      <Section id="ds-buttons" title="Buttons">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="navy">Navy</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="light">Light</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="violet" iconRight="arrow" glow>
              Talk to Sales
            </Button>
            <Button variant="amber">Save my seat</Button>
            <Button variant="success">See analytics</Button>
            <Button variant="text">Copy key</Button>
            <Button variant="danger">Remove</Button>
            <Button variant="link" iconLeft="arrow" href="/pricing">
              Pricing
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-ink-950 p-5">
            <Button variant="onDark">Watch the demo</Button>
            <Button variant="white">Change plan</Button>
            <Button glow size="xl">
              Create for Free
            </Button>
            <IconButton icon="prev" label="Previous page" tone="dark" size={44} />
            <IconButton icon="next" label="Next page" tone="dark" size={44} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
            <Button shape="pill" size="lg" variant="navy">
              Pill
            </Button>
            <Button disabled>Disabled</Button>
            <Button loading>Saving</Button>
            <IconButton icon="prev" label="Previous spread" />
            <IconButton icon="next" label="Next spread" />
            <IconButton icon="close" label="Close" tone="plain" size={32} />
          </div>
        </div>
      </Section>

      <Section id="ds-forms" title="Forms and selection">
        <FormsDemo />
      </Section>
      <div id="ds-display" className="scroll-mt-20 border-t border-gray-200 py-14">
        <DisplayDemo />
      </div>
      <div id="ds-navigation" className="scroll-mt-20 border-t border-gray-200 py-14">
        <NavigationDemo />
      </div>
      <div id="ds-charts" className="scroll-mt-20 border-t border-gray-200 py-14">
        <ChartsDemo />
      </div>
      <Section id="ds-sections" title="Sections, heroes and banners">
        <SectionsDemo />
      </Section>
      <div id="ds-cards" className="scroll-mt-20 border-t border-gray-200 py-14">
        <CardsDemo />
      </div>
      <div id="ds-mockups" className="scroll-mt-20 border-t border-gray-200 py-14">
        <MockupsDemo />
      </div>

      <Section id="ds-icons" title="Icons and tiles">
        <div className="mb-6 flex flex-wrap gap-3">
          {TILE_TONES.map((t) => (
            <span key={t} className="flex flex-col items-center gap-1.5">
              <IconTile name="sparkles" tone={t} size={48} />
              <span className="font-mono text-xs text-gray-500">{t}</span>
            </span>
          ))}
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2 p-0">
          {(Object.keys(ICON_PATHS) as IconName[]).map((n) => (
            <li key={n} className="flex flex-col items-center gap-1.5 rounded-md border border-gray-200 px-2 py-3 text-navy-800">
              <Icon name={n} />
              <span className="font-mono text-2xs text-gray-500">{n}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="ds-shape" title="Radius and elevation">
        <div className="mb-8 flex flex-wrap gap-4">
          {RADII.map(([cls, px]) => (
            <span key={cls} className="flex flex-col items-center gap-1.5">
              <span className={`block h-16 w-16 border border-blue-200 bg-blue-100 ${cls}`} />
              <span className="font-mono text-xs text-gray-500">
                {cls} · {px}
              </span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 rounded-lg bg-slate-50 p-6">
          {SHADOWS.map((s) => (
            <span key={s} className={`flex h-20 items-end rounded-lg bg-white p-3 font-mono text-xs text-gray-500 ${s}`}>
              {s}
            </span>
          ))}
        </div>
      </Section>
    </Container>
  );
}
