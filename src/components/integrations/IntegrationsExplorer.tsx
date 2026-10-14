"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  IntegrationCard,
  type ConnectState,
} from "@/components/cards/IntegrationCard";
import { useToast } from "@/components/site/Providers";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Reveal } from "@/components/ui/Reveal";
import { SearchInput } from "@/components/ui/SearchInput";

/** Category filter + search + expandable cards (prototype L1918–1922). "Connect" is a demo toggle until real OAuth exists. */
export function IntegrationsExplorer() {
  const toast = useToast();
  const router = useRouter();
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTEGRATIONS.filter(
      (i) => (cat === "All" || i.category === cat) && (!q || (i.name + i.description).toLowerCase().includes(q)),
    );
  }, [cat, query]);

  const stateOf = (name: string, tag: string): ConnectState =>
    connected[name] ? "connected" : tag === "Business" ? "business" : "connect";

  return (
    <section aria-label="All integrations" className="mx-auto flex max-w-page flex-col gap-[22px] px-8 pt-[72px] max-sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ChipGroup
          label="Filter by category"
          tone="navy"
          size="md"
          items={INTEGRATION_CATEGORIES.map((c) => ({ value: c, label: c }))}
          value={cat}
          onChange={setCat}
        />
        <SearchInput variant="toolbar" label="Search integrations" placeholder="Search integrations" value={query} onValueChange={setQuery} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(270px,100%),1fr))] gap-4" aria-live="polite">
        {list.map((i, k) => (
          <Reveal key={i.name} delay={k * 0.03} className="flex">
            <IntegrationCard
              {...i}
              className="w-full"
              open={open === i.name}
              onOpenChange={(next) => setOpen(next ? i.name : null)}
              connectState={stateOf(i.name, i.tag)}
              onConnect={() => {
                if (i.tag === "Business") {
                  router.push("/pricing");
                  return;
                }
                const now = !connected[i.name];
                setConnected((c) => ({ ...c, [i.name]: now }));
                if (now) toast(`${i.name} connected (demo).`, "success");
              }}
            />
          </Reveal>
        ))}
      </div>

      {list.length === 0 && (
        <div role="status" className="p-10 text-center text-gray-500">
          No integrations match. Our API and Zapier connect almost anything else.
        </div>
      )}
    </section>
  );
}
