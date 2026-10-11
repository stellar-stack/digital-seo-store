"use client";

import { useCallback, useEffect, useRef } from "react";
import { useHeaderHidden } from "@/components/providers/HeaderVisibility";

const HEADER_HEIGHT = 80;
const GAP = 32;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Keeps the sidebar in view for the whole article. When it fits the viewport it
 * pins below the header and glides up with it when the header hides. When it is
 * taller than the viewport it scrolls with the page only until its far edge is
 * in view, so every part of it stays reachable in both scroll directions.
 */
export default function StickySidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const headerHidden = useHeaderHidden();
  const hiddenRef = useRef(headerHidden);
  const top = useRef<number | null>(null);
  const lastY = useRef(0);
  // While the sidebar itself is changing size (e.g. the newsletter unfolding),
  // position changes ease rather than snap, even if the reader keeps scrolling.
  const settleUntil = useRef(0);

  const lastHeight = useRef(0);

  const apply = useCallback((revealBottom = false) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      el.style.top = "";
      el.style.transition = "";
      top.current = null;
      return;
    }
    const maxTop = (hiddenRef.current ? 0 : HEADER_HEIGHT) + GAP;
    const minTop = Math.min(maxTop, window.innerHeight - el.offsetHeight - GAP);
    const y = window.scrollY;
    const delta = y - lastY.current;
    lastY.current = y;

    // When the sidebar grows (the newsletter unfolding at the end of the
    // article), bring its new bottom edge into view straight away.
    const next = top.current === null ? maxTop : revealBottom ? minTop : top.current - delta;
    top.current = Math.min(maxTop, Math.max(minTop, next));

    // A sidebar that fits only moves when the header does, so it can animate;
    // a taller one tracks the scroll position directly.
    const settling = performance.now() < settleUntil.current;
    el.style.transition = minTop === maxTop || settling ? `top 0.5s ${EASE}` : "none";
    el.style.top = `${top.current}px`;
  }, []);

  useEffect(() => {
    hiddenRef.current = headerHidden;
    apply();
  }, [headerHidden, apply]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    lastY.current = window.scrollY;
    apply();
    lastHeight.current = el.offsetHeight;
    const observer = new ResizeObserver(() => {
      const grew = el.offsetHeight > lastHeight.current;
      lastHeight.current = el.offsetHeight;
      settleUntil.current = performance.now() + 600;
      apply(grew);
    });
    observer.observe(el);
    const onScroll = () => apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [apply]);

  return (
    <aside ref={ref} className={className}>
      {children}
    </aside>
  );
}
