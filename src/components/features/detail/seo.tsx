import type { FeatureDetail } from "./FeatureDetailPage";
import { ArticleScene, DevicesScene, SearchScene, SeoHeroDemo } from "./scenes";

/** Article mode and SEO (prototype `FEAT.seo` L3368 + `FEAT_X.seo` L3294). */
export const SEO_DETAIL: FeatureDetail = {
  label: "ARTICLE MODE & SEO",
  title: "Found in Google. Readable on any phone.",
  lead: "Every page also exists as real text with headings and alt text, so search engines and AI assistants can index it and screen readers can read it.",
  plan: "Included on every plan",
  demo: <SeoHeroDemo />,
  stats: [
    { value: "100%", label: "of pages as real text", icon: "text" },
    { value: "Days", label: "to first Google index", icon: "search" },
    { value: "AA", label: "WCAG 2.1 contrast and keyboard", icon: "check" },
  ],
  blocks: [
    {
      tag: "REAL TEXT",
      title: "Every page, as text.",
      description:
        "Article mode extracts headings, paragraphs and images with alt text from the PDF. Readers can resize, switch to dark mode and select text.",
      points: ["Headings and paragraphs, not a picture", "Text size and dark mode", "AI alt text you can edit"],
      scene: <ArticleScene />,
    },
    {
      tag: "SEARCH AND AI",
      title: "Found by Google and quoted by assistants.",
      description: "Each page gets its own URL, title and description. A sitemap is submitted for you. AI assistants can cite the page.",
      points: ["Per-page URLs and metadata", "Sitemap and structured data", "Back issues indexed too"],
      scene: <SearchScene />,
    },
    {
      tag: "ACCESSIBLE",
      title: "Readable by everyone.",
      description: "Keyboard navigation, screen-reader landmarks, contrast and captions. Meets WCAG 2.1 AA out of the box.",
      points: ["Screen-reader outline", "Keyboard and focus order", "Captions for video"],
      scene: <DevicesScene />,
    },
  ],
  howTitle: "Switch it on once.",
  steps: [
    { title: "Upload the PDF", description: "Text and images are extracted automatically.", time: "1 min" },
    { title: "Review article text and alt text", description: "Edit anything the AI got wrong.", time: "5 min" },
    { title: "Publish", description: "Pages are indexed within days.", time: "Automatic" },
  ],
  without: {
    icon: "eye",
    heading: "Image-only flipbooks",
    points: ["Pages are images. Google sees nothing", "Unreadable on a phone without zooming", 'Screen readers announce "image"'],
  },
  withFas: {
    icon: "search",
    heading: "Article mode",
    points: ["Every page indexed as text", "Reflows to any screen", "Headings, alt text and landmarks"],
  },
  short: "article mode",
  faqs: [
    { question: "Does article mode replace the flipbook?", answer: "No. Readers switch between page view and article view. Both share one URL." },
    { question: "Can I edit the extracted text?", answer: "Yes, per page, including alt text and headings." },
    { question: "Will my back issues be indexed?", answer: "Yes. Turn on article mode for the archive and the sitemap includes them." },
  ],
  related: [
    { title: "Fullscreen sharing", icon: "globe", href: "/features/share" },
    { title: "Embed", icon: "layout", href: "/features/embed" },
    { title: "AI and automation", icon: "sparkles", href: "/platform/ai" },
    { title: "Analytics", icon: "chart", href: "/platform/analytics" },
  ],
  art: "search",
};
