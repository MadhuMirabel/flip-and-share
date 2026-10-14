import { INTEGRATIONS } from "@/components/cards/integrations-data";

/**
 * Hero visual (prototype L1912–1916): the F&S tile with eight tool logos on an ellipse around it.
 * Each logo pops in (staggered .2s + k·.08s) and then drifts gently. The prototype animated `transform` on the
 * same element it centred with `translate(-50%,-50%)`, which shifted every logo by half its size; here the
 * centring uses the independent `translate` property and the motion lives on an inner element.
 */
const ORBIT = INTEGRATIONS.slice(0, 8);

export function IntegrationOrbit() {
  return (
    <div
      role="img"
      aria-label={`FlipAndShare connected to ${ORBIT.map((o) => o.name).join(", ")}`}
      className="relative h-[280px]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-[2] flex h-[84px] w-[84px] items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-blue-500),var(--color-blue-300))] text-[15px] font-extrabold text-white shadow-[0_0_0_12px_rgba(14,165,233,.15),0_0_0_28px_rgba(14,165,233,.07)]"
        style={{ translate: "-50% -50%" }}
      >
        F&amp;S
      </div>
      {ORBIT.map((o, k) => {
        const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={o.name}
            aria-hidden="true"
            className="absolute"
            style={{ left: `${50 + Math.cos(a) * 38}%`, top: `${50 + Math.sin(a) * 40}%`, translate: "-50% -50%" }}
          >
            <span
              className="fas-motion flex h-[46px] w-[46px] items-center justify-center rounded-lg text-xs font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,.5)]"
              style={{
                background: o.brand,
                animation: `fasPop .6s cubic-bezier(.34,1.56,.64,1) ${k * 0.08 + 0.2}s both, fasMFloat ${5 + (k % 3)}s cubic-bezier(.45,0,.55,1) ${k * 0.08 + 0.9}s infinite`,
              }}
            >
              {o.initials}
            </span>
          </span>
        );
      })}
    </div>
  );
}
