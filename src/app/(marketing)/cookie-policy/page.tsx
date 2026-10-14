import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/site/CookieSettingsButton";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CONSENT_MAX_AGE_DAYS } from "@/lib/consent-core";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies and similar technologies FlipAndShare uses, why, and how to change your choices.",
};

/** Bump together with CONSENT_VERSION in lib/consent-core.ts when this page's categories or cookies change. */
const UPDATED = "13 October 2026";

type Entry = { name: string; kind: string; lifetime: string; purpose: string; provider: string };

const NECESSARY: Entry[] = [
  {
    name: "fas_consent",
    kind: "Cookie",
    lifetime: `${Math.round(CONSENT_MAX_AGE_DAYS / 30)} months`,
    purpose: "Remembers the cookie choices you made, so we don't ask on every page.",
    provider: "FlipAndShare",
  },
  {
    name: "fas_session",
    kind: "Local storage",
    lifetime: "Until you sign out",
    purpose: "Keeps you signed in to your account.",
    provider: "FlipAndShare",
  },
  {
    name: "fas-hero",
    kind: "Local storage",
    lifetime: "Until you clear site data",
    purpose: "Remembers which set of magazine covers the homepage showed last, so it can rotate them. Contains no personal data.",
    provider: "FlipAndShare",
  },
];

const ANALYTICS: Entry[] = [
  {
    name: "_ga, _ga_<id>",
    kind: "Cookie",
    lifetime: "2 years",
    purpose: "Tell visits apart so we can count how many people use the site and which pages they read.",
    provider: "Google Analytics",
  },
];

const MARKETING: Entry[] = [
  {
    name: "_fbp",
    kind: "Cookie",
    lifetime: "3 months",
    purpose: "Measures how our ads perform and shows relevant ads on other sites.",
    provider: "Meta",
  },
  {
    name: "_gcl_au",
    kind: "Cookie",
    lifetime: "3 months",
    purpose: "Links an ad click to a later sign-up, to measure advertising.",
    provider: "Google Ads",
  },
];

function Table({ rows, caption }: { rows: Entry[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[640px] border-collapse text-left text-label">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-gray-50 text-small text-gray-500">
            {["Name", "Type", "Kept for", "What it does", "Set by"].map((h) => (
              <th key={h} scope="col" className="border-b border-gray-200 px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="align-top">
              <th scope="row" className="border-b border-gray-100 px-4 py-3 font-mono text-small font-semibold text-gray-900">
                {r.name}
              </th>
              <td className="border-b border-gray-100 px-4 py-3 text-gray-700">{r.kind}</td>
              <td className="border-b border-gray-100 px-4 py-3 text-gray-700">{r.lifetime}</td>
              <td className="border-b border-gray-100 px-4 py-3 text-gray-700">{r.purpose}</td>
              <td className="border-b border-gray-100 px-4 py-3 text-gray-700">{r.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const h2 = "m-0 mb-3 text-h3 text-navy-800";
const p = "m-0 text-body leading-[1.65] text-gray-700";

export default function CookiePolicyPage() {
  return (
    <Container className="max-w-[860px]! pb-24 pt-16">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mb-2 mt-2 text-h1 text-navy-800">Cookie Policy</h1>
      <p className="m-0 text-label text-gray-500">Last updated {UPDATED}</p>

      <div className="mt-8 flex flex-col gap-10">
        <section aria-labelledby="what">
          <h2 id="what" className={h2}>
            What are cookies?
          </h2>
          <p className={p}>
            Cookies are small text files a website saves in your browser. We also use similar technologies, such as local
            storage, which work the same way. They let a site remember who you are and what you chose, and help us
            understand how the site is used.
          </p>
        </section>

        <section aria-labelledby="choices">
          <h2 id="choices" className={h2}>
            Your choices
          </h2>
          <p className={p}>
            Only the necessary items below are used until you choose. You can accept everything, reject what isn&apos;t
            necessary, or pick categories one by one. We remember your choice for {Math.round(CONSENT_MAX_AGE_DAYS / 30)}{" "}
            months, or until this policy changes, and then ask again. If your browser sends the Global Privacy Control
            signal, we treat it as a refusal of marketing cookies.
          </p>
          <p className="mt-4 text-body">
            <CookieSettingsButton className="font-semibold text-blue-600 underline underline-offset-[3px] hover:text-blue-700">
              Change your cookie settings
            </CookieSettingsButton>
          </p>
        </section>

        <section aria-labelledby="necessary">
          <h2 id="necessary" className={h2}>
            Necessary
          </h2>
          <p className={`${p} mb-4`}>
            The site doesn&apos;t work without these, so they are always on and can&apos;t be switched off here.
          </p>
          <Table rows={NECESSARY} caption="Necessary cookies and similar technologies" />
        </section>

        <section aria-labelledby="analytics">
          <h2 id="analytics" className={h2}>
            Analytics
          </h2>
          <p className={`${p} mb-4`}>
            Off until you accept. They help us see which pages are used so we can improve them. A tool is added to the
            site only after you accept this category and only if we have switched it on.
          </p>
          <Table rows={ANALYTICS} caption="Analytics cookies" />
        </section>

        <section aria-labelledby="marketing">
          <h2 id="marketing" className={h2}>
            Marketing
          </h2>
          <p className={`${p} mb-4`}>
            Off until you accept. They measure our advertising and help show relevant ads on other sites. A tool is added
            only after you accept this category and only if we have switched it on.
          </p>
          <Table rows={MARKETING} caption="Marketing cookies" />
        </section>

        <section aria-labelledby="control">
          <h2 id="control" className={h2}>
            Managing cookies in your browser
          </h2>
          <p className={p}>
            You can also block or delete cookies in your browser settings. If you block the necessary ones, parts of the
            site, such as signing in, may stop working. Cookies set by other companies are covered by their own policies.
          </p>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact" className={h2}>
            Questions
          </h2>
          <p className={p}>
            Email <a href={SITE.emailHref} className="font-semibold">{SITE.email}</a> or call{" "}
            <a href={SITE.phoneHref} className="font-semibold">{SITE.phone}</a>. See also our{" "}
            <Link href="/company" className="font-semibold">
              company page
            </Link>{" "}
            for privacy and terms.
          </p>
        </section>
      </div>
    </Container>
  );
}
