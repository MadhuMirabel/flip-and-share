import { FormScene, RevenueScene, SearchScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Brochure (prototype `USE.brochure`, L3352). */
export const BROCHURE_DETAIL: UseCaseDetail = {
  group: "content",
  groupLabel: "BY CONTENT TYPE",
  slug: "brochure",
  short: "marketing teams",
  title: "From a downloaded PDF to a lead you can follow up.",
  lead: "Publish the brochure to a readable, indexable URL. Add a form, video and links on the pages that matter. See who read page 6 and who asked for a quote.",
  proof: ["Readable, indexable URL", "Lead form on any page", "Who read what"],
  heroScene: <FormScene />,
  stats: [
    { value: "3×", label: "read time versus the download", icon: "trend" },
    { value: "Per page", label: "reads and time", icon: "chart" },
    { value: "1 form", label: "from reader to lead", icon: "form" },
  ],
  painTitle: "The brochure goes out as an attachment and you know it was opened, at best.",
  pain: "Downloads are the end of the funnel. You never learn which page mattered, who wanted a quote, or whether the prospect ever came back.",
  blocks: [
    {
      tag: "PUBLISH",
      title: "A page, not a file.",
      description: "A readable URL with social previews and article mode. Google indexes it; readers open it on any phone.",
      points: ["Indexable URL", "Social previews", "Article mode"],
      scene: <SearchScene />,
      link: { label: "See Article mode & SEO", href: "/features/seo" },
    },
    {
      tag: "CAPTURE",
      title: "Request a quote from the page.",
      description: "Forms on the pages that matter, delivered to your CRM with the page attached.",
      points: ["Lead forms", "HubSpot and Salesforce", "Page attribution"],
      scene: <FormScene />,
      link: { label: "See Lead forms", href: "/features/forms" },
    },
    {
      tag: "MEASURE",
      title: "Who read page 6.",
      description: "Readers, time per page and form submissions. Gate the sensitive version by email domain.",
      points: ["Per-page analytics", "Email-domain access", "Read receipts"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[5],
    title: "BankBeat · September 2026",
    description: "B2B publication with gated sections, quote-request forms and per-page read analytics.",
  },
  quote: {
    text: "We replaced the PDF attachment with a link and started getting quote requests from the brochure itself.",
    who: "Marketing manager, B2B services firm (illustrative)",
  },
  howTitle: "From brochure to lead.",
  steps: [
    { title: "Upload", description: "Drop the brochure PDF.", time: "2 min" },
    { title: "Add a form", description: "Put Request a quote where the offer is.", time: "10 min" },
    { title: "Share", description: "Send the link; read receipts start.", time: "Same day" },
  ],
  faqs: [
    { question: "Where do leads go?", answer: "Email, HubSpot, Salesforce or the API, with the page they came from." },
    { question: "Can we gate it?", answer: "Yes. Password, email domain or a form before the content." },
    { question: "Is it indexable?", answer: "Yes, with a readable URL, metadata and article mode text." },
  ],
  ctaTitle: "Upload your brochure.",
  ctaSubtitle: "Add one form and see the first lead come back with the page number.",
  art: "form",
};
