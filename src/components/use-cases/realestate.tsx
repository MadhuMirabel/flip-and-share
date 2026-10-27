import { FormScene, SearchScene, VideoScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Real estate & property (prototype `USE.realestate`, L3344). */
export const REALESTATE_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "realestate",
  short: "real estate teams",
  title: "Listings that show the video and take the enquiry.",
  lead: "Turn the property brochure and listings magazine into pages with walkthrough video, floor-plan pop-ups and an enquiry form on every home. See which listings get read and who asked.",
  proof: ["Video walkthroughs in the page", "Enquiry per listing", "Agent branding per edition"],
  heroScene: <VideoScene />,
  stats: [
    { value: "2.4×", label: "enquiries versus the static PDF", icon: "chart" },
    { value: "Per listing", label: "reads, video plays, enquiries", icon: "eye" },
    { value: "Print QR", label: "from the yard sign to the page", icon: "search" },
  ],
  painTitle: "The brochure is beautiful and the buyer has to leave it to do anything.",
  pain: "Buyers see a home, then search for it somewhere else. The video sits on a separate page. The enquiry form is on the website, not next to the listing. And you never know which property drove the call.",
  blocks: [
    {
      tag: "LISTINGS",
      title: "Video where the buyer is looking.",
      description: "Drop a walkthrough video, a floor-plan pop-up and a map link on the listing page itself.",
      points: ["Video, audio and pop-ups in the page", "Auto-detected links and phone numbers", "Floor-plan and gallery pop-ups"],
      scene: <VideoScene />,
      link: { label: "See Links, video & hotspots", href: "/features/links" },
    },
    {
      tag: "ENQUIRIES",
      title: "Ask about this home.",
      description: "An enquiry form on every listing, delivered to the agent with the property attached.",
      points: ["Form per listing", "Delivered to the right agent", "Attribution per page"],
      scene: <FormScene />,
      link: { label: "See Lead forms", href: "/features/forms" },
    },
    {
      tag: "PRINT",
      title: "From the yard sign to the page.",
      description: "Print a QR on the sign, the flyer and the magazine. Each channel tracks separately.",
      points: ["Print vs Digital scan counts", "Change the destination without reprinting", "Scans by listing"],
      scene: <SearchScene />,
      link: { label: "See QR Codes", href: "/platform/qr" },
    },
  ],
  example: {
    cover: COVERS[9],
    title: "Merritt Island Select · September 2026",
    description: "Coastal listings magazine, 48 pages, walkthrough videos and enquiry forms on every property.",
  },
  quote: {
    text: "Every listing now has its video and an Ask form. We know which homes drive the calls.",
    who: "Marketing manager, regional brokerage (illustrative)",
  },
  howTitle: "From brochure to booked viewing.",
  steps: [
    { title: "Upload", description: "Drop the listings PDF from InDesign or Canva.", time: "2 min" },
    { title: "Add video & forms", description: "Auto-detect finds the links; add video and the enquiry form per listing.", time: "20 min" },
    { title: "Print the QR", description: "Share the link and print the tracked QR on signs and flyers.", time: "Same day" },
  ],
  faqs: [
    {
      question: "Can each agent have their own edition?",
      answer: "Yes. Branded editions per agent or office, with their own domain on Professional.",
    },
    { question: "Where do enquiries go?", answer: "To the agent by email, to your CRM through HubSpot, Salesforce or the API." },
    {
      question: "Does video slow the page?",
      answer: "Video streams from YouTube, Vimeo or our player and only loads when the page is opened.",
    },
  ],
  ctaTitle: "Upload this month's listings.",
  ctaSubtitle: "See a listing with video and an enquiry form in ten minutes.",
  art: "play",
};
