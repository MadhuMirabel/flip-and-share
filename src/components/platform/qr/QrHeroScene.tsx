import { PhoneFrame } from "@/components/mockups/DeviceFrames";
import { QrMatrix } from "@/components/mockups/QrMatrix";
import { COVERS } from "@/lib/covers";

/** Hero visual (prototype L953–957): a printed page with a QR code, an arrow and a phone scanning it. */
export function QrHeroScene() {
  return (
    <div
      role="img"
      aria-label="A printed page with a QR code and a phone scanning it"
      className="flex items-center justify-center gap-7 max-sm:gap-3.5"
    >
      <div aria-hidden="true" className="contents">
        <div
          className="relative h-[260px] w-[200px] -rotate-4 rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] max-[430px]:h-[170px] max-[430px]:w-[130px]"
          style={{ background: `var(--color-white) url(${JSON.stringify(COVERS[2])}) top/cover` }}
        >
          <div className="absolute right-3 bottom-3 rounded-sm shadow-[0_4px_12px_rgba(0,0,0,.3)]">
            <QrMatrix size={64} />
          </div>
        </div>
        <span className="text-[26px] text-teal-300">→</span>
        <PhoneFrame size="xs" screen="dark" shadow="dark" screenClassName="items-center justify-center">
          <QrMatrix size={96} />
          <span
            className="fas-motion absolute inset-x-[10%] top-[8%] h-0.5 bg-teal-300 shadow-[0_0_12px_2px_rgba(94,234,212,.8)]"
            style={{ animation: "fasMScan 2.6s infinite alternate", ["--scan-distance" as string]: "214px" }}
          />
          <span className="absolute bottom-3.5 text-[10px] font-semibold tracking-[.06em] text-teal-300">SCANNING…</span>
        </PhoneFrame>
      </div>
    </div>
  );
}
