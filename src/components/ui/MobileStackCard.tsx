"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

/**
 * Mobile-only "stacked cards" wrapper (desktop renders children untouched,
 * inert — no transform, no overflow clip). Every wrapped section gets a
 * permanent rounded-top/overlap/shadow identity so the page reads as a deck
 * of cards, plus a one-time settle-into-place entrance as it scrolls into
 * view. Deliberately native-scroll-only: nothing here reads or writes
 * scrollTop, no sticky pin, no scroll-snap — whileInView just watches
 * intersection, so momentum is never touched and nothing can "get stuck."
 *
 * Pass round={false} for a section with its own internal `position: sticky`
 * descendant (e.g. ComparisonTable's sticky header) — clipping via
 * overflow-hidden here would break that sticky positioning, same class of
 * bug already hit and fixed once inside ComparisonTable itself.
 */
export default function MobileStackCard({
  children,
  round = true,
}: {
  children: ReactNode;
  round?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 56, scale: 0.94 } : false}
      whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "relative",
        isMobile && "-mt-6 shadow-[0_-24px_60px_-28px_rgba(10,14,26,0.35)]",
        isMobile && round && "overflow-hidden rounded-t-[28px]"
      )}
    >
      {children}
    </motion.div>
  );
}
