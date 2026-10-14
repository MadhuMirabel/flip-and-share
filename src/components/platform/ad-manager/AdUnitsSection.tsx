import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProgressBar } from "@/components/ui/Progress";
import { Reveal } from "@/components/ui/Reveal";

const UNITS = [
  { place: "Cover sponsorship", unit: "/fas/oc/cover_spon", linked: true },
  { place: "Right rail · spread", unit: "/fas/oc/rail_300x600", linked: true },
  { place: "Interstitial · p20", unit: "/fas/oc/interstitial", linked: true },
  { place: "Back cover", unit: "Not linked", linked: false },
];

const EXPO = "cubic-bezier(.22,1,.36,1)";

/** 01 · AD UNITS: placements mapped to Google ad units, plus the inventory forecast (prototype L1038-1044). */
export function AdUnitsSection() {
  return (
    <section
      aria-labelledby="adm-units-title"
      className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12 px-8 py-20 max-sm:px-5"
    >
      <SectionHeader
        id="adm-units-title"
        number="01"
        eyebrow="AD UNITS"
        title="Every placement mapped to inventory."
        lead="Cover sponsorship, right rail, interstitial: each digital placement links to one Google ad unit. Auto-link by name or one at a time. The forecast shows booked against available so sales never oversells."
        size="xs"
        maxWidth={9999}
      />
      <Reveal className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[22px]">
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {UNITS.map((u, i) => (
            <li
              key={u.place}
              className="fas-motion grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-center gap-2"
              style={{ animation: `fasFade .6s ${EXPO} ${i * 0.15}s both` }}
            >
              <span className="truncate rounded-md border border-blue-200 bg-blue-50 px-[11px] py-[9px] text-label font-semibold text-navy-700">
                {u.place}
              </span>
              <span
                aria-hidden="true"
                className={`fas-motion h-0.5 origin-left ${u.linked ? "bg-violet-500" : "bg-gray-200"}`}
                style={{ animation: `fasGrowX .9s ${EXPO} ${i * 0.15 + 0.2}s both` }}
              />
              <span
                className={`truncate rounded-md border px-[11px] py-[9px] font-mono text-small ${
                  u.linked ? "border-violet-200 bg-violet-100 text-violet-700" : "border-gray-200 bg-white text-gray-400"
                }`}
              >
                {u.unit}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex justify-between gap-3 text-small text-gray-500">
            <span>Inventory forecast · October</span>
            <span>
              <b className="text-navy-800">1.42M</b> booked of 2.1M
            </span>
          </div>
          <ProgressBar value={68} height={12} color="var(--color-violet-500)" duration={1.2} delay={0.4} label="October inventory booked" />
        </div>
      </Reveal>
    </section>
  );
}
