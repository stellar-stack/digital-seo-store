"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { scrollToTop } from "@/components/providers/SmoothScroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.85 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reducedMotion ? undefined : { scale: 1.08 }}
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
          className="fixed bottom-6 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/90 text-charcoal shadow-lg shadow-ink/10 backdrop-blur-md md:bottom-9 md:right-6 md:h-12 md:w-12"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 md:h-5 md:w-5" fill="none">
            <path
              d="M10 15V5M10 5L5 10M10 5l5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
