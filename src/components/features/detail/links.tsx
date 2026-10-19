import type { FeatureDetail } from "./FeatureDetailPage";
import { CartScene, HotspotHeroDemo, HotspotsScene, VideoScene } from "./scenes";

/** Links, video and hotspots (prototype `FEAT.links` L3364 + `FEAT_X.links` L3290). */
export const LINKS_DETAIL: FeatureDetail = {
  label: "LINKS, VIDEO & HOTSPOTS",
  title: "Pages that do something when you tap them.",
  lead: "Add web links, page jumps, video, audio, pop-ups and buy buttons anywhere on the page. Auto-detect finds URLs, emails and phone numbers for you.",
  plan: "From Starter",
  demo: <HotspotHeroDemo />,
  stats: [
    { value: "14", label: "links auto-detected per issue (avg)", icon: "trend" },
    { value: "6", label: "hotspot types", icon: "target" },
    { value: "6.8%", label: "average click-through on ad pages", icon: "check" },
  ],
  blocks: [
    {
      tag: "AUTO-DETECT",
      title: "Links found for you.",
      description:
        "URLs, emails and phone numbers in your PDF become tappable automatically. Review, keep or remove them in one pass.",
      points: ["URLs, emails, phone numbers", "Page jumps from the table of contents", "One-click accept all"],
      scene: <HotspotsScene />,
    },
    {
      tag: "VIDEO AND AUDIO",
      title: "Media that plays in the page.",
      description:
        "Upload or paste YouTube and Vimeo. Video plays inline in the spread, with autoplay, loop and mute options. Audio for narrated pages and podcasts.",
      points: ["YouTube, Vimeo, MP4, MP3", "Autoplay on page open, or on tap", "Watch time per video in analytics"],
      scene: <VideoScene />,
    },
    {
      tag: "BUY AND ENQUIRE",
      title: "From the ad to the action.",
      description: "Buy-now buttons, product tags, enquiry pop-ups and click-to-call. Each one is counted for the advertiser.",
      points: ["Buy now, product tag, enquiry, call", "Attributed to advertiser and page", "Shown in the advertiser click report"],
      scene: <CartScene />,
    },
  ],
  howTitle: "Interactive in minutes, not days.",
  steps: [
    { title: "Open the page in the editor", description: "Auto-detected links are already highlighted.", time: "10 sec" },
    { title: "Draw or accept a hotspot", description: "Drag over any area, or accept all.", time: "2 min" },
    { title: "Choose the action", description: "Link, video, pop-up, buy or call.", time: "Per hotspot" },
  ],
  without: {
    icon: "text",
    heading: "Static pages",
    points: ["Ads are pictures. Nothing happens on tap", "Video lives on YouTube, away from the issue", 'Advertisers ask "did anyone click?"'],
  },
  withFas: {
    icon: "play",
    heading: "Interactive pages",
    points: ["Every ad links to the advertiser", "Video plays inside the spread", "Clicks per ad in the report you send"],
  },
  short: "hotspots",
  faqs: [
    { question: "Do hotspots work in print QR flows?", answer: "Yes. A QR opens the page and hotspots work as normal." },
    { question: "Can hotspots be invisible?", answer: "Yes. Choose visible, subtle pulse, or invisible per hotspot." },
    { question: "Are clicks per advertiser?", answer: "Yes. Every hotspot can be assigned to an advertiser for reporting." },
  ],
  related: [
    { title: "Lead forms", icon: "form", href: "/features/forms" },
    { title: "Digital sales", icon: "tag", href: "/features/sales" },
    { title: "Analytics", icon: "chart", href: "/platform/analytics" },
    { title: "QR codes", icon: "qr", href: "/platform/qr" },
  ],
  art: "play",
};
