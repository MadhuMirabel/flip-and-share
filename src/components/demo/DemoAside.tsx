import { DEMO_EXPECT } from "@/components/demo/data";
import { ContactLinkCards } from "@/components/sections/Contact";
import { Button } from "@/components/ui/Button";

/** Right column beside the booking card (prototype L1559-1571): agenda, talk-now links, free-account nudge. */
export function DemoAside() {
  return (
    <div className="flex flex-col gap-[18px]">
      <section aria-labelledby="demo-expect" className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
        <h2 id="demo-expect" className="m-0 text-base font-bold text-navy-800">
          What to expect
        </h2>
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {DEMO_EXPECT.map((x, i) => (
            <li key={x.title} className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3">
              <span aria-hidden="true" className={`flex h-8 w-8 items-center justify-center rounded-full text-label font-bold ${x.tone}`}>
                {i + 1}
              </span>
              <span className="flex flex-col gap-[3px]">
                <span className="flex flex-wrap items-baseline gap-2">
                  <span className="text-body-sm font-bold text-gray-900">{x.title}</span>
                  <span className="font-mono text-eyebrow font-semibold text-gray-500">{x.time}</span>
                </span>
                <span className="text-menu leading-normal text-gray-600">{x.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <ContactLinkCards titleAs="h2" />

      <section aria-labelledby="demo-try" className="flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white px-6 py-5">
        <h2 id="demo-try" className="m-0 text-sm font-bold text-navy-800">
          Just want to try it?
        </h2>
        <p className="m-0 text-menu leading-normal text-gray-600">
          Free account, no credit card. Free plan includes 1 publication for the first month.
        </p>
        <Button href="/signup" variant="text" iconRight="arrow" className="mt-1 self-start">
          Create a free account
        </Button>
      </section>
    </div>
  );
}
