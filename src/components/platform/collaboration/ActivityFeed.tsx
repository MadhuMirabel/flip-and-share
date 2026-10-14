import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Collab.module.css";
import { PEOPLE, TEAM_FEED } from "./data";

/** Activity log card with a bottom fade (prototype L911–915). */
export function ActivityFeed() {
  return (
    <Reveal className="relative flex max-h-[420px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-[22px]">
      <h3 className="m-0 mb-3 text-body font-bold text-navy-800">Activity · October 2026</h3>
      <ul className="m-0 flex list-none flex-col p-0">
        {TEAM_FEED.map(([k, what, when], i) => (
          <li
            key={i}
            className={`${styles.row} grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b border-gray-100 py-2.5`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <Avatar initials={PEOPLE[k].ini} color={PEOPLE[k].color} size={28} />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-menu text-gray-900">
                <b>{PEOPLE[k].name}</b> {what}
              </span>
              <span className="text-xs text-gray-500">{when}</span>
            </div>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px]" style={{ background: "linear-gradient(transparent, var(--color-white))" }} />
    </Reveal>
  );
}
