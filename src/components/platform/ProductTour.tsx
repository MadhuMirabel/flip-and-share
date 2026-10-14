import { TourScene } from "@/components/platform/TourScenes";
import { CheckList } from "@/components/ui/CheckList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const TOUR = [
  {
    n: "01",
    name: "Create",
    headline: "Start from a PDF, a template, or a blank flat plan.",
    items: [
      "Drag-and-drop flat-plan editor with real text extraction",
      "A library of ready-made templates by publication type",
      "Import an existing PDF, PowerPoint or Word file in seconds",
    ],
  },
  {
    n: "02",
    name: "Enhance",
    headline: "Turn static pages into something readers act on.",
    items: [
      "Video, audio and links on any page",
      "Lead-capture forms and product tags",
      "GIFs and animated hotspots for attention",
    ],
  },
  {
    n: "03",
    name: "Publish",
    headline: "A readable page on the web, not just a file.",
    items: [
      "Human-readable URL, embed code and QR code",
      "A digital bookshelf that lists every publication",
      "Custom domain so it looks like your own site",
    ],
  },
  {
    n: "04",
    name: "Control",
    headline: "Decide exactly who can read it.",
    items: [
      "Private publications and password protection",
      "Domain-restricted access for internal documents",
      "Single sign-on and role-based permissions for teams",
    ],
  },
  {
    n: "05",
    name: "Measure",
    headline: "See what happens after you hit publish.",
    items: [
      "Readers, time on page and page-level statistics",
      "Click tracking and reader heatmaps",
      "Google Analytics / GTM for your existing stack",
    ],
  },
  {
    n: "06",
    name: "Scale",
    headline: "Grow past one person publishing one file.",
    items: [
      "Team workspaces and shared collaboration",
      "Catalog automation and product feed imports",
      "An API to connect your own systems",
    ],
  },
];

/** Six alternating text + animated-scene rows (prototype L2145–2158). Text and scene swap sides on even rows. */
export function ProductTour() {
  return (
    <section aria-label="How it works, step by step" className="mx-auto flex max-w-[1100px] flex-col gap-[88px] px-8 py-[72px] max-sm:px-5 max-sm:gap-16">
      {TOUR.map((g, i) => (
        <Reveal
          key={g.n}
          distance={24}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-12"
        >
          <div className={`flex flex-col gap-3.5 ${i % 2 ? "order-2 max-[700px]:order-1" : ""}`}>
            <Eyebrow>
              {g.n} · {g.name}
            </Eyebrow>
            <h2 className="m-0 text-[28px] font-bold leading-[1.15] tracking-[-.02em] text-navy-800">{g.headline}</h2>
            <CheckList items={g.items} size="md" />
          </div>
          <div className={i % 2 ? "order-1 max-[700px]:order-2" : ""}>
            <TourScene index={i} />
          </div>
        </Reveal>
      ))}
    </section>
  );
}
