import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

/* Prototype `mbPlans`. */
const PLANS = [
  {
    ini: "F&S",
    name: "FlipAndShare reader app",
    tier: "Included on every plan",
    desc: "Your published issues appear in the shared reader app under your publisher profile. Readers follow your title and get new-issue notifications.",
    items: ["iOS, Android and installable web app", "Offline download for every issue", "Follow a title, get notified", "Your branding on every page"],
    iconBg: "linear-gradient(135deg, var(--color-navy-800), var(--color-blue-400))",
    highlighted: false,
  },
  {
    ini: "OC",
    name: "Your branded app",
    tier: "Business plan",
    desc: "Your icon, your name on the App Store and Google Play, only your titles inside. We build, submit and keep it updated; you publish as usual.",
    items: ["Your name and icon in both stores", "Push notifications from your account", "In-app subscriptions and paywall", "Store reviews and installs in analytics"],
    iconBg: "linear-gradient(135deg, var(--color-orange-500), var(--color-amber-400))",
    highlighted: true,
  },
];

/** "Two ways to ship" band (prototype `AppPlanCards`, L745–752). */
export function AppPlanCards() {
  return (
    <section aria-labelledby="plans-title" className="border-y border-gray-200 bg-slate-50 px-8 py-20 max-sm:px-5">
      <div className="mx-auto flex max-w-page flex-col gap-7">
        <SectionHeader id="plans-title" eyebrow="TWO WAYS TO SHIP" title="Your own app on the stores, or your issues in ours." />
        <div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="flex">
              <Card padding="lg" className={`w-full gap-3.5! ${p.highlighted ? "border-blue-500!" : ""}`}>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-none items-center justify-center rounded-lg text-[15px] font-extrabold text-white"
                    style={{ background: p.iconBg }}
                  >
                    {p.ini}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="m-0 text-lg font-bold text-navy-800">{p.name}</h3>
                    <span className="text-small text-gray-500">{p.tier}</span>
                  </div>
                </div>
                <p className="m-0 text-body-sm leading-[1.55] text-gray-600">{p.desc}</p>
                <CheckList items={p.items} size="sm" />
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
