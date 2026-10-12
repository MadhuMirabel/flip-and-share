"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { UnderlineTabs } from "@/components/ui/Tabs";
import { SubNav, PLATFORM_SUBNAV } from "@/components/ui/SubNav";
import { Stepper } from "@/components/ui/Stepper";
import { Timeline } from "@/components/ui/Timeline";
import { NumberedSteps, StepCardGrid, SolutionSteps } from "@/components/ui/NumberedSteps";
import { Accordion, FaqSection } from "@/components/ui/Accordion";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type DataColumn } from "@/components/ui/DataTable";
import { ComparisonTable, type ComparisonRow } from "@/components/ui/ComparisonTable";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="m-0 text-h3 text-navy-800">{title}</h3>
      {children}
    </div>
  );
}

const FAQS = [
  { question: "Can I upload any PDF?", answer: "Yes. Any PDF up to 500 MB converts into a flipbook in under a minute, fonts and links included." },
  { question: "Do old links keep working when I switch?", answer: "We redirect every old URL to the new edition, so emails, social posts and search results keep working." },
  { question: "Is there a free plan?", answer: "Free covers one publication for the first month with up to 30 pages. Upgrade any time." },
  { question: "Can my team review before we publish?", answer: "Invite editors and advertisers, leave comments on any page and require sign-off before publishing." },
];

type ElementRow = { type: string; name: string; page: string; clicks: number; ctr: string };
const ELEMENTS: ElementRow[] = [
  { type: "Link", name: "Shop the autumn edit", page: "p. 12", clicks: 1840, ctr: "8.2%" },
  { type: "Video", name: "Chef's table: behind the scenes", page: "p. 18", clicks: 1212, ctr: "6.4%" },
  { type: "Buy", name: "Ceramic dinner set", page: "p. 24", clicks: 986, ctr: "5.1%" },
  { type: "Form", name: "Get the fall home guide", page: "p. 31", clicks: 642, ctr: "3.9%" },
];
const ELEMENT_COLS: DataColumn<ElementRow>[] = [
  {
    key: "type",
    header: "Type",
    width: "110px",
    hideBelow: 760,
    render: (r) => <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-navy-700">{r.type}</span>,
  },
  { key: "name", header: "Element", width: "minmax(0,1fr)", mobileWidth: "minmax(0,1.4fr)", className: "text-gray-900", render: (r) => <span className="truncate">{r.name}</span> },
  { key: "page", header: "Page", width: "70px", mobileWidth: "52px", className: "text-gray-500" },
  { key: "clicks", header: "Clicks", width: "80px", mobileWidth: "60px", align: "right", className: "font-semibold text-navy-800 tabular-nums", render: (r) => r.clicks.toLocaleString("en-US") },
  { key: "ctr", header: "CTR", width: "70px", mobileWidth: "52px", align: "right" },
];

type Invoice = { id: string; date: string; desc: string; amount: string; status: "Paid" | "Refunded" };
const INVOICES: Invoice[] = [
  { id: "INV-2026-0912", date: "Sep 12, 2026", desc: "Professional plan · monthly", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-0812", date: "Aug 12, 2026", desc: "Professional plan · monthly", amount: "$49.00", status: "Paid" },
  { id: "INV-2026-0718", date: "Jul 18, 2026", desc: "Extra seat (prorated)", amount: "$12.40", status: "Refunded" },
];
const INVOICE_COLS: DataColumn<Invoice>[] = [
  { key: "id", header: "Invoice", width: "1.1fr", className: "font-semibold text-navy-800 tabular-nums" },
  { key: "date", header: "Date", width: "1fr" },
  { key: "desc", header: "Description", width: "1.8fr" },
  { key: "amount", header: "Amount", width: ".9fr", align: "right", className: "text-gray-900 tabular-nums" },
  {
    key: "status",
    header: "Status",
    width: ".8fr",
    render: (r) => (
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.status === "Paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}
      >
        {r.status}
      </span>
    ),
  },
  { key: "pdf", header: <span className="sr-only">Download</span>, width: "90px", align: "right", render: (r) => <Button variant="text" aria-label={`Download ${r.id} PDF`}>⤓ PDF</Button> },
];

type Ranked = { name: string; type: string; clicks: number; trend: string };
const RANKED: Ranked[] = [
  { name: "Northlight Outdoor · full page", type: "Ad", clicks: 2140, trend: "+18%" },
  { name: "Recipe: smoked squash soup", type: "Link", clicks: 1675, trend: "+9%" },
  { name: "Subscribe for the winter issue", type: "Form", clicks: 1204, trend: "+31%" },
];

const PLAN_ROWS: ComparisonRow[] = [
  { label: "Publications", icon: "book", values: ["1 (first month)", "Unlimited", "Unlimited", "Unlimited"], emphasis: true },
  { label: "Pages per publication", icon: "file", values: ["30", "Unlimited", "Unlimited", "Unlimited"] },
  { label: "Hotspots: links, video, audio", icon: "link", values: ["—", "Yes", "Yes", "Yes"] },
  { label: "Publishing workflow", icon: "layout", section: true },
  { label: "Flat plan with booked ads and Ad Adviser", icon: "layout", values: ["—", "—", "Yes", "Yes"] },
  { label: "Sign-off gates and versions", icon: "check", values: ["—", "—", "—", "Yes"] },
  { label: "Measure and scale", icon: "chart", section: true },
  { label: "Reader analytics and heatmaps", icon: "chart", values: ["Basic", "Basic", "Full", "Full"] },
];

const VENDOR_ROWS: ComparisonRow[] = [
  { label: "PDF to flipbook", icon: "upload", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
  { label: "Reader analytics", icon: "chart", values: ["Advanced", "Advanced", "Advanced", "Medium", "Paid tiers", "Medium"] },
  { label: "Drag-and-drop flat plan with booked ads", icon: "layout", values: ["Yes", "—", "—", "—", "—", "—"] },
  { label: "QR codes: Print vs Digital scan tracking", icon: "qr", values: ["Yes", "Basic", "Basic", "Basic", "Basic", "—"] },
  { label: "Entry price / month", icon: "tag", values: ["Free", "~$14", "$20", "$7", "$5", "~$21"] },
];

const FLOW = [{ label: "Upload" }, { label: "Enhance" }, { label: "Publish" }, { label: "Measure" }];
const WIZARD = [{ label: "Issue details" }, { label: "Validation" }, { label: "Sign-off" }, { label: "Packaging" }, { label: "Complete" }];

export function NavigationDemo() {
  const [tab, setTab] = useState("usage");
  const [flow, setFlow] = useState(1);
  const [wiz, setWiz] = useState(2);
  const [journey, setJourney] = useState(1);
  const [modal, setModal] = useState<"sm" | "md" | "lg" | null>(null);

  return (
    <section aria-labelledby="ds-navigation" className="border-t border-gray-200 py-14">
      <h2 id="ds-navigation" className="m-0 mb-8 text-h2 text-navy-800">
        Navigation, overlays and data display
      </h2>
      <div className="flex flex-col gap-14">
        <Block title="Underline tabs">
          <UnderlineTabs
            label="Account sections"
            value={tab}
            onChange={setTab}
            panelClassName="pt-5 text-body text-gray-600"
            items={[
              { id: "profile", label: "Profile", icon: "user", panel: <p className="m-0">Name, email and company.</p> },
              { id: "usage", label: "Usage & limits", icon: "chart", panel: <p className="m-0">7 of unlimited publications, 1.2 GB of 50 GB storage.</p> },
              { id: "billing", label: "Billing & payment", icon: "card", panel: <p className="m-0">Visa ending 4242, renews Oct 12.</p> },
              { id: "invoices", label: "Invoices", icon: "file", panel: <p className="m-0">Three invoices this year.</p> },
              { id: "notifications", label: "Notifications", icon: "bell", panel: <p className="m-0">Email and in-app preferences.</p> },
            ]}
          />
        </Block>

        <Block title="Platform sub-navigation">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <SubNav sticky={false} items={PLATFORM_SUBNAV} activeHref="/platform/analytics" />
          </div>
        </Block>

        <Block title="Steppers">
          <Eyebrow>pills · click to move</Eyebrow>
          <Stepper variant="pills" steps={FLOW} current={flow} onStepClick={setFlow} label="Publishing flow" />
          <Eyebrow>tabs · md, tinted (Book a demo)</Eyebrow>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Stepper variant="tabs" tinted steps={[{ label: "Your details" }, { label: "Pick a time" }, { label: "Confirmed" }]} current={1} label="Demo booking" />
          </div>
          <Eyebrow>tabs · lg (publish wizard), click to move</Eyebrow>
          <div className="overflow-hidden rounded-lg bg-white shadow-form">
            <Stepper variant="tabs" size="lg" steps={WIZARD} current={wiz} onStepClick={setWiz} label="Publish with gates" />
            <div className="min-h-[80px] p-7 text-body text-gray-600">Panel for “{WIZARD[wiz].label}”.</div>
          </div>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="flex flex-col gap-3">
              <Eyebrow>process (upload checklist)</Eyebrow>
              <Stepper
                variant="process"
                steps={[{ label: "Uploading PDF" }, { label: "Converting pages" }, { label: "Detecting links" }, { label: "Building article mode" }]}
                current={2}
                label="Conversion progress"
              />
            </div>
            <div className="flex flex-col gap-3 rounded-lg bg-ink-950 p-5">
              <Eyebrow tone="dark">dark (reader journey)</Eyebrow>
              <Stepper
                variant="dark"
                current={journey}
                onStepClick={setJourney}
                label="Reader journey"
                steps={[
                  { label: "Reader opens the link", description: "From email, social or a QR code." },
                  { label: "Taps a hotspot", description: "Video, product or web link." },
                  { label: "Leaves their email", description: "Lead form on page 31." },
                ]}
              />
            </div>
          </div>
        </Block>

        <Block title="Timelines">
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1">
            <Timeline
              variant="changelog"
              items={[
                { icon: "layout", tone: "sky", title: "Flat plan snapshots", description: "Name a version and compare any two." },
                { icon: "chart", tone: "violet", title: "Advertiser report PDF", description: "Clicks, CTR and best page per advertiser." },
                { icon: "qr", tone: "teal", title: "Pause a QR code", description: "Change the destination without reprinting." },
              ]}
            />
            <Timeline
              variant="numbered"
              items={[
                { title: "Kick-off call", meta: "Day 1", description: "We list your back issues and old URLs." },
                { title: "Bulk import", meta: "Day 2–4", description: "Every PDF converted, links and covers kept." },
                { title: "Redirects live", meta: "Day 6–7", description: "Old links point to the new editions." },
              ]}
            />
            <Timeline
              variant="years"
              items={[
                { meta: "2004", title: "Magazine Manager", description: "Ad sales software for publishers." },
                { meta: "2016", title: "1,000 publishers", description: "Across 20 countries." },
                { meta: "2026", title: "FlipAndShare", description: "Digital editions built in." },
              ]}
            />
          </div>
        </Block>

        <Block title="Numbered steps">
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            <NumberedSteps
              steps={[
                { title: "A short intro", time: "5 MIN", description: "Your publications and goals." },
                { title: "Live walkthrough", time: "15 MIN", description: "Upload, enhance and publish one of your PDFs." },
                { title: "Analytics tour", time: "5 MIN", description: "What readers and advertisers see." },
                { title: "Questions and next steps", time: "5 MIN", description: "Pricing, migration and onboarding." },
              ]}
            />
            <SolutionSteps
              steps={["Upload last month's PDF.", "Hotspots are detected and tagged automatically.", "Share one link everywhere; it updates each issue."]}
            />
          </div>
          <StepCardGrid
            steps={[
              { title: "Upload your PDF", time: "1 min", text: "Drag in the print file; pages convert in seconds." },
              { title: "Add interactivity", time: "5 min", text: "Links, video and buy buttons on any page." },
              { title: "Share and measure", time: "Ongoing", text: "One link for email, social and print QR codes." },
            ]}
          />
          <StepCardGrid
            size="md"
            reveal={false}
            steps={[
              { title: "Plan the issue", time: "Week 1", text: "Drag booked ads onto the flat plan." },
              { title: "Collect materials", time: "Week 2", text: "Advertisers upload to the portal." },
              { title: "Sign off and publish", time: "Week 3", text: "Two gates, then one click." },
            ]}
          />
        </Block>

        <Block title="Accordion and FAQ section">
          <FaqSection
            eyebrow="Before you upload"
            title="Questions publishers ask first"
            intro={<p>Everything about converting, sharing and measuring your editions.</p>}
            actions={<Button variant="link" iconLeft="arrow" href="/contact">Talk to the publishing team</Button>}
            items={FAQS}
          />
          <FaqSection
            layout="auto"
            eyebrow="FAQ"
            title="Pricing questions"
            intro={<p>Can’t find what you need?</p>}
            contact={
              <span className="flex flex-col gap-1">
                <a href="tel:+18005550123" className="font-semibold text-blue-600">+1 800 555 0123</a>
                <a href="mailto:sales@flipandshare.com" className="font-semibold text-blue-600">sales@flipandshare.com</a>
              </span>
            }
            items={FAQS}
          />
          <div className="max-w-[640px]">
            <Eyebrow>cards · radius lg · multiple</Eyebrow>
            <Accordion variant="cards" size="md" multiple defaultOpen={[0, 2]} items={FAQS.slice(0, 3)} className="mt-3" />
          </div>
        </Block>

        <Block title="Modal">
          <div className="flex flex-wrap gap-2.5">
            <Button variant="neutral" onClick={() => setModal("sm")}>Small (lead form)</Button>
            <Button variant="neutral" onClick={() => setModal("md")}>Medium (flow done)</Button>
            <Button variant="neutral" onClick={() => setModal("lg")}>Large (webinar)</Button>
          </div>
          <Modal open={modal === "sm"} onClose={() => setModal(null)} title="Get the fall home guide" size="sm" scrim="light">
            <form
              className="flex flex-col gap-3.5"
              onSubmit={(e) => {
                e.preventDefault();
                setModal(null);
              }}
            >
              <Field label="Name" autoComplete="name" />
              <Field label="Work email" type="email" autoComplete="email" />
              <Button type="submit" fullWidth>Send request</Button>
            </form>
          </Modal>
          <Modal open={modal === "md"} onClose={() => setModal(null)} label="That's the whole flow" size="md">
            <div className="flex flex-col gap-3.5">
              <Eyebrow>That&apos;s the whole flow</Eyebrow>
              <h2 className="m-0 text-[28px] font-bold text-navy-800">Upload, enhance, publish, measure.</h2>
              <p className="m-0 text-body text-gray-600">Try it with your own PDF. It takes about two minutes.</p>
              <Button onClick={() => setModal(null)}>Try it yourself</Button>
            </div>
          </Modal>
          <Modal open={modal === "lg"} onClose={() => setModal(null)} label="Webinar details" size="lg">
            <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] max-md:grid-cols-1">
              <div className="aspect-video bg-navy-900" />
              <div className="flex flex-col gap-3 p-6 pt-14">
                <Eyebrow>Webinar · 45 min</Eyebrow>
                <h2 className="m-0 text-h3 text-navy-800">Selling digital ads in print magazines</h2>
                <p className="m-0 text-body-sm text-gray-600">How three publishers doubled digital ad revenue.</p>
                <Button>Register</Button>
              </div>
            </div>
          </Modal>
        </Block>

        <Block title="Data tables">
          <DataTable label="Interactive elements" title="Interactive elements" columns={ELEMENT_COLS} rows={ELEMENTS} minWidth={0} />
          <DataTable
            label="Top clicked elements"
            title="Top clicked elements"
            animateRows
            minWidth={520}
            columns={[
              { key: "rank", header: "#", width: "30px", className: "font-bold text-gray-500", render: (_r: Ranked, i) => i + 1 },
              { key: "name", header: "Element", width: "minmax(0,1fr)", className: "text-gray-900", render: (r) => <span className="truncate">{r.name}</span> },
              { key: "type", header: "Type", width: "90px", render: (r) => <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">{r.type}</span> },
              { key: "clicks", header: "Clicks", width: "70px", align: "right", className: "font-bold text-navy-800 tabular-nums", render: (r) => r.clicks.toLocaleString("en-US") },
              { key: "trend", header: "Trend", width: "80px", align: "right", className: "font-semibold text-green-600" },
            ]}
            header="plain"
            rows={RANKED}
          />
          <DataTable label="Invoices" columns={INVOICE_COLS} rows={INVOICES} rowKey={(r) => r.id} header="plain" card />
        </Block>

        <Block title="Comparison tables">
          <ComparisonTable caption="Plan comparison" columns={["Free", "Starter", "Professional", "Business"]} rows={PLAN_ROWS} />
          <ComparisonTable
            variant="competitors"
            caption="FlipAndShare compared with other flipbook tools"
            columns={["FlipAndShare", "Flipsnack", "FlippingBook", "Publuu", "Heyzine", "Issuu"]}
            rows={VENDOR_ROWS}
            footnote="Based on public plan pages, October 2026."
          />
        </Block>

        <Block title="Reveal and count-up">
          <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
            {[
              { v: 1200, suf: "+", l: "publishers" },
              { v: 48000, suf: "+", l: "editions published" },
              { v: 2400000, l: "monthly readers" },
              { v: 4.8, suf: "/5", l: "average rating" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08} distance={14} duration={0.6} className="flex flex-col gap-1 rounded-lg border border-gray-200 p-[18px]">
                <span className="text-[30px] font-bold tracking-[-0.02em] text-navy-800">
                  <CountUp value={s.v} suffix={s.suf} />
                </span>
                <span className="text-label text-gray-500">{s.l}</span>
              </Reveal>
            ))}
          </div>
        </Block>
      </div>
    </section>
  );
}
