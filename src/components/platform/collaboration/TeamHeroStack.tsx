import { Avatar } from "@/components/ui/Avatar";
import styles from "./Collab.module.css";
import { HERO_PEOPLE } from "./data";

/** Hero avatar stack with a presence dot on every avatar (prototype L870). */
export function TeamHeroStack() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-y-3">
      <div role="img" aria-label="Priya, Mark, Dana, Jon and Ana are online" className="flex items-center">
        {HERO_PEOPLE.map((p, i) => (
          <span
            key={p.ini}
            aria-hidden="true"
            className={`fas-motion ${styles.avatar} relative inline-flex`}
            style={{ marginLeft: i === 0 ? 0 : -14, animationDelay: `${i * 0.12}s` }}
          >
            <Avatar initials={p.ini} color={p.color} size={56} ring="ink" />
            <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-ink-950 bg-green-500" />
          </span>
        ))}
      </div>
      <span className="ml-3.5 text-sm text-blue-200">
        5 people in <b className="text-white">October 2026</b> right now
      </span>
    </div>
  );
}
