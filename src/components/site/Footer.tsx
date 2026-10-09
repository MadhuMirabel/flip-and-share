import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { FOOTER_COLUMNS, FOOTER_PRODUCTS } from "@/lib/nav";
import { SITE } from "@/lib/site";

const inlineLink =
  "text-inherit underline decoration-white/35 underline-offset-[3px] hover:text-white";

const SOCIAL = [
  {
    label: "LinkedIn",
    d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z",
  },
  { label: "Facebook", d: "M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" },
  {
    label: "X",
    d: "M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.6 5.7zM16.4 19h1.8L7.7 4.9H5.8z",
  },
  {
    label: "YouTube",
    d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9L15.6 12z",
  },
];

export function Footer() {
  return (
    <footer
      itemScope
      itemType="https://schema.org/Organization"
      className="relative overflow-hidden bg-ink-950 px-8 pb-7 pt-16 text-[#cbd5e1]"
    >
      <meta itemProp="name" content="FlipAndShare by Mirabel Technologies" />
      <meta itemProp="telephone" content={SITE.phone} />
      <meta itemProp="email" content={SITE.email} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,.18),transparent_70%)]"
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-11">
        <div
          data-foottop
          className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-10 border-b border-white/10 pb-9"
        >
          <div className="flex flex-col gap-3">
            <Image
              src="/assets/logo-flipandshare.png"
              alt="FlipAndShare"
              width={185}
              height={30}
              className="block h-[30px] w-auto brightness-0 invert"
            />
            <p itemProp="description" className="m-0 max-w-[560px] text-[14.5px] leading-[1.65] text-[#94a3b8]">
              FlipAndShare turns PDF magazines, catalogs and brochures into interactive, SEO-ready digital editions.
              Add <Link href="/features/links" className={inlineLink}>video, links</Link>,{" "}
              <Link href="/features/forms" className={inlineLink}>lead forms</Link>,{" "}
              <Link href="/platform/qr" className={inlineLink}>QR codes</Link> and{" "}
              <Link href="/features/sales" className={inlineLink}>shoppable ads</Link>, then{" "}
              <Link href="/platform/analytics" className={inlineLink}>measure every read and click</Link>. Built by
              Mirabel Technologies for publishers.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div data-footcols className="grid grid-cols-[1.25fr_repeat(4,minmax(0,1fr))] gap-8">
          <nav aria-label="Mirabel products" className="flex min-w-0 flex-col gap-2.5">
            <h2 className="m-0 mb-1 font-mono text-[11.5px] font-bold tracking-[.1em] text-blue-300">PRODUCTS</h2>
            <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
              {FOOTER_PRODUCTS.map((p) => (
                <li key={p.label}>
                  <Link
                    href="/company"
                    title={`${p.label} by Mirabel Technologies`}
                    className="flex flex-col gap-px hover:opacity-85"
                  >
                    <span className="text-sm font-semibold text-white">{p.label}</span>
                    <span className="text-xs leading-[1.35] text-[#94a3b8]">{p.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.aria} className="flex min-w-0 flex-col gap-2.5">
              <h2 className="m-0 mb-1 font-mono text-[11.5px] font-bold tracking-[.1em] text-blue-300">{col.title}</h2>
              <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-[#cbd5e1] transition-colors duration-150 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          data-foottop
          className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-6 rounded-[14px] border border-white/[.08] bg-white/[.04] px-6 py-[22px]"
        >
          <address itemProp="address" className="flex flex-wrap items-center gap-[22px] text-sm not-italic">
            <span className="font-semibold text-white">Talk to us</span>
            <a href={SITE.phoneHref} className="flex items-center gap-2 font-semibold text-blue-300 hover:text-white">
              <Icon name="phone" size={14} />
              {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="flex items-center gap-2 font-semibold text-blue-300 hover:text-white">
              <Icon name="mail" size={14} />
              {SITE.email}
            </a>
          </address>
          <div className="flex flex-wrap justify-end gap-2">
            {SOCIAL.map((s) => (
              <Link
                key={s.label}
                href="/company"
                aria-label={`FlipAndShare on ${s.label}`}
                className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-white/[.14] text-[#cbd5e1] transition-all duration-150 hover:bg-white/[.08] hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-1 text-[12.5px] text-[#94a3b8]">
          <span>© 2026 Mirabel Technologies, Inc. FlipAndShare is a product of Mirabel Technologies.</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-[18px]">
            <Link href="/company" className="text-[#94a3b8] hover:text-white">Privacy policy</Link>
            <Link href="/company" className="text-[#94a3b8] hover:text-white">Terms of service</Link>
            <Link href="/company" className="text-[#94a3b8] hover:text-white">Cookie settings</Link>
            <Link href="/resources" className="text-[#94a3b8] hover:text-white">Accessibility</Link>
            <Link href="/resources" className="text-[#94a3b8] hover:text-white">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
