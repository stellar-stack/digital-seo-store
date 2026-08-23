"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  dark = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <p
        className={`font-display text-4xl md:text-5xl font-semibold tabular-nums ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {prefix}
        {display}
        {suffix}
      </p>
      <p className={`mt-2 text-sm ${dark ? "text-white/50" : "text-muted"}`}>{label}</p>
    </div>
  );
}
