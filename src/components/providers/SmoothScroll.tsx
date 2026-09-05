"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function scrollToTop() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

// Named "SmoothScroll" for historical reasons (it used to own the Lenis
// smooth-scroll instance) — now just registers ScrollTrigger, which the
// pinned scroll sequences (Hero, ProcessSteps) need, and otherwise gets out
// of the way of the browser's own native scroll on every device.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
