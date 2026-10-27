import { ArticleScene, FormScene, TogglesScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Schools & universities (prototype `USE.education`, L3342). */
export const EDUCATION_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "education",
  short: "schools and universities",
  title: "Prospectuses and alumni magazines that people finish reading.",
  lead: "Publish the viewbook, course guide and alumni magazine as readable, searchable editions. Track which programs get read, capture enquiries on the page, and keep private material private.",
  proof: ["Enquiry form on any page", "Article mode for screen readers", "Restrict by email domain"],
  heroScene: <FormScene />,
  stats: [
    { value: "3×", label: "longer read time than the PDF download", icon: "chart" },
    { value: "1 form", label: "turns a reader into an enquiry", icon: "form" },
    { value: "WCAG", label: "article mode with real text and alt text", icon: "eye" },
  ],
  painTitle: "The viewbook is a 40 MB download nobody opens twice.",
  pain: "Admissions sends a PDF, marketing posts a link, and the only metric is downloads. Accessibility reviews flag the PDF, and prospective students never find a way to ask a question from the page they are reading.",
  blocks: [
    {
      tag: "ENQUIRIES",
      title: "Ask from the page they are on.",
      description: "Place an enquiry form beside the program. Submissions land in your CRM with the page they came from.",
      points: ["Lead forms with custom fields", "Page-level attribution", "HubSpot, Salesforce and email delivery"],
      scene: <FormScene />,
      link: { label: "See Lead forms", href: "/features/forms" },
    },
    {
      tag: "ACCESSIBILITY",
      title: "Readable by everyone, and by Google.",
      description:
        "Article mode gives every page real text, headings and alt text. Screen readers and search engines read it the same way.",
      points: ["Text size and dark mode", "Auto alt text you can edit", "Indexable URL per issue"],
      scene: <ArticleScene />,
      link: { label: "See Article mode", href: "/features/seo" },
    },
    {
      tag: "CONTROL",
      title: "Some issues are for students only.",
      description: "Restrict an edition to your email domain or SSO, expire it at term end, and see who read it.",
      points: ["Email domain and SSO access", "Expiry dates", "Read receipts per reader"],
      scene: <TogglesScene />,
      link: { label: "See Access control", href: "/features/access" },
    },
  ],
  example: {
    cover: COVERS[7],
    title: "Irondale Community Guide · 2026–2027",
    description: "Annual guide, 64 pages, enquiry forms on program pages and an accessible reading mode.",
  },
  quote: {
    text: "Our accessibility office signed off on the viewbook for the first time, and admissions can see which programs drive enquiries.",
    who: "Marketing lead, community college (illustrative)",
  },
  howTitle: "Publish the guide, capture the enquiry.",
  steps: [
    { title: "Upload", description: "Drop the prospectus PDF or start from a template.", time: "2 min" },
    { title: "Add forms", description: "Put an enquiry form on program pages and a video on the campus tour.", time: "15 min" },
    { title: "Share", description: "Send one link, embed it on the site, print the QR on the mailer.", time: "Same day" },
  ],
  faqs: [
    {
      question: "Is article mode accessible?",
      answer: "It renders real HTML text with headings, alt text and keyboard navigation, which is what accessibility reviews look for.",
    },
    { question: "Can we restrict to students?", answer: "Yes, by email domain, password or your SSO on the Business plan." },
    { question: "Do we need a designer?", answer: "No. Upload the PDF you already have. Templates help if you start from scratch." },
  ],
  ctaTitle: "Upload this year's guide.",
  ctaSubtitle: "See it readable, searchable and measurable in ten minutes.",
  art: "form",
};
