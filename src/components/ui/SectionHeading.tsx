"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={clsx(
            "text-xs font-semibold uppercase tracking-[0.2em] mb-4",
            dark ? "text-amber" : "text-amber-ink"
          )}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className={clsx(
          "font-display text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.1] tracking-tight",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={clsx(
            "mt-5 text-base md:text-lg leading-relaxed",
            dark ? "text-white/60" : "text-muted"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
