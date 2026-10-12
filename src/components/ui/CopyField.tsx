"use client";

import { useRef } from "react";
import { useToast } from "@/components/site/Providers";
import { Button } from "@/components/ui/Button";

type CopyFieldProps = {
  /** Text shown in the chip and copied. */
  value: string;
  /** Copy button label, e.g. "Copy key". */
  buttonLabel?: string;
  /** Screen-reader label read before the chip, e.g. "Authenticator setup key". */
  label?: string;
  /** Toast shown after a successful copy. */
  successMessage?: string;
  className?: string;
};

/** Copies via the async Clipboard API, falling back to a hidden textarea + execCommand on insecure origins. */
async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

/** Mono code chip + "Copy" text button (2FA setup key). */
export function CopyField({
  value,
  buttonLabel = "Copy",
  label,
  successMessage = "Copied to clipboard",
  className = "",
}: CopyFieldProps) {
  const toast = useToast();
  const chipRef = useRef<HTMLElement>(null);

  const copy = async () => {
    if (await copyText(value)) {
      toast(successMessage, "success");
      return;
    }
    // Last resort: select the chip so the user can press Ctrl/Cmd+C.
    const el = chipRef.current;
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    toast("Couldn't copy automatically. Press Ctrl+C (⌘C) to copy.", "error");
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {label && <span className="sr-only">{label}:</span>}
      <code
        ref={chipRef}
        className="select-all rounded-sm border border-blue-200 bg-blue-50 px-2.5 py-[7px] font-mono text-label font-semibold tracking-[.08em] text-navy-800"
      >
        {value}
      </code>
      <Button variant="text" onClick={copy}>
        {buttonLabel}
      </Button>
    </div>
  );
}
