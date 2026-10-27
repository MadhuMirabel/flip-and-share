"use client";

import { useId, useState } from "react";
import { ListRow } from "@/components/cards/ListRow";
import { PASTEL } from "@/components/cards/RelatedCard";
import { SelectableCard } from "@/components/cards/FeatureCard";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  POPULAR_SEARCHES,
  RESOURCES,
  RESOURCE_GOALS,
  TYPE_HREF,
  TYPE_TONE,
  searchResources,
} from "./data";

/**
 * Hero with search, search results, and the "What are you working on?" goal picker
 * (prototype L1775–1806). Client component: search and goal selection share state.
 */
export function ResourceHub() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [goal, setGoal] = useState(0);
  const listId = useId();
  const hits = searchResources(submitted);

  const run = (q: string) => {
    setValue(q);
    setSubmitted(q.trim());
  };

  const resultLabel = hits.length
    ? `${hits.length} result${hits.length === 1 ? "" : "s"} for “${submitted}”`
    : `No exact matches for “${submitted}”. Try one of the goals below, or contact support.`;

  return (
    <>
      <PageHero
        glow={HERO_GLOW.resources}
        eyebrow="RESOURCES"
        eyebrowColor={HERO_ACCENT.resources}
        title="Everything you need to get more from every issue."
        lead="Guides, templates, webinars and help, organised by what you are trying to do."
        padding="default"
      >
        <SearchInput
          variant="hero"
          label="Search resources"
          placeholder="How do I add a lead form?"
          buttonLabel="Search"
          value={value}
          onValueChange={setValue}
          onSearch={run}
          className="mt-1.5 max-w-[560px]!"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Popular searches">
          {POPULAR_SEARCHES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => run(q)}
              className="cursor-pointer rounded-full border border-white/25 bg-white/6 px-3 py-1.5 text-small text-blue-100 transition-colors duration-150 hover:bg-white/14"
            >
              {q}
            </button>
          ))}
        </div>
      </PageHero>

      <div role="status" aria-live="polite">
        {submitted && (
          <Section padding="none" paddingClassName="pt-[52px]">
            <div className="flex animate-[fasFade_.3s_ease-out_both] flex-col gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-[18px]">
              <span className="text-label font-bold text-gray-500">{resultLabel}</span>
              {hits.map((r) => (
                <ListRow
                  key={r.title}
                  variant="hit"
                  icon={r.icon}
                  tone={TYPE_TONE[r.type]}
                  title={r.title}
                  trailing={r.type}
                  href={TYPE_HREF[r.type]}
                />
              ))}
            </div>
          </Section>
        )}
      </div>

      <Section labelledBy="goals-title" padding="none" paddingClassName="pt-16" gap={22}>
        <SectionHeader eyebrow="START WITH YOUR GOAL" title="What are you working on?" size="xs" id="goals-title" />
        <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
          {RESOURCE_GOALS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06} className="flex">
              <SelectableCard
                icon={g.icon}
                title={g.title}
                description={g.description}
                footer={`${RESOURCES.filter((r) => r.goal === i).length} resources`}
                selected={goal === i}
                aria-controls={listId}
                onClick={() => setGoal(i)}
              />
            </Reveal>
          ))}
        </div>
        <div id={listId} aria-label={`${RESOURCE_GOALS[goal].title} resources`} className="flex flex-col rounded-lg border border-gray-200 bg-white p-2">
          {RESOURCES.filter((r) => r.goal === goal).map((r, i) => {
            const tone = PASTEL[TYPE_TONE[r.type]];
            return (
              <ListRow
                // Re-key per goal so the slide-in replays when the tab changes.
                key={`${goal}-${r.title}`}
                index={i}
                icon={r.icon}
                tone={TYPE_TONE[r.type]}
                title={r.title}
                meta={r.meta}
                href={TYPE_HREF[r.type]}
                trailing={
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${tone.bg} ${tone.text}`}>{r.type}</span>
                }
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
