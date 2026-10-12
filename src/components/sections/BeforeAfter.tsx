import type { ReactNode } from "react";
import type { IconName } from "@/components/icons";
import { IconTile } from "@/components/ui/IconTile";

const LABEL = "font-mono text-eyebrow font-semibold uppercase tracking-eyebrow";

type ColumnsProps = {
  variant?: "columns";
  beforeLabel?: string;
  beforeTitle: ReactNode;
  beforeIcon: IconName;
  beforeItems: ReactNode[];
  afterLabel?: string;
  afterTitle: ReactNode;
  afterIcon: IconName;
  afterItems: ReactNode[];
  className?: string;
};

type CardsProps = {
  variant: "cards";
  beforeLabel?: string;
  before: ReactNode;
  afterLabel?: string;
  after: ReactNode;
  className?: string;
};

export type BeforeAfterProps = ColumnsProps | CardsProps;

/**
 * Without / with FlipAndShare comparison.
 * `columns` (feature detail): two joined columns with ✕ / ✓ lists.
 * `cards` (customer stories): a compact white "Before" card beside a tinted "With FlipAndShare" card.
 */
export function BeforeAfter(props: BeforeAfterProps) {
  if (props.variant === "cards") {
    const { beforeLabel = "Before", before, afterLabel = "With FlipAndShare", after, className = "" } = props;
    return (
      <div className={`grid gap-3.5 ${className}`} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))" }}>
        <div className="flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-[22px]">
          <span className={`${LABEL} text-amber-700`}>{beforeLabel}</span>
          <span className="text-sm leading-[1.55] text-gray-600">{before}</span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-lg border border-blue-200 bg-blue-50 p-[22px]">
          <span className={`${LABEL} text-gray-500`}>{afterLabel}</span>
          <span className="text-sm leading-[1.55] text-navy-800">{after}</span>
        </div>
      </div>
    );
  }

  const {
    beforeLabel = "Without",
    beforeTitle,
    beforeIcon,
    beforeItems,
    afterLabel = "With FlipAndShare",
    afterTitle,
    afterIcon,
    afterItems,
    className = "",
  } = props;
  return (
    <div
      className={`grid overflow-hidden rounded-lg border border-gray-200 bg-white ${className}`}
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))" }}
    >
      <div className="flex flex-col gap-3 border-r border-gray-200 bg-slate-50 px-[30px] py-7">
        {/* Prototype uses gray-400 here; gray-500 keeps the label above 4.5:1. */}
        <span className={`${LABEL} text-gray-500`}>{beforeLabel}</span>
        <span className="flex items-center gap-2.5 text-body-lg leading-[1.3] font-bold text-gray-500">
          <IconTile name={beforeIcon} tone="gray" size={34} />
          {beforeTitle}
        </span>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {beforeItems.map((x, i) => (
            <li key={i} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-sm leading-[1.5] text-gray-500">
              <span aria-hidden="true" className="font-bold text-gray-300">
                ✕
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3 bg-white px-[30px] py-7">
        <span className={`${LABEL} text-gray-500`}>{afterLabel}</span>
        <span className="flex items-center gap-2.5 text-body-lg leading-[1.3] font-bold text-navy-800">
          <IconTile name={afterIcon} tone="sky" size={34} />
          {afterTitle}
        </span>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {afterItems.map((x, i) => (
            <li key={i} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-sm leading-[1.5] text-gray-700">
              <span aria-hidden="true" className="font-bold text-green-600">
                ✓
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
