import { DevicesScene, HotspotsScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Travel & hospitality (prototype `USE.travel`, L3346). */
export const TRAVEL_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "travel",
  short: "travel and hospitality brands",
  title: "Destination guides that book the room.",
  lead: "Publish the visitor guide, hotel brochure and in-room magazine as pages with video, maps and a Book now button. Track which destinations get read and which pages drive bookings.",
  proof: ["Book now on any page", "Maps and video in the page", "Offline reading in the app"],
  heroScene: <DevicesScene />,
  stats: [
    { value: "+27%", label: "click-through to booking pages", icon: "chart" },
    { value: "Offline", label: "reading on the plane", icon: "book" },
    { value: "Per page", label: "reads by destination", icon: "eye" },
  ],
  painTitle: "The guide is printed once a year and the booking link is somewhere else.",
  pain: "Visitor guides and hotel brochures are read on phones in airports and lobbies. The PDF is slow, the links are dead, and nobody knows which destination page drove a booking.",
  blocks: [
    {
      tag: "BOOK",
      title: "From the page to the reservation.",
      description: "Book now, call and map hotspots on every listing. Attribution shows which page drove the click.",
      points: ["Auto-detected links and phone numbers", "Book and map hotspots", "Attribution per page"],
      scene: <HotspotsScene />,
      link: { label: "See Links, video & hotspots", href: "/features/links" },
    },
    {
      tag: "MOBILE",
      title: "Reads on the plane, syncs on landing.",
      description: "The reader app saves editions for offline reading and syncs analytics when the reader reconnects.",
      points: ["Offline editions", "Push for the new issue", "Reader app with your brand"],
      scene: <DevicesScene />,
      link: { label: "See Mobile app", href: "/platform/mobile" },
    },
    {
      tag: "SPONSORS",
      title: "Show partners the traffic.",
      description: "Hotels, restaurants and tours that buy pages get a click report per placement.",
      points: ["Sponsor click history", "QR scans from the printed guide", "Report link per sponsor"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[11],
    title: "Texas Saltwater Fishing · December 2023",
    description: "Destination and lifestyle title with guide listings, sponsor pages and video.",
  },
  quote: {
    text: "Our visitor guide finally works on a phone in the airport, and partners see their clicks.",
    who: "Tourism board content lead (illustrative)",
  },
  howTitle: "From guide PDF to booking.",
  steps: [
    { title: "Upload", description: "Drop the guide or brochure PDF.", time: "2 min" },
    { title: "Add hotspots", description: "Book, call and map on each listing; video on the hero pages.", time: "20 min" },
    { title: "Publish", description: "Share, embed, print the QR in the lobby.", time: "Same day" },
  ],
  faqs: [
    { question: "Does the reader app work offline?", answer: "Yes. Saved editions open without a connection and analytics sync later." },
    { question: "Can partners see their own numbers?", answer: "Each sponsor gets a report link with their placements only." },
    { question: "Can we update the guide mid-season?", answer: "Yes. Edit pages and hotspots; the link stays the same." },
  ],
  ctaTitle: "Upload this season's guide.",
  ctaSubtitle: "Add one Book now button and see it tracked.",
  art: "mobile",
};
