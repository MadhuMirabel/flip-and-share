import { EmbedScene, FormScene, VideoScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Design & architecture (prototype `USE.design`, L3349). */
export const DESIGN_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "design",
  short: "design studios",
  title: "Portfolios and lookbooks that stay exactly on brand.",
  lead: "Publish from InDesign or Canva to a fullscreen reader with your typography intact. No platform branding, your domain, and a lead form for the client who wants to talk.",
  proof: ["Fullscreen, no chrome", "Your domain, no branding", "Enquiry from the portfolio"],
  heroScene: <EmbedScene />,
  stats: [
    { value: "0", label: "platform branding on Starter and up", icon: "x" },
    { value: "Fullscreen", label: "reader with your typography", icon: "eye" },
    { value: "1 form", label: "from portfolio to enquiry", icon: "form" },
  ],
  painTitle: "The portfolio PDF is 200 MB and the platform logo is on your work.",
  pain: "Studios care about the frame around the work. Generic flipbook tools add their logo, compress the images, and put your portfolio on their domain. Clients download the PDF and never come back.",
  blocks: [
    {
      tag: "PRESENT",
      title: "Fullscreen, your brand only.",
      description:
        "Publish to a clean reader on your domain. Remove all platform branding, set your colours, keep the typography from InDesign.",
      points: ["InDesign and Canva export", "Custom domain and colours", "High-resolution page rendering"],
      scene: <EmbedScene />,
      link: { label: "See Embed", href: "/features/embed" },
    },
    {
      tag: "SHOW",
      title: "Video and process in the page.",
      description: "Project films, before-and-after pop-ups and links to the live site sit on the project page.",
      points: ["Video and pop-ups", "Before/after image swaps", "Links to live work"],
      scene: <VideoScene />,
      link: { label: "See Links, video & hotspots", href: "/features/links" },
    },
    {
      tag: "CONVERT",
      title: "The client who wants to talk.",
      description: "A contact form on the last spread, or a private edition for a pitch with read receipts.",
      points: ["Contact form", "Private pitch editions", "Read receipts"],
      scene: <FormScene />,
      link: { label: "See Lead forms", href: "/features/forms" },
    },
  ],
  example: {
    cover: COVERS[8],
    title: "Studio portfolio · 2026",
    description: "Fullscreen portfolio embedded on the studio website, with project videos and a contact form on the last spread.",
  },
  quote: {
    text: "Our portfolio finally looks like our work. Clients read it fullscreen and reach out from the last page.",
    who: "Principal, architecture studio (illustrative)",
  },
  howTitle: "From InDesign to a live portfolio.",
  steps: [
    { title: "Export", description: "Export the PDF from InDesign or Canva.", time: "5 min" },
    { title: "Upload", description: "Drop it, remove branding, set your domain.", time: "2 min" },
    { title: "Embed", description: "Paste the embed on your site or send a private link.", time: "Same day" },
  ],
  faqs: [
    { question: "Will the images stay sharp?", answer: "Pages render at high resolution and load progressively, so large spreads stay crisp." },
    { question: "Can we remove all FlipAndShare branding?", answer: "Yes, from the Starter plan up. Custom domain on Professional." },
    {
      question: "Can we send a private pitch edition?",
      answer: "Yes. Password or email-restricted, with read receipts and an expiry date.",
    },
  ],
  ctaTitle: "Upload your portfolio.",
  ctaSubtitle: "See it fullscreen with your typography in two minutes.",
  art: "embed",
};
