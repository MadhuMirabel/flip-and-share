import Link from "next/link";
import { FaqSection } from "@/components/ui/Accordion";

const FAQS = [
  {
    question: "How long does it take to publish an issue?",
    answer:
      "Upload a PDF and the flipbook is ready in about a minute. Adding links, video and forms takes as long as you want to spend. Most publishers ship their first issue in ten minutes and their second in five.",
  },
  {
    question: "Will my current links and URLs still work?",
    answer:
      "Yes. You can keep your own domain, redirect old issue links, and every new issue gets a readable URL you choose. Nothing you have already shared breaks.",
  },
  {
    question: "How is this different from Issuu, FlippingBook or Publuu?",
    answer:
      "They stop at the flipbook. FlipAndShare adds the publishing business around it: ad placement suggestions, a no-login artwork portal for advertisers, trackable QR codes for print, and per-advertiser click reports you can send with the invoice.",
  },
  {
    question: "Do I need a designer or a developer?",
    answer:
      "No. Upload the PDF you already have. The editor is drag and drop, templates cover common layouts, and AI drafts tags, summaries and alt text. Enterprise teams can use the API, but nobody has to.",
  },
  {
    question: "Who owns the content and the reader data?",
    answer:
      "You do. Export your PDFs, analytics and leads at any time. Reader analytics can run cookieless, and we handle GDPR and CCPA requests on your behalf.",
  },
  {
    question: "What does the free plan include, and what happens after?",
    answer:
      "One publication free for the first month, with article mode, SEO and analytics included. After that, keep it live on Starter or let it lapse. Your file and stats stay in your account either way.",
  },
];

/** Homepage FAQ: sticky intro + divided accordion (first question open, as in the prototype). */
export function HomeFaq() {
  return (
    <div className="box-border border-t border-gray-200 bg-white px-8 py-20 max-sm:px-5">
      <div className="mx-auto max-w-page">
        <FaqSection
          layout="home"
          eyebrow="BEFORE YOU UPLOAD"
          title="The questions publishers ask first."
          intro={<p>Anything else, ask us. A person answers within one business day.</p>}
          actions={
            <Link href="/enterprise" className="text-sm font-semibold">
              Talk to the publishing team →
            </Link>
          }
          items={FAQS.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }))}
          defaultOpen={0}
        />
      </div>
    </div>
  );
}
