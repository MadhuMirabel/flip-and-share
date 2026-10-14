"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useSession } from "@/components/site/Providers";
import { Button } from "@/components/ui/Button";

const NAV = [
  { href: "/app/library", label: "Library" },
  { href: "/app/analytics", label: "Analytics" },
];

const DEMO_USER = "Alex Morgan";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

/**
 * Signed-in app frame (prototype `data-app`, L412–419): 232px sidebar + main.
 * At ≤760px the sidebar becomes a sticky horizontal bar and the user block is hidden.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useSession();
  const name = user?.name ?? DEMO_USER;

  return (
    <div className="grid min-h-screen grid-cols-[232px_minmax(0,1fr)] bg-slate-50 max-[760px]:grid-cols-1 max-[760px]:grid-rows-[auto_minmax(0,1fr)]">
      <aside
        className="sticky top-0 z-10 box-border flex h-screen flex-col gap-1 border-r border-gray-200 bg-white px-3.5 py-[18px] max-[760px]:h-auto max-[760px]:flex-row max-[760px]:items-center max-[760px]:gap-1.5 max-[760px]:overflow-x-auto max-[760px]:border-b max-[760px]:border-r-0 max-[760px]:px-3 max-[760px]:py-2.5"
      >
        <Link href="/" aria-label="FlipAndShare home" className="flex items-center gap-2.5 px-2 pb-[18px] pt-1 text-base font-bold text-navy-700 max-[760px]:pb-1 max-[760px]:pr-2">
          <span aria-hidden="true" className="h-6 w-6 flex-none rounded-sm bg-[linear-gradient(135deg,var(--color-navy-800)_0%,var(--color-blue-400)_100%)]" />
          <span className="max-[760px]:hidden">FlipAndShare</span>
        </Link>
        <Button
          href="/app/upload"
          fullWidth
          className="mb-3.5 max-[760px]:order-9 max-[760px]:mb-0 max-[760px]:ml-auto max-[760px]:w-auto max-[760px]:px-3 max-[760px]:py-2"
        >
          <span className="max-[760px]:hidden">+ New publication</span>
          <span className="hidden max-[760px]:inline">+ New</span>
        </Button>
        <nav aria-label="App" className="flex flex-col gap-1 max-[760px]:flex-row">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-sm px-3 py-[9px] text-sm font-medium max-[760px]:px-2.5 ${
                  active ? "bg-blue-50 text-navy-700 hover:text-navy-700" : "text-gray-700 hover:bg-slate-50 hover:text-gray-900"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2.5 border-t border-gray-200 px-2 pt-3 max-[760px]:hidden">
          <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-navy-700">
            {initials(name)}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-label font-semibold text-gray-900">{name}</span>
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="cursor-pointer border-0 bg-transparent p-0 text-left text-xs text-blue-600 hover:text-blue-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <main id="main" className="min-w-0 px-10 pb-16 pt-8 max-[760px]:px-4 max-[760px]:pb-24 max-[760px]:pt-4">
        {children}
      </main>
    </div>
  );
}
