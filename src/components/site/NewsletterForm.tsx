"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function NewsletterForm() {
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

  if (done) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-white">Get publishing tips once a month</span>
        <span role="status" className="text-sm font-semibold text-green-300">
          ✓ You&apos;re subscribed.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <Field
        tone="dark"
        label="Get publishing tips once a month"
        type="email"
        autoComplete="email"
        placeholder="you@publisher.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={err}
        action={
          <Button type="submit" radius="md">
            Subscribe
          </Button>
        }
      />
    </form>
  );
}
