import type { ReactNode } from "react";

/** Plain dark code panel (integrations embed snippet). Wraps by default; `wrap={false}` scrolls horizontally. */
export function CodeBlock({
  code,
  wrap = true,
  label,
  className = "",
}: {
  code: string;
  wrap?: boolean;
  /** Accessible name for the scroll region, e.g. "Embed code". */
  label?: string;
  className?: string;
}) {
  return (
    <pre
      tabIndex={wrap ? undefined : 0}
      aria-label={label}
      className={`m-0 rounded-lg bg-ink-950 px-5 py-[18px] font-mono text-[12.5px] leading-[1.7] text-blue-200 ${
        wrap ? "break-words whitespace-pre-wrap" : "overflow-x-auto whitespace-pre"
      } ${className}`}
    >
      <code>{code}</code>
    </pre>
  );
}

/** key = "value" request panel (Ad Manager). Lines fade in one by one. */
export function ConfigBlock({
  comment,
  entries,
  footer,
  stagger = 0.25,
  className = "",
}: {
  /** First line, rendered as a slate comment ("// ad request · page 12"). */
  comment?: string;
  entries: { key: string; value: string }[];
  /** Content under the code (token chips, status). */
  footer?: ReactNode;
  /** Seconds between lines. */
  stagger?: number;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-ink-950 p-[22px] font-mono text-label leading-[1.9] text-blue-200 shadow-panel ${className}`}>
      <pre className="m-0 font-[inherit] break-words whitespace-pre-wrap">
        <code>
          {comment && <span className="block text-slate-500">{comment}</span>}
          {entries.map((e, i) => (
            <span key={e.key} className="block" style={{ animation: `fasFade .4s ease-out ${i * stagger}s both` }}>
              <span className="text-violet-300">{e.key}</span>
              <span className="text-slate-500"> = </span>
              <span className="text-teal-300">&quot;{e.value}&quot;</span>
            </span>
          ))}
        </code>
      </pre>
      {footer && <div className="mt-3.5 flex flex-wrap items-center gap-2 font-sans text-xs">{footer}</div>}
    </div>
  );
}

export type TerminalLine = string | { text: string; tone?: "json" | "comment" | "text" };

const LINE = { json: "text-teal-300", comment: "text-slate-500", text: "text-blue-200" };

function lineTone(l: TerminalLine): keyof typeof LINE {
  if (typeof l !== "string") return l.tone ?? lineTone(l.text);
  const t = l.trim();
  if (t.startsWith("#") || t.startsWith("//")) return "comment";
  if (/^[{}[\]"]/.test(t)) return "json";
  return "text";
}

/** Dark window with traffic dots, filename and status pill (Enterprise API explorer). Change `key` to replay the line animation. */
export function TerminalWindow({
  filename,
  status,
  lines,
  className = "",
}: {
  filename: string;
  status?: string;
  /** Strings are auto-coloured: "#"/"//" comments slate, JSON teal, the rest blue-200. */
  lines: TerminalLine[];
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-lg bg-ink-950 shadow-panel ${className}`}>
      <div className="flex items-center gap-2.5 border-b border-white/8 px-3.5 py-2.5 text-xs text-slate-400">
        <span aria-hidden="true" className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[9px] w-[9px] rounded-full bg-slate-700" />
          ))}
        </span>
        <span className="truncate font-mono">{filename}</span>
        {status && (
          <span className="ml-auto flex-none rounded-full bg-green-500/15 px-2 py-0.5 text-eyebrow text-green-300">{status}</span>
        )}
      </div>
      <pre
        className="m-0 px-5 py-[18px] font-mono text-[12.5px] leading-[1.75] break-words whitespace-pre-wrap text-blue-200"
        style={{ animation: "fasFade .35s ease-out both" }}
      >
        <code>
          {lines.map((l, i) => (
            <span key={i} className={`block ${LINE[lineTone(l)]}`} style={{ animation: `fasFade .3s ease-out ${i * 0.05}s both` }}>
              {typeof l === "string" ? l : l.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
