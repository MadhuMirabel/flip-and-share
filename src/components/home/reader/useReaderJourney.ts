"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { usePrefersReducedMotion } from "@/components/ui/Reveal";
import { END, FRAMES, PRELOAD_URLS, STATIC_K, STEP_START } from "./timeline";

/**
 * Timeline player for the reader demo. One timeout at a time, scheduled only while the demo is playing,
 * on screen and the tab is visible, so nothing updates off-screen. Pausing stops autoplay completely;
 * jumping to a step never resumes it.
 */
export function useReaderJourney() {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const preloaded = useRef<HTMLImageElement[] | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  // Reduced motion: no autoplay, a static dashboard frame until a step is picked.
  const k = picked ?? (reduced ? STATIC_K : 0);
  const playing = !userPaused && !reduced;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !preloaded.current) {
          // Warm the cache so page flips never flash an empty page.
          preloaded.current = PRELOAD_URLS.map((src) => Object.assign(new Image(), { src }));
        }
        setInView(e.isIntersecting && e.intersectionRatio >= 0.25);
      },
      { threshold: [0, 0.25] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!playing || !inView || hovering || tabHidden) return;
    const next = k + 1;
    const id = window.setTimeout(() => setPicked(next >= END ? 0 : next), FRAMES[next].t - FRAMES[k].t);
    return () => window.clearTimeout(id);
  }, [k, playing, inView, hovering, tabHidden]);

  const goToStep = useCallback((i: number) => setPicked(STEP_START[i]), []);
  const toggle = useCallback(() => setUserPaused((p) => !p), []);
  const onPointerEnter = useCallback((e: PointerEvent) => {
    if (e.pointerType === "mouse") setHovering(true);
  }, []);
  const onPointerLeave = useCallback(() => setHovering(false), []);

  return { k, playing, reduced, stageRef, goToStep, toggle, onPointerEnter, onPointerLeave };
}
