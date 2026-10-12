import { PASTEL, type PastelTone } from "./RelatedCard";

export type VideoCardProps = {
  title: string;
  /** Topic label above the title (webinar TC colours: Ad sales amber, Production sky, Analytics green, Getting started violet). */
  topic: string;
  topicTone?: PastelTone;
  /** e.g. "Recorded Sep 18, 2026". */
  date: string;
  /** e.g. "42:10". */
  duration: string;
  cover?: string;
  onPlay: () => void;
  className?: string;
};

/** Webinar recording card: 16/9 thumbnail (cover under an ink gradient), play disc, duration, topic, title, date. */
export function VideoCard({ title, topic, topicTone = "sky", date, duration, cover, onPlay, className = "" }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={`flex w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-0 text-left transition-[transform,box-shadow] duration-300 ease-fas hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <span
        aria-hidden="true"
        className="relative flex aspect-video w-full items-center justify-center bg-ink-950 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(120deg, color-mix(in srgb, var(--color-ink-950) 85%, transparent), color-mix(in srgb, var(--color-ink-950) 35%, transparent))${cover ? `, url(${cover})` : ""}`,
        }}
      >
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/92 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[15px] border-y-transparent border-l-navy-800" />
        </span>
        <span className="absolute right-2.5 bottom-2.5 rounded-sm bg-black/60 px-[7px] py-[3px] font-mono text-caption font-semibold text-white">
          {duration}
        </span>
      </span>
      <span className="flex flex-col gap-1.5 px-[18px] pt-4 pb-[18px]">
        <span className={`text-eyebrow font-bold ${PASTEL[topicTone].text}`}>{topic}</span>
        <span className="text-base leading-[1.3] font-bold text-navy-800">{title}</span>
        <span className="text-label text-gray-500">
          {date}
          <span className="sr-only">, duration {duration}. Play recording</span>
        </span>
      </span>
    </button>
  );
}
