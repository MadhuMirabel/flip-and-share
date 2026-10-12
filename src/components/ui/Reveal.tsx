"use client";

import {
  createContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/* ---------- Reduced motion ---------- */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the user asks for reduced motion. Always false during SSR and hydration. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/* ---------- Reveal ---------- */

/** `shown` of the nearest <Reveal>, or null outside one. CountUp waits on it. */
export const RevealContext = createContext<{ shown: boolean } | null>(null);

type RevealProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  as?: ElementType;
  /** Transition delay in seconds (stagger: i * .08). */
  delay?: number;
  /** Starting translateY in px. Prototype: 18 (default), 14 stats, 12 KPI tiles, 16 compare cards. */
  distance?: number;
  /** Opacity / transform duration in seconds (.7 default, .6 for stat blocks). */
  duration?: number;
  children: ReactNode;
};

/**
 * Scroll reveal (prototype `data-reveal`): fades and lifts its content in once it
 * enters the viewport. Child CSS animations stay paused until shown (globals.css).
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  distance = 18,
  duration = 0.7,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const shown = seen || reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Also reveal anything already scrolled past (anchor jumps, restored scroll).
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            setSeen(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  const motion: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translateY(${distance}px)`,
    transition: `opacity ${duration}s ease, transform ${duration}s ease`,
    transitionDelay: `${delay}s`,
  };

  return (
    <RevealContext.Provider value={{ shown }}>
      <Tag
        {...rest}
        ref={ref}
        data-reveal=""
        data-shown={shown ? "" : undefined}
        className={className}
        style={{ ...style, ...motion }}
      >
        {children}
      </Tag>
    </RevealContext.Provider>
  );
}
