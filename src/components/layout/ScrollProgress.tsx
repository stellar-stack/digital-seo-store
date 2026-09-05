"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Right-edge scroll-progress rail, present at every viewport width. Purely
 * reads scroll position (framer-motion's useScroll, a passive listener) and
 * never writes it — same "never fight native scroll" rule as MobileStackCard.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.4,
  });
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const check = () => {
      setScrollable(document.documentElement.scrollHeight - window.innerHeight > 240);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [pathname]);

  if (!scrollable) return null;

  return (
    <div
      aria-hidden
      className="fixed right-3 top-1/2 z-30 flex -translate-y-1/2 items-center rounded-full border border-line bg-white/90 p-[7px] shadow-lg shadow-ink/10 backdrop-blur-md md:right-6"
    >
      <div className="relative h-24 w-[3px] overflow-hidden rounded-full bg-line md:h-32">
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-blue"
          style={{ scaleY: progress }}
        />
      </div>
    </div>
  );
}
