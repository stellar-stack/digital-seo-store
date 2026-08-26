"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  dark = false,
  icon,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  dark?: boolean;
  icon?: React.ReactNode;
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
      {icon && (
        <span
          className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg [&_svg]:h-5 [&_svg]:w-5 ${
            dark ? "bg-white/10 text-amber" : "bg-mist text-amber-dark"
          }`}
        >
          {icon}
        </span>
      )}
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
