"use client";

import type { ReactNode } from "react";
import { openCookieSettings } from "@/lib/consent";

/** Text button that reopens the cookie settings (footer link, cookie policy page). */
export function CookieSettingsButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={`cursor-pointer border-0 bg-transparent p-0 text-left ${className}`}>
      {children}
    </button>
  );
}
