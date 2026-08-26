"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import officeMap from "@/config/office-map.json";

const OFFICE_KEYS = ["canada", "us", "india"] as const;

const { width: MAP_W, height: MAP_H, dotRadius, dots, highlightDots, pins } = officeMap;

function pinAlign(x: number): "left" | "center" | "right" {
  const ratio = x / MAP_W;
  if (ratio < 0.22) return "left";
  if (ratio > 0.78) return "right";
  return "center";
}

// Only one popup is ever open at a time (hover/tap), so pins no longer need
// alternating sides to avoid colliding with each other. All open upward:
// on mobile, sections render inside an overflow-hidden stacked card, and a
// downward popup near the bottom of the map gets clipped by that boundary.
const LABEL_SIDE: Record<(typeof OFFICE_KEYS)[number], "top" | "bottom"> = {
  canada: "top",
  us: "top",
  india: "top",
};

export default function OfficesStrip() {
  const t = useTranslations("contact.offices");
  const tAbout = useTranslations("about");
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-cream py-20 md:py-24">
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-amber-ink">
          {tAbout("officesEyebrow")}
        </p>

        <div className="mx-auto mb-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {OFFICE_KEYS.map((key) => (
            <div key={key} className="border-t-2 border-amber pt-4 text-center sm:text-left">
              <p className="font-display text-sm font-semibold text-ink">{t(`${key}.label`)}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t(`${key}.address`)}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-4xl"
          style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
          onClick={() => setActive(null)}
        >
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {dots.map(([x, y], i) => (
              <circle key={`d${i}`} cx={x} cy={y} r={dotRadius} fill="#ddd9cc" />
            ))}
            {highlightDots.map(([x, y], i) => (
              <circle key={`h${i}`} cx={x} cy={y} r={dotRadius * 1.35} fill="#f5a623" fillOpacity={0.6} />
            ))}
          </svg>

          {OFFICE_KEYS.map((key, i) => {
            const [x, y] = pins[key];
            const align = pinAlign(x);
            const side = LABEL_SIDE[key];
            const isActive = active === key;
            return (
              <div
                key={key}
                className="absolute"
                style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
              >
                <button
                  type="button"
                  aria-label={`${t(`${key}.label`)}: ${t(`${key}.address`)}`}
                  onMouseEnter={() => setActive(key)}
                  onMouseLeave={() => setActive((cur) => (cur === key ? null : cur))}
                  onFocus={() => setActive(key)}
                  onBlur={() => setActive((cur) => (cur === key ? null : cur))}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(key);
                  }}
                  className="relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                  {!reducedMotion && (
                    <motion.span
                      aria-hidden
                      className="absolute inline-block h-2.5 w-2.5 rounded-full bg-amber-ink/40"
                      animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                    />
                  )}
                  <span
                    aria-hidden
                    className="relative h-2.5 w-2.5 rounded-full border-2 border-cream bg-amber-ink shadow-sm"
                  />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: side === "bottom" ? -6 : 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: side === "bottom" ? -6 : 6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className={clsx(
                        "pointer-events-none absolute z-10 w-40",
                        side === "bottom" && "top-full mt-2",
                        side === "top" && "bottom-full mb-2",
                        align === "left" && "left-0",
                        align === "center" && "left-1/2 -translate-x-1/2",
                        align === "right" && "right-0"
                      )}
                    >
                      <div className="rounded-lg border border-line bg-white px-3 py-2 shadow-lg">
                        <p className="font-display text-xs font-semibold text-ink">{t(`${key}.label`)}</p>
                        <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{t(`${key}.address`)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
