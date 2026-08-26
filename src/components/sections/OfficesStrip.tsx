"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import officeMap from "@/config/office-map.json";

const OFFICE_KEYS = ["canada", "us", "india"] as const;

const { width: MAP_W, height: MAP_H, dotRadius, dots, pins } = officeMap;

function pinAlign(x: number): "left" | "center" | "right" {
  const ratio = x / MAP_W;
  if (ratio < 0.22) return "left";
  if (ratio > 0.78) return "right";
  return "center";
}

// Canada and the US sit close together at this map scale, so their label
// cards would otherwise overlap — pin Canada's label above its dot instead.
const LABEL_SIDE: Record<(typeof OFFICE_KEYS)[number], "top" | "bottom"> = {
  canada: "top",
  us: "bottom",
  india: "bottom",
};

export default function OfficesStrip() {
  const t = useTranslations("contact.offices");
  const tAbout = useTranslations("about");
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-cream py-20 md:py-24">
      <Container>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-amber-ink">
          {tAbout("officesEyebrow")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[980/460] w-full max-w-4xl"
        >
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {dots.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={dotRadius} fill="#d9d5c9" />
            ))}
            {Object.values(pins).map(([x, y], i) => (
              <g key={i}>
                {!reducedMotion && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="rgba(180,83,9,0.3)"
                    initial={{ scale: 0.6, opacity: 0.6 }}
                    animate={{ scale: [0.6, 2.4], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 + i * 0.3 }}
                  />
                )}
                <circle cx={x} cy={y} r="4.5" fill="#f5a623" />
                <circle cx={x} cy={y} r="4.5" fill="none" stroke="#faf9f6" strokeWidth="1.5" />
              </g>
            ))}
          </svg>

          {OFFICE_KEYS.map((key, i) => {
            const [x, y] = pins[key];
            const align = pinAlign(x);
            const side = LABEL_SIDE[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
                className={clsx(
                  "absolute w-28 sm:w-36",
                  side === "bottom" && "translate-y-3",
                  side === "top" && "-translate-y-[calc(100%+10px)]",
                  align === "left" && "text-left",
                  align === "center" && "-translate-x-1/2 text-center",
                  align === "right" && "-translate-x-full text-right"
                )}
              >
                <div className="inline-block rounded-lg border border-line bg-white px-2 py-1.5 shadow-sm sm:px-2.5 sm:py-2">
                  <p className="font-display text-[0.65rem] font-semibold leading-tight text-ink sm:text-xs">
                    {t(`${key}.label`)}
                  </p>
                  <p className="mt-0.5 text-[0.6rem] leading-snug text-muted sm:text-[0.7rem]">
                    {t(`${key}.address`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
