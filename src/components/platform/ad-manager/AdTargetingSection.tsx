import { SectionHeader } from "@/components/sections/SectionHeader";
import { ConfigBlock } from "@/components/ui/CodeBlock";
import { Reveal } from "@/components/ui/Reveal";

const KV = [
  { key: "issue", value: "oct-2026" },
  { key: "folio", value: "features" },
  { key: "page", value: "12" },
  { key: "advertiser", value: "harbour-motors" },
  { key: "floor", value: "$4.50" },
];

// No indigo token in the palette: these tints are the prototype's rgba values.
const CHIP = "rounded-sm px-2.5 py-1.5 font-mono text-xs";

/** 03 · TARGETING: the key-value ad request with token chips (prototype L1055-1062). */
export function AdTargetingSection() {
  return (
    <section
      aria-labelledby="adm-targeting-title"
      className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12 px-8 py-20 max-sm:px-5"
    >
      <SectionHeader
        id="adm-targeting-title"
        number="03"
        eyebrow="TARGETING"
        title="The plan travels with every ad request."
        lead="Issue, folio and page go out as key-values automatically. An advertiser key keeps competitors off facing pages, and yield rules set price floors for unsold space."
        size="xs"
        maxWidth={9999}
      />
      <Reveal>
        <ConfigBlock
          comment="// ad request · page 12"
          entries={KV}
          stagger={0.25}
          footer={
            <>
              <span className={`${CHIP} bg-[rgba(99,102,241,.2)] text-violet-200`}>p12 · Harbour Motors</span>
              <span className="font-mono text-xs text-red-400">✕ blocked on p13</span>
              <span className={`${CHIP} bg-[rgba(248,113,113,.15)] text-red-200`}>Bay Auto</span>
            </>
          }
        />
      </Reveal>
    </section>
  );
}
