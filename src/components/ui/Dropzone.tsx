"use client";

import { useId, useRef, useState, type DragEvent, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "@/components/icons";

export const DEFAULT_ACCEPT = ".pdf,.ppt,.pptx,.doc,.docx,image/*";

type DropzoneProps = {
  onFiles: (files: File[]) => void;
  /** hero: decorated homepage zone (sparkle ring, sparks, bobbing tile, faux CTA) · app: Upload step with drag-over state. */
  variant?: "hero" | "app";
  accept?: string;
  multiple?: boolean;
  title?: ReactNode;
  hint?: ReactNode;
  /** Faux button label (hero only). */
  cta?: ReactNode;
  /** Called when dropped files don't match `accept`. */
  onReject?: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
};

/** Spark positions from the prototype's heroSparks: [x%, y%, size px, delay s]. */
const SPARKS: [number, number, number, number][] = [
  [-2, 18, 14, 0],
  [12, -3, 10, 0.3],
  [38, -4, 12, 0.8],
  [64, -2, 9, 0.5],
  [88, 6, 13, 1.1],
  [101, 40, 10, 0.2],
  [96, 78, 12, 0.9],
  [70, 101, 9, 0.6],
  [40, 102, 13, 1.3],
  [8, 96, 10, 0.4],
  [-3, 62, 11, 1.0],
  [102, 20, 9, 0.7],
];

function matchesAccept(file: File, accept: string) {
  const rules = accept
    .split(",")
    .map((r) => r.trim().toLowerCase())
    .filter(Boolean);
  if (!rules.length) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return rules.some((r) =>
    r.startsWith(".") ? name.endsWith(r) : r.endsWith("/*") ? type.startsWith(r.slice(0, -1)) : type === r,
  );
}

/** Upload chevron drawn with borders, as in the prototype tile. */
function UploadGlyph() {
  return <span className="block h-3.5 w-3.5 border-[2.5px] border-r-0 border-b-0 border-blue-600" style={{ transform: "rotate(45deg) translate(3px,3px)" }} />;
}

/** File drop target. A real (hidden) file input backs it; click, Enter or Space opens the picker. */
export function Dropzone({
  onFiles,
  variant = "app",
  accept = DEFAULT_ACCEPT,
  multiple = false,
  title,
  hint = "PDF, PowerPoint, Word or images · up to 500 MB",
  cta = "Choose a File",
  onReject,
  disabled,
  className = "",
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const hintId = useId();
  const hero = variant === "hero";
  const heading = title ?? (hero ? "Drop your PDF here" : "Drop your file here or click to browse");

  const deliver = (list: FileList | null) => {
    if (!list?.length) return;
    const all = Array.from(list);
    const files = multiple ? all : all.slice(0, 1);
    const ok = files.filter((f) => matchesAccept(f, accept));
    const bad = files.filter((f) => !matchesAccept(f, accept));
    if (bad.length) onReject?.(bad);
    if (ok.length) onFiles(ok);
  };

  const open = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handlers = {
    onClick: open,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    },
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
      if (!disabled) setOver(true);
    },
    onDragLeave: (e: DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(false);
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setOver(false);
      if (!disabled) deliver(e.dataTransfer.files);
    },
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      tabIndex={-1}
      aria-hidden="true"
      className="hidden"
      onChange={(e) => {
        deliver(e.target.files);
        e.target.value = "";
      }}
    />
  );

  const a11y = {
    role: "button" as const,
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled || undefined,
    "aria-describedby": hintId,
  };

  if (hero) {
    return (
      <>
        <div
          {...a11y}
          {...handlers}
          className={`fas-dropzone relative box-border flex w-full max-w-[720px] cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-9 backdrop-blur-[6px] transition-all duration-200 hover:border-blue-500/45 hover:bg-blue-50 ${
            over ? "border-blue-500/45 bg-blue-50" : "border-blue-300 bg-white/[.82]"
          } ${className}`}
        >
          <span
            aria-hidden="true"
            className="fas-sparkring pointer-events-none absolute -inset-[3px] overflow-hidden rounded-lg p-[3px] opacity-0 transition-opacity duration-300"
            style={{
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
            }}
          >
            <span
              className="fas-sparkspin absolute top-1/2 left-1/2 -mt-[600px] -ml-[600px] h-[1200px] w-[1200px]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0 74%, color-mix(in srgb, var(--color-blue-400) 55%, transparent) 87%, color-mix(in srgb, var(--color-white) 90%, transparent) 92%, transparent 100%)",
              }}
            />
          </span>
          {SPARKS.map(([x, y, s, d], i) => (
            <span
              key={i}
              aria-hidden="true"
              className="fas-spark pointer-events-none absolute text-blue-400 opacity-0"
              style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
            >
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
                <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" />
              </svg>
            </span>
          ))}
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 shadow-[0_8px_18px_-12px_color-mix(in_srgb,var(--color-blue-600)_50%,transparent)]"
            style={{ animation: "fasUploadBob 4.5s ease-in-out infinite" }}
          >
            <UploadGlyph />
          </span>
          <span className="text-lg font-semibold text-navy-700">{heading}</span>
          <span id={hintId} className="text-sm text-gray-500">
            {hint}
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 inline-flex items-center gap-2 rounded-sm bg-blue-500 px-[22px] py-3 text-sm font-semibold text-white"
          >
            <Icon name="pdf" size={16} />
            {cta}
          </span>
        </div>
        {input}
      </>
    );
  }

  return (
    <>
      <div
        {...a11y}
        {...handlers}
        className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-14 text-center transition-all duration-150 ${
          over ? "border-blue-500 bg-blue-100" : "border-blue-300 bg-white"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`}
      >
        <span aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-100">
          <UploadGlyph />
        </span>
        <span className="text-lg font-semibold text-navy-700">{heading}</span>
        <span id={hintId} className="text-sm text-gray-500">
          {hint}
        </span>
      </div>
      {input}
    </>
  );
}
