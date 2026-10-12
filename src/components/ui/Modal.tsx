"use client";

import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@/components/ui/Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Visible title; labels the dialog. If omitted, pass `label`. */
  title?: ReactNode;
  /** Accessible name when there is no visible title. */
  label?: string;
  /** sm 400px (lead form) · md 440px (demo done) · lg 960px (webinar detail). */
  size?: "sm" | "md" | "lg";
  /** Inner padding. Default: on for sm/md, off for lg (content lays itself out). */
  padded?: boolean;
  /** Show the × button (top right). */
  showClose?: boolean;
  /** Scrim darkness: light .6 / default .72. */
  scrim?: "light" | "dark";
  /** Element to focus first (otherwise the first focusable, then the panel). */
  initialFocusRef?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
};

const SIZE = {
  sm: "max-w-[400px] rounded-lg shadow-dialog",
  md: "max-w-[440px] rounded-lg shadow-dialog",
  lg: "max-w-[960px] rounded-lg shadow-modal",
};

const noopSubscribe = () => () => {};

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';

/**
 * Dialog shell rendered into document.body: blurred ink scrim, fasFade / fasUp entrance,
 * focus trap, Escape and scrim click close, focus returns to the trigger, body scroll locked.
 */
export function Modal({
  open,
  onClose,
  title,
  label,
  size = "sm",
  padded,
  showClose = true,
  scrim = "dark",
  initialFocusRef,
  className = "",
  children,
}: ModalProps) {
  const titleId = useId();
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open || !isClient) return;
    const trigger = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const focusables = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null) : [];
    const first = initialFocusRef?.current ?? focusables().find((el) => !el.hasAttribute("data-modal-close")) ?? panel;
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const els = focusables();
      if (els.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const a = els[0];
      const z = els[els.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === panel)) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      trigger?.focus?.();
    };
  }, [open, isClient, initialFocusRef]);

  if (!open || !isClient) return null;
  const pad = padded ?? size !== "lg";

  return createPortal(
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-6 backdrop-blur-[4px] max-sm:p-5 ${
        scrim === "light" ? "bg-ink-950/60" : "bg-ink-950/72"
      }`}
      style={{ animation: "fasFade .25s ease-out both" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : label}
        tabIndex={-1}
        className={`relative max-h-[calc(100vh-48px)] w-full overflow-auto bg-white outline-none ${SIZE[size]} ${
          pad ? (size === "md" ? "p-8" : "p-6") : ""
        } ${className}`}
        style={{ animation: "fasFade .3s ease-out both" }}
      >
        {(title || showClose) && (
          <div className={`flex items-start justify-between gap-4 ${title ? "mb-3.5" : ""} ${pad ? "" : "absolute right-4 top-4 z-[1]"}`}>
            {title && (
              <h2 id={titleId} className="m-0 text-lg font-bold text-navy-800">
                {title}
              </h2>
            )}
            {showClose && (
              <IconButton icon="close" label="Close dialog" tone="plain" size={32} onClick={onClose} data-modal-close="" className="ml-auto" />
            )}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
