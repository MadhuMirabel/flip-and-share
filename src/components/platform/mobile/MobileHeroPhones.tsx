import { PhoneFrame } from "@/components/mockups/DeviceFrames";
import { COVERS, SAMPLE_PAGES } from "@/lib/covers";

const bg = (src: string) => ({ background: `var(--color-white) url(${JSON.stringify(src)}) top/cover` });

/** Hero visual (prototype `PhoneDuo`, L716–719): a back phone with a cover and a front phone reading offline. */
export function MobileHeroPhones() {
  return (
    <div
      role="img"
      aria-label="Two phones: one showing a magazine cover, one reading an issue offline, pages 8 to 9"
      className="relative flex min-h-[420px] max-w-full items-end justify-center overflow-hidden px-3"
    >
      <div aria-hidden="true" className="contents">
        <div className="relative top-10 z-[1] -mr-6 flex-none -rotate-6">
          <PhoneFrame size="md">
            <div className="flex-1" style={bg(COVERS[0])} />
          </PhoneFrame>
        </div>
        <div className="relative z-[2] flex-none translate-y-[60px]">
          <PhoneFrame size="lg">
            <div className="flex flex-1 flex-col gap-2 px-3.5 pt-[34px]">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Pages 8–9</span>
                <span>Offline · saved</span>
              </div>
              <div className="flex flex-1 overflow-hidden rounded-sm shadow-[0_20px_40px_-20px_rgba(0,0,0,.5)]">
                <div className="flex-1" style={bg(SAMPLE_PAGES.page22)} />
                <div className="flex-1 border-l border-black/10" style={bg(SAMPLE_PAGES.page8)} />
              </div>
              <div className="flex items-center gap-1 pt-3 pb-[18px]">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i} className={`h-1 flex-1 rounded-sm ${i < 4 ? "bg-blue-500" : "bg-gray-200"}`} />
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
