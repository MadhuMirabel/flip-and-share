import type { FeatureDetail } from "./FeatureDetailPage";
import { CrmScene, FormScene, GateHeroDemo, RevenueScene } from "./scenes";

/** Lead forms (prototype `FEAT.forms` L3366 + `FEAT_X.forms` L3292). */
export const FORMS_DETAIL: FeatureDetail = {
  label: "LEAD FORMS",
  title: "Turn readers into subscribers and leads.",
  lead: "Place a form on any page or gate the issue after a preview. Submissions go to your CRM or email tool with the issue and page they came from.",
  plan: "From Professional",
  demo: <GateHeroDemo />,
  stats: [
    { value: "15%", label: "average form conversion on gated issues", icon: "trend" },
    { value: "<1 min", label: "lead to CRM", icon: "target" },
    { value: "0", label: "copy-paste", icon: "x" },
  ],
  blocks: [
    {
      tag: "ON-PAGE OR GATED",
      title: "A form where the reader already is.",
      description:
        "Place a form on a page, open it from a hotspot, or gate the issue after a preview. Fields, colours and thank-you message are yours.",
      points: ["Inline, pop-up or gate", "Custom fields and consent text", "Prefill for known subscribers"],
      scene: <FormScene />,
    },
    {
      tag: "STRAIGHT TO YOUR CRM",
      title: "Leads arrive where you work.",
      description:
        "HubSpot, Salesforce, Mailchimp, Marketing Manager or a webhook. Each lead carries the issue, page and advertiser it came from.",
      points: ["Native CRM connections", "Webhook and Zapier for anything else", "Attribution on every record"],
      scene: <CrmScene />,
    },
    {
      tag: "ADVERTISER LEADS",
      title: "Leads for the advertiser, too.",
      description: "Put an enquiry form on an ad page. Submissions route to the advertiser and count in their report.",
      points: ["Per-advertiser routing", "Included in the click report", "Sell it as a digital add-on"],
      scene: <RevenueScene />,
    },
  ],
  howTitle: "Capture, route, follow up.",
  steps: [
    { title: "Drop a form on a page", description: "Or turn on the gate after page 3.", time: "1 min" },
    { title: "Pick fields and destination", description: "CRM, email list or webhook.", time: "1 min" },
    { title: "Publish", description: "Leads arrive in real time, attributed.", time: "Ongoing" },
  ],
  without: {
    icon: "inbox",
    heading: "Leads by accident",
    points: ["A “subscribe” link to another site", "Leads in a spreadsheet nobody checks", "No idea which issue or ad produced them"],
  },
  withFas: {
    icon: "users",
    heading: "Leads by design",
    points: ["Form inside the page", "Leads in your CRM within a minute", "Issue, page and advertiser on every lead"],
  },
  short: "lead forms",
  faqs: [
    { question: "Is the form GDPR-friendly?", answer: "Yes. Consent checkbox, privacy link and data-request handling are built in." },
    { question: "Can advertisers see their leads?", answer: "Yes, through the advertiser report or a read-only link." },
    {
      question: "Can I A/B test the gate page?",
      answer: "You can set different preview limits per issue and compare conversion in analytics.",
    },
  ],
  related: [
    { title: "Access control", icon: "lock", href: "/features/access" },
    { title: "Links, video and hotspots", icon: "link", href: "/features/links" },
    { title: "Integrations", icon: "plug", href: "/integrations" },
    { title: "Analytics", icon: "chart", href: "/platform/analytics" },
  ],
  art: "form",
};
