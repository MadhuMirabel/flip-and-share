import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Collab.module.css";
import { PEOPLE, ROLE_HEADS, ROLE_ROWS } from "./data";

const MARK = {
  1: { glyph: "✓", label: "Allowed", cls: "text-green-600" },
  2: { glyph: "own", label: "Own items only", cls: "text-blue-600" },
  0: { glyph: "–", label: "Not allowed", cls: "text-gray-300" },
} as const;

/** Role permission table (prototype `PermissionMatrix`, L902–905). */
export function PermissionMatrix() {
  return (
    <Reveal className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <caption className="sr-only">Permissions by role</caption>
        <colgroup>
          <col style={{ width: "22%" }} />
          {ROLE_HEADS.map((k) => (
            <col key={k} style={{ width: "15.6%" }} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-gray-200 bg-slate-50">
            <th scope="col" className="px-[18px] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500">
              PERMISSION
            </th>
            {ROLE_HEADS.map((k) => (
              <th key={k} scope="col" className="px-2 py-3 font-normal">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <Avatar initials={PEOPLE[k].ini} color={PEOPLE[k].color} size={30} />
                  <span className="text-small font-bold text-navy-800">{PEOPLE[k].role}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLE_ROWS.map(([name, ...cells], i) => (
            <tr
              key={name}
              className={`${styles.row} border-b border-gray-100 transition-colors duration-150 last:border-b-0 hover:bg-slate-50`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <th scope="row" className="px-[18px] py-3 text-menu font-normal text-gray-700">
                {name}
              </th>
              {cells.map((v, j) => (
                <td key={j} className={`px-2 py-3 text-center text-label font-bold ${MARK[v].cls}`}>
                  <span aria-hidden="true">{MARK[v].glyph}</span>
                  <span className="sr-only">{MARK[v].label}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
