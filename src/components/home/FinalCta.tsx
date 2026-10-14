import Link from "next/link";
import { Button } from "@/components/ui/Button";

/** Homepage closing call to action: sky gradient box on a gray-50 band. */
export function FinalCta() {
  return (
    <section className="box-border bg-gray-50 px-8 pb-[88px] max-sm:px-5">
      <div
        className="mx-auto box-border flex max-w-page flex-wrap items-center justify-between gap-6 rounded-lg border border-blue-200 p-12 text-navy-800 max-sm:p-6"
        style={{ background: "linear-gradient(120deg, var(--color-blue-100) 0%, var(--color-blue-50) 55%, var(--color-cyan-50) 100%)" }}
      >
        <div className="flex flex-col gap-2">
          <h2 className="m-0 text-[32px] leading-[1.2] tracking-[-0.025em]">Your next issue, live in ten minutes.</h2>
          <span className="text-base text-slate-700">
            Upload the PDF you already have. First publication free for a month, no credit card.
          </span>
        </div>
        <div className="flex flex-col items-end gap-2 max-sm:items-start">
          <Button href="/signup" size="xl" glow>
            Upload a PDF, it&apos;s free
          </Button>
          <Link href="/enterprise" className="text-label text-slate-700 hover:text-slate-700">
            or book a 20-minute walkthrough
          </Link>
        </div>
      </div>
    </section>
  );
}
