"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { useSession } from "@/components/site/Providers";
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
  const box = compact ? 26 : 30;
  return (
    <Link
      href={item.href}
      className={`grid items-start rounded-[7px] text-[#374151] transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600 ${
        compact ? "grid-cols-[26px_minmax(0,1fr)] gap-2 px-2 py-[7px]" : "grid-cols-[30px_minmax(0,1fr)] gap-2.5 px-2.5 py-[9px]"
      }`}
    >
      <span className="flex flex-none items-center justify-center text-inherit" style={{ width: box, height: box }}>
        {item.icon && <Icon name={item.icon} />}
      </span>
      <span className="flex flex-col gap-px">
        <span className={`font-semibold text-inherit ${compact ? "text-[13px]" : "text-[13.5px]"}`}>{item.label}</span>
        <span className={`text-[#6b7280] ${compact ? "text-[11px] leading-[1.3]" : "text-[11.5px] leading-[1.35]"}`}>
          {item.desc}
        </span>
      </span>
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

  const trigger = (key: MenuKey, label: string, href: string, activePrefixes: string[]) => {
    const active = activePrefixes.some((p) => isActive(pathname, p));
    return (
      <span className="flex items-center gap-1">
        <Link
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`hover:text-blue-600 ${active ? "text-navy-800" : "text-[#374151]"}`}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open === key}
          aria-label={`${label} menu`}
          onClick={() => setOpen(open === key ? null : key)}
          className="cursor-pointer border-0 bg-transparent p-0.5 text-[9px] text-[#6b7280]"
        >
          ▾
        </button>
      </span>
    );
  };

  const panel = (items: NavLink[], width: number) => (
    <div
      className="flex flex-col gap-0.5 rounded-[10px] border border-[#e5e7eb] bg-white p-2 shadow-[0_20px_40px_-16px_rgba(0,0,0,.25)]"
      style={{ width }}
    >
      {items.map((it) => (
        <DropItem key={it.href + it.label} item={it} />
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-[8px]">
      <div data-hdr className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-8 px-8 py-3.5">
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
              <div className="border-t border-[#e5e7eb] bg-white shadow-mega">
                <div
                  data-ucmenu
                  className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_250px] gap-x-7 gap-y-1.5 px-8 pb-7 pt-[22px]"
                >
                  {[
                    { title: "BY INDUSTRY", items: USE_CASES_INDUSTRY },
                    { title: "BY CONTENT TYPE", items: USE_CASES_CONTENT },
                  ].map((col) => (
                    <div key={col.title} data-uccol className="grid min-w-0 grid-cols-2 content-start gap-x-2 gap-y-0.5">
                      <span className="col-span-full mb-1 border-b border-[#f1f5f9] px-2 py-1.5 font-mono text-[10.5px] font-semibold tracking-[.1em] text-[#6b7280]">
                        {col.title}
                      </span>
                      {col.items.map((it) => (
                        <DropItem key={it.href} item={it} compact />
                      ))}
                    </div>
                  ))}
                  <div data-ucside className="flex min-w-0 flex-col gap-2.5 self-start border-l border-[#f1f5f9] pl-3.5">
                    <span className="pb-0.5 pt-1.5 font-mono text-[10.5px] font-semibold tracking-[.1em] text-[#6b7280]">
                      GET STARTED
                    </span>
                    <Link
                      href="/use-cases"
                      className="flex flex-col gap-2 rounded-[10px] border border-blue-200 bg-[linear-gradient(150deg,#f0f9ff,#e0f2fe)] p-3 text-navy-800 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:text-navy-800 hover:shadow-[0_12px_24px_-18px_rgba(12,74,110,.5)]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-white text-blue-600 shadow-[0_1px_2px_rgba(12,74,110,.12)]">
                          <Icon name="grid" />
                        </span>
                        <span className="text-[13px] font-bold">All use cases</span>
                      </span>
                      <span className="text-[11.5px] leading-[1.4] text-[#4b5563]">
                        Seventeen ways publishers, schools, retailers and agencies use one PDF.
                      </span>
                      <span className="text-xs font-semibold text-blue-600">Browse all →</span>
                    </Link>
                    <Link
                      href="/enterprise"
                      className="flex flex-col gap-2 rounded-[10px] border border-[#ddd6fe] bg-[linear-gradient(150deg,#f5f3ff,#ede9fe)] p-3 text-[#3b0764] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:text-[#3b0764] hover:shadow-[0_12px_24px_-18px_rgba(76,29,149,.4)]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-white text-violet-700 shadow-[0_1px_2px_rgba(76,29,149,.12)]">
                          <Icon name="lock" />
                        </span>
                        <span className="text-[13px] font-bold">Enterprise</span>
                      </span>
                      <span className="text-[11.5px] leading-[1.4] text-[#4b5563]">
                        SSO, white label, custom domains and API for publishing groups.
                      </span>
                      <span className="text-xs font-semibold text-violet-700">Talk to sales →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span className="fas-nav-item relative flex items-center" data-open={open === "resources"}>
            {trigger("resources", "Resources", "/resources", ["/resources", "/blog", "/customers", "/whats-new", "/company", "/why-us"])}
            <div className="fas-drop">
              <div className="grid max-h-[78vh] w-[300px] grid-cols-1 gap-0.5 overflow-y-auto rounded-[10px] border border-[#e5e7eb] bg-white p-2 shadow-[0_20px_40px_-16px_rgba(0,0,0,.25)]">
                {RESOURCES.map((it) => (
                  <DropItem key={it.label} item={it} />
                ))}
              </div>
            </div>
          </span>
          <Link
            href="/store"
            aria-current={isActive(pathname, "/store") ? "page" : undefined}
            className="text-[#374151] hover:text-blue-600"
          >
            Store
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Link
            data-hdr-login
            href="/pricing"
            className="fas-pricelink flex items-center gap-1.5 px-3 py-[9px] text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <span className="fas-pricearrow inline-flex transition-transform duration-300 ease-fas">
              <Icon name="arrow" size={15} />
            </span>
            <span className="fas-pricetext inline-block transition-transform duration-300 ease-fas">Pricing</span>
          </Link>
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
          <Link
            data-hdr-cta
            href={signedIn ? "/app/library" : "/signup"}
            className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 hover:text-white"
          >
            Sign up / Sign in
          </Link>
          <button
            data-burger
            type="button"
            onClick={() => setMnav(!mnav)}
            aria-label={mnav ? "Close menu" : "Open menu"}
            aria-expanded={mnav}
            aria-controls="mobile-nav"
            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-lg text-navy-800"
          >
            {mnav ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mnav && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex max-h-[calc(100vh-60px)] flex-col overflow-y-auto border-t border-[#e5e7eb] bg-white px-5 pb-[18px] pt-2"
          style={{ animation: "fasFade .2s ease-out both" }}
        >
          {MOBILE_SECTIONS.map((sec, i) => (
            <div key={sec.title} className="flex flex-col">
              <span
                className={`px-1 pb-2 font-mono text-[11px] font-semibold tracking-[.1em] text-[#6b7280] ${
                  i === 0 ? "pt-3.5" : "mt-1.5 border-t border-[#e5e7eb] pt-[30px]"
                }`}
              >
                {sec.title}
              </span>
              {sec.links.map((l) => (
                <Link
                  key={sec.title + l.href + l.label}
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="border-b border-[#f1f5f9] px-1 py-2.5 text-[15px] text-navy-800"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/app/account"
            className="flex items-center gap-2 border-b border-[#f1f5f9] px-1 py-2.5 text-[15px] text-blue-600"
          >
            <Icon name="user" size={16} />
            My account
          </Link>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-white p-[13px] text-[15px] font-semibold text-blue-600"
            >
              <Icon name="arrow" size={15} />
              Pricing
            </Link>
            <Link
              href={signedIn ? "/app/library" : "/signup"}
              className="rounded-lg bg-blue-500 p-[13px] text-center text-[15px] font-semibold text-white hover:text-white"
            >
              Sign up / Sign in
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
