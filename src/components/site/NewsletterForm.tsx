"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setErr("Enter a valid email address.");
      return;
    }
    // TODO: post to the marketing/CRM provider
    setErr("");
    setDone(true);
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-white">
        Get publishing tips once a month
      </label>
      {done ? (
        <span role="status" className="text-sm font-semibold text-[#86efac]">
          ✓ You&apos;re subscribed.
        </span>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <input
              id={id}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@publisher.com"
              aria-invalid={!!err || undefined}
              aria-describedby={err ? `${id}-err` : undefined}
              className="min-w-[180px] flex-1 rounded-lg border border-white/[.18] bg-white/[.06] px-[13px] py-[11px] text-sm text-white outline-none placeholder:text-[#94a3b8] focus:border-blue-400"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-lg border-0 bg-blue-500 px-4 py-[11px] text-sm font-semibold text-white hover:bg-blue-600"
            >
              Subscribe
            </button>
          </div>
          <span id={`${id}-err`} className="min-h-3.5 text-xs text-[#f87171]">
            {err}
          </span>
        </>
      )}
    </form>
  );
}
