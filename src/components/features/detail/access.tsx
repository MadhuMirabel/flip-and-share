import type { FeatureDetail } from "./FeatureDetailPage";
import { ExpireScene, GateHeroDemo, PaywallScene, TogglesScene } from "./scenes";

/** Access control (prototype `FEAT.access` L3365 + `FEAT_X.access` L3291). */
export const ACCESS_DETAIL: FeatureDetail = {
  label: "ACCESS CONTROL",
  title: "Decide who reads what.",
  lead: "Public, unlisted, password-protected or subscribers only. Set a preview limit, allow or block downloads, and expire links on a date.",
  plan: "From Professional",
  demo: <GateHeroDemo />,
  stats: [
    { value: "4", label: "visibility modes", icon: "trend" },
    { value: "SSO", label: "on Business", icon: "target" },
    { value: "100%", label: "of access changes logged", icon: "check" },
  ],
  blocks: [
    {
      tag: "VISIBILITY",
      title: "Public, unlisted, password or members.",
      description: "Choose per issue or per title. Change it any time without a new link.",
      points: ["Public in your library and search", "Unlisted: only people with the link", "Password or members only"],
      scene: <TogglesScene />,
    },
    {
      tag: "PAYWALL AND MEMBERS",
      title: "Preview free, then sign in.",
      description:
        "Let readers see the first pages, then ask them to subscribe or sign in. Members from your SSO or list pass straight through.",
      points: ["Preview limit per issue", "SSO, password or domain rules", "Subscriber list sync"],
      scene: <PaywallScene />,
    },
    {
      tag: "EXPIRY AND AUDIT",
      title: "Links that end, and a record of who did what.",
      description: "Expire links on a date, restrict downloads, and see every setting change and share in the audit log.",
      points: ["Expiry dates", "Download on or off", "Audit log with who and when"],
      scene: <ExpireScene />,
    },
  ],
  howTitle: "Set it per issue or per title.",
  steps: [
    { title: "Open Publish settings", description: "Visibility lives next to the share link.", time: "10 sec" },
    { title: "Choose who can read", description: "Public, unlisted, password or members. Set a preview limit.", time: "30 sec" },
    { title: "Share", description: "Access is enforced on every device and embed.", time: "Ongoing" },
  ],
  without: {
    icon: "globe",
    heading: "One setting for everyone",
    points: ["Public or nothing", "PDF forwarded to anyone", "No idea who has access"],
  },
  withFas: {
    icon: "lock",
    heading: "Access that fits the issue",
    points: ["Four modes, per issue", "Downloads off, links expire", "Every change and share logged"],
  },
  short: "access control",
  faqs: [
    { question: "Can members use my existing logins?", answer: "Yes, on Business: SAML and OIDC SSO, or sync a subscriber list." },
    { question: "Does a password protect the embed?", answer: "Yes. The embed asks for the password too." },
    { question: "Can I revoke a link?", answer: "Yes. Turn the link off or set an expiry. The issue stays published for others." },
  ],
  related: [
    { title: "Lead forms", icon: "form", href: "/features/forms" },
    { title: "Digital sales", icon: "tag", href: "/features/sales" },
    { title: "Fullscreen sharing", icon: "globe", href: "/features/share" },
    { title: "Collaboration", icon: "users", href: "/platform/collaboration" },
  ],
  art: "lock",
};
