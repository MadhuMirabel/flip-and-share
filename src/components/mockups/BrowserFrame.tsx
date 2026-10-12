import type { ReactNode } from "react";

function Lock({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-none"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export type BrowserFrameProps = {
  /** light = grey bar with 3 dots inside a bordered, shadowed frame · dark = compact slate bar (inside device screens). */
  tone?: "light" | "dark";
  url: ReactNode;
  /** Show the green lock before the URL. Defaults on for dark, off for light. */
  secure?: boolean;
  /** Slot at the right of the bar (e.g. a segmented control). Light tone only. */
  right?: ReactNode;
  /** When the whole mockup is decorative, give it an accessible name (role="img"). */
  label?: string;
  className?: string;
  /** Classes for the content area under the bar. */
  bodyClassName?: string;
  children?: ReactNode;
};

/** Browser window chrome around arbitrary content. The bar itself is decorative. */
export function BrowserFrame({
  tone = "light",
  url,
  secure,
  right,
  label,
  className = "",
  bodyClassName = "",
  children,
}: BrowserFrameProps) {
  const a11y = label ? { role: "img" as const, "aria-label": label } : {};

  if (tone === "dark") {
    return (
      <div {...a11y} className={`flex flex-col overflow-hidden bg-slate-900 ${className}`}>
        <div aria-hidden="true" className="flex h-[26px] flex-none items-center gap-2 bg-slate-900 px-2.5 text-2xs text-slate-300">
          <span className="flex gap-1">
            <span className="h-[7px] w-[7px] rounded-full bg-slate-700" />
            <span className="h-[7px] w-[7px] rounded-full bg-slate-700" />
          </span>
          <span className="flex h-[18px] min-w-0 flex-1 items-center gap-[5px] overflow-hidden rounded-sm bg-slate-800 px-2 font-mono text-ellipsis whitespace-nowrap">
            {(secure ?? true) && (
              <span className="flex text-green-600">
                <Lock size={11} />
              </span>
            )}
            {url}
          </span>
        </div>
        <div className={`relative min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
      </div>
    );
  }

  return (
    <div {...a11y} className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-frame ${className}`}>
      <div className="flex flex-wrap items-center gap-2.5 border-b border-gray-200 bg-gray-100 px-3.5 py-2.5">
        <span aria-hidden="true" className="flex gap-[5px]">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        </span>
        <span
          aria-hidden="true"
          className="flex min-w-[120px] flex-1 items-center gap-1.5 overflow-hidden rounded-sm border border-gray-200 bg-white px-2.5 py-1.5 font-mono text-xs text-ellipsis whitespace-nowrap text-gray-700"
        >
          {secure && (
            <span className="flex text-green-600">
              <Lock size={12} />
            </span>
          )}
          <span className="truncate">{url}</span>
        </span>
        {right}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
