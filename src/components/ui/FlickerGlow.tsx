"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

// Each ring's "active" window is shifted later in the shared cycle (baked
// into `times`, not `transition.delay` — delay only applies once on mount,
// not on every repeat, which would desync the ripple after the first loop).
const RINGS = [
  { inset: "-inset-0.5", opacity: 1, times: [0, 0.55, 0.6, 0.64, 0.68, 0.72, 0.76, 0.82, 1] },
  { inset: "-inset-1.5", opacity: 0.6, times: [0, 0.58, 0.63, 0.67, 0.71, 0.75, 0.79, 0.85, 1] },
  { inset: "-inset-2.5", opacity: 0.35, times: [0, 0.61, 0.66, 0.7, 0.74, 0.78, 0.82, 0.88, 1] },
];

export default function FlickerGlow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <span className={clsx("relative inline-flex rounded-full", className)}>
      {RINGS.map((ring, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={clsx(
            "pointer-events-none absolute rounded-full border-2 border-blue",
            ring.inset
          )}
          initial={{ opacity: 0 }}
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0, 0, ring.opacity, 0.1, ring.opacity, 0.1, ring.opacity, 0, 0] }
          }
          transition={{
            duration: 2.6,
            times: ring.times,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
        />
      ))}
      {children}
    </span>
  );
}
