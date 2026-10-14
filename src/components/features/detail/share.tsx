import type { FeatureDetail } from "./FeatureDetailPage";
import { DevicesScene, ExpireScene, LinkShareScene, ShareHeroDemo } from "./scenes";

/** Fullscreen sharing (prototype `FEAT.share` L3362 + `FEAT_X.share` L3287). */
export const SHARE_DETAIL: FeatureDetail = {
  label: "FULLSCREEN SHARING",
  title: "One link. Every screen.",
  lead: "Share a distraction-free reader by link, QR or email. It opens instantly on phones, tablets and desktops with no app to install.",
  plan: "Included on every plan",
  demo: <ShareHeroDemo />,
  stats: [
    { value: "<2s", label: "to first page on 4G", icon: "trend" },
    { value: "0", label: "apps to install", icon: "x" },
    { value: "100%", label: "of opens counted", icon: "check" },
  ],
  blocks: [
    {
      tag: "OPEN ANYWHERE",
      title: "One link works on every device.",
      description:
        "The reader adapts to the screen: page-flip spreads on desktop, single pages with swipe on phones. No app, no plugin, no download.",
      points: ["Responsive reader with pinch-zoom", "Deep link to any page (…/october#p12)", "Loads the first pages before the rest"],
      scene: <DevicesScene />,
    },
    {
      tag: "SHARE KIT",
      title: "Copy once, share everywhere.",
      description:
        "Every issue gets a short branded link, a QR code, an email snippet and a social card, generated the moment you publish.",
      points: ["Branded short link on Professional", "Print-ready QR in SVG and PNG", "Email block for Mailchimp and Marketing Manager"],
      scene: <LinkShareScene />,
    },
    {
      tag: "LINK CONTROLS",
      title: "Links you can change your mind about.",
      description: "Set an expiry date, restrict to a domain, or turn downloads off. Every share and open lands in the audit log.",
      points: ["Expiry dates and domain restriction", "Turn a link off without unpublishing", "Who shared and who opened, with timestamps"],
      scene: <ExpireScene />,
    },
  ],
  howTitle: "From upload to shared in three steps.",
  steps: [
    { title: "Upload your PDF", description: "Drop the file in. Pages convert in under a minute.", time: "1 min" },
    { title: "Copy the link or QR", description: "From the Publish screen, one click.", time: "10 sec" },
    { title: "Paste it anywhere", description: "Email, social, print. Every open is counted.", time: "Ongoing" },
  ],
  without: {
    icon: "mail",
    heading: "Sending PDFs",
    points: ["Attach a 40 MB PDF to an email", "Readers download, then never open it again", "No idea who read what"],
  },
  withFas: {
    icon: "send",
    heading: "Sending a reader",
    points: ["One short link that opens in the browser", "Readers land on the page you chose", "Opens, pages and time on page per reader"],
  },
  short: "sharing",
  faqs: [
    { question: "Do readers need an account?", answer: "No. Public links open instantly. Only paywalled or subscriber-only issues ask readers to sign in." },
    { question: "Can I change the link later?", answer: "Yes. Set a custom slug any time. The old link redirects to the new one." },
    {
      question: "Does the link work offline?",
      answer: "Readers who install the mobile app can save issues for offline reading. Browser links need a connection.",
    },
  ],
  related: [
    { title: "Embed", icon: "layout", href: "/features/embed" },
    { title: "Social posts", icon: "megaphone", href: "/features/social" },
    { title: "Access control", icon: "lock", href: "/features/access" },
    { title: "Article mode and SEO", icon: "text", href: "/features/seo" },
  ],
  art: "share",
};
