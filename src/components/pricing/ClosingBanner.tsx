import { Button } from "@/components/ui/Button";

/** Pricing's own closing banner: radial glow instead of the art, and two buttons (prototype L2110). */
export function ClosingBanner() {
  return (
    <section aria-labelledby="pricing-cta" className="px-8 pb-20 pt-[72px] max-sm:px-5">
      <div className="relative mx-auto box-border flex max-w-page flex-wrap items-center justify-between gap-6 overflow-hidden rounded-lg border border-blue-200 bg-[linear-gradient(120deg,var(--color-blue-100)_0%,var(--color-blue-50)_55%,var(--color-cyan-50)_100%)] p-12 text-navy-800 max-sm:p-6">
        <span
          aria-hidden="true"
          className="absolute -bottom-[120px] -left-[60px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.25),transparent_70%)]"
        />
        <div className="relative flex flex-col gap-2">
          <h2 id="pricing-cta" className="m-0 text-[clamp(24px,3vw,32px)] font-bold tracking-[-.025em]">
            Not sure which plan? Start free and upgrade from inside the app.
          </h2>
          <span className="text-body text-slate-700">
            Your first publication is live in minutes. Nothing to install, no card to enter.
          </span>
        </div>
        <div className="relative flex flex-wrap gap-2.5">
          <Button href="/signup" size="xl" glow>
            Create for Free
          </Button>
          <Button href="/demo" size="xl" variant="light">
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
