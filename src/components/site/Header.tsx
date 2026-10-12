"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { useSession } from "@/components/site/Providers";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconTile } from "@/components/ui/IconTile";
import {
  FEATURES,
  MOBILE_SECTIONS,
  PLATFORM,
  RESOURCES,
  USE_CASES_CONTENT,
  USE_CASES_INDUSTRY,
  type NavLink,
} from "@/lib/nav";

type MenuKey = "platform" | "features" | "usecases" | "resources";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function DropItem({ item, compact = false }: { item: NavLink; compact?: boolean }) {
  return (
    <Link
      href={item.href}
      className={`grid items-start rounded-md text-gray-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600 ${
        compact ? "grid-cols-[26px_minmax(0,1fr)] gap-2 px-2 py-[7px]" : "grid-cols-[30px_minmax(0,1fr)] gap-2.5 px-2.5 py-[9px]"
      }`}
    >
      {item.icon && <IconTile name={item.icon} tone="plain" size={compact ? 26 : 30} iconSize={20} />}
      <span className="flex flex-col gap-px">
        <span className={`font-semibold text-inherit ${compact ? "text-label" : "text-menu"}`}>{item.label}</span>
        <span className={`text-gray-500 ${compact ? "text-eyebrow" : "text-caption"}`}>{item.desc}</span>
      </span>
    </Link>
  );
}

function PromoCard({
  href,
  icon,
  title,
  body,
  cta,
  tone,
}: {
  href: string;
  icon: "grid" | "lock";
  title: string;
  body: string;
  cta: string;
  tone: "sky" | "violet";
}) {
  const sky = tone === "sky";
  return (
    <Link
      href={href}
      className={`flex flex-col gap-2 rounded-lg border p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 ${
        sky
          ? "border-blue-200 bg-[linear-gradient(150deg,var(--color-blue-50),var(--color-blue-100))] text-navy-800 hover:text-navy-800 hover:shadow-card-hover"
          : "border-violet-200 bg-[linear-gradient(150deg,var(--color-violet-50),var(--color-violet-100))] text-violet-950 hover:text-violet-950 hover:shadow-card-hover-violet"
      }`}
    >
      <span className="flex items-center gap-2">
        <IconTile name={icon} tone="white" size={26} className={sky ? "" : "!text-violet-700"} />
        <span className="text-label font-bold">{title}</span>
      </span>
      <span className="text-caption text-gray-600">{body}</span>
      <span className={`text-xs font-semibold ${sky ? "text-blue-600" : "text-violet-700"}`}>{cta}</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { signedIn } = useSession();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mnav, setMnav] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on navigation (adjust state during render, keyed on pathname)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMnav(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMnav(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const ctaHref = signedIn ? "/app/library" : "/signup";

  const trigger = (key: MenuKey, label: string, href: string, activePrefixes: string[]) => {
    const active = activePrefixes.some((p) => isActive(pathname, p));
    return (
      <span className="flex items-center gap-1">
        <Link
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`hover:text-blue-600 ${active ? "text-navy-800" : "text-gray-700"}`}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open === key}
          aria-label={`${label} menu`}
          onClick={() => setOpen(open === key ? null : key)}
          className={`flex cursor-pointer border-0 bg-transparent p-0.5 text-gray-500 transition-transform duration-150 ${
            open === key ? "rotate-180" : ""
          }`}
        >
          <Icon name="chevron" size={12} />
        </button>
      </span>
    );
  };

  const panel = (items: NavLink[], width: number) => (
    <div className="flex flex-col gap-0.5 rounded-lg border border-gray-200 bg-white p-2 shadow-dropdown" style={{ width }}>
      {items.map((it) => (
        <DropItem key={it.href + it.label} item={it} />
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-[8px]">
      <div data-hdr className="mx-auto flex max-w-page flex-wrap items-center gap-8 px-8 py-3.5">
        <Link href="/" aria-label="FlipAndShare home" className="flex items-center">
          <Image
            src="/assets/logo-flipandshare.png"
            alt="FlipAndShare"
            width={160}
            height={26}
            priority
            className="block h-[26px] w-auto"
          />
        </Link>

        <nav ref={navRef} data-nav aria-label="Main" className="flex items-center gap-[22px] text-sm font-medium">
          <span className="fas-nav-item relative flex items-center" data-open={open === "platform"}>
            {trigger("platform", "Platform", "/platform", ["/platform", "/integrations"])}
            <div className="fas-drop">{panel(PLATFORM, 270)}</div>
          </span>
          <span className="fas-nav-item relative flex items-center" data-open={open === "features"}>
            {trigger("features", "Features", "/features", ["/features"])}
            <div className="fas-drop">{panel(FEATURES, 290)}</div>
          </span>
          <span className="fas-nav-item static flex items-center" data-open={open === "usecases"}>
            {trigger("usecases", "Use cases", "/use-cases", ["/use-cases", "/enterprise"])}
            <div className="fas-drop !right-0 !top-[calc(100%-28px)] !pt-7">
              <div className="border-t border-gray-200 bg-white shadow-mega">
                <div
                  data-ucmenu
                  className="mx-auto grid max-w-page grid-cols-[minmax(0,1fr)_minmax(0,1fr)_250px] gap-x-7 gap-y-1.5 px-8 pb-7 pt-[22px]"
                >
                  {[
                    { title: "By industry", items: USE_CASES_INDUSTRY },
                    { title: "By content type", items: USE_CASES_CONTENT },
                  ].map((col) => (
                    <div key={col.title} data-uccol className="grid min-w-0 grid-cols-2 content-start gap-x-2 gap-y-0.5">
                      <Eyebrow size="xs" className="col-span-full mb-1 border-b border-slate-100 px-2 py-1.5">
                        {col.title}
                      </Eyebrow>
                      {col.items.map((it) => (
                        <DropItem key={it.href} item={it} compact />
                      ))}
                    </div>
                  ))}
                  <div data-ucside className="flex min-w-0 flex-col gap-2.5 self-start border-l border-slate-100 pl-3.5">
                    <Eyebrow size="xs" className="pb-0.5 pt-1.5">
                      Get started
                    </Eyebrow>
                    <PromoCard
                      href="/use-cases"
                      icon="grid"
                      tone="sky"
                      title="All use cases"
                      body="Seventeen ways publishers, schools, retailers and agencies use one PDF."
                      cta="Browse all →"
                    />
                    <PromoCard
                      href="/enterprise"
                      icon="lock"
                      tone="violet"
                      title="Enterprise"
                      body="SSO, white label, custom domains and API for publishing groups."
                      cta="Talk to sales →"
                    />
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span className="fas-nav-item relative flex items-center" data-open={open === "resources"}>
            {trigger("resources", "Resources", "/resources", ["/resources", "/blog", "/customers", "/whats-new", "/company", "/why-us"])}
            <div className="fas-drop">
              <div className="grid max-h-[78vh] w-[300px] grid-cols-1 gap-0.5 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-dropdown">
                {RESOURCES.map((it) => (
                  <DropItem key={it.label} item={it} />
                ))}
              </div>
            </div>
          </span>
          <Link
            href="/store"
            aria-current={isActive(pathname, "/store") ? "page" : undefined}
            className="text-gray-700 hover:text-blue-600"
          >
            Store
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Button data-hdr-login href="/pricing" variant="link" iconLeft="arrow">
            Pricing
          </Button>
          {signedIn && (
            <Link
              data-hdr-acct
              href="/app/account"
              className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-[9px] text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              <Icon name="user" size={16} />
              My account
            </Link>
          )}
          <Button data-hdr-cta href={ctaHref}>
            Sign up / Sign in
          </Button>
          <button
            data-burger
            type="button"
            onClick={() => setMnav(!mnav)}
            aria-label={mnav ? "Close menu" : "Open menu"}
            aria-expanded={mnav}
            aria-controls="mobile-nav"
            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-lg text-navy-800"
          >
            {mnav ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mnav && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex max-h-[calc(100vh-60px)] flex-col overflow-y-auto border-t border-gray-200 bg-white px-5 pb-[18px] pt-2"
          style={{ animation: "fasFade .2s ease-out both" }}
        >
          {MOBILE_SECTIONS.map((sec, i) => (
            <div key={sec.title} className="flex flex-col">
              <Eyebrow className={`px-1 pb-2 ${i === 0 ? "pt-3.5" : "mt-1.5 border-t border-gray-200 pt-[30px]"}`}>
                {sec.title}
              </Eyebrow>
              {sec.links.map((l) => (
                <Link
                  key={sec.title + l.href + l.label}
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="border-b border-slate-100 px-1 py-2.5 text-body text-navy-800"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/app/account" className="flex items-center gap-2 border-b border-slate-100 px-1 py-2.5 text-body text-blue-600">
            <Icon name="user" size={16} />
            My account
          </Link>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            <Button href="/pricing" variant="subtle" size="lg" radius="md" iconLeft="arrow">
              Pricing
            </Button>
            <Button href={ctaHref} size="lg" radius="md">
              Sign up / Sign in
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
