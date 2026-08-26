"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";

const OFFICE_KEYS = ["canada", "us", "india"] as const;

// Positioned west-to-east in real, correct order (Pacific Canada → US East →
// India) rather than plotted from actual lat/long — an honest, abstract
// "global spread" motif instead of a geographically precise (and, without a
// real map dataset, likely inaccurate-looking) world outline.
const PINS = [
  { key: "canada", left: "14%", top: "38%", align: "left" },
  { key: "us", left: "44%", top: "62%", align: "center" },
  { key: "india", left: "86%", top: "46%", align: "right" },
] as const;

// Coordinates live in the SVG's own viewBox space (840x320), chosen to match
// the map card's aspect-[21/8] exactly so viewBox pixels map 1:1 to on-screen
// pixels — no preserveAspectRatio letterboxing to keep in sync with the pin
// label divs, which are positioned independently via raw container percentages.
const ROUTE_PATH = "M117.6,122 Q243.6,40 369.6,198 Q546,270 722.4,147";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export default function OfficesStrip() {
  const t = useTranslations("contact.offices");
  const tAbout = useTranslations("about");
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-ink py-20 md:py-24">
      <Container>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-amber">
          {tAbout("officesEyebrow")}
        </p>

        {/* Desktop/tablet: abstract route map with the three real offices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden aspect-[21/8] overflow-hidden rounded-[28px] border border-white/10 bg-ink-soft md:block"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />

          <svg
            viewBox="0 0 840 320"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            <motion.path
              d={ROUTE_PATH}
              fill="none"
              stroke="rgba(245,166,35,0.4)"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            {PINS.map((p, i) => (
              <g key={p.key} transform={`translate(${(parseFloat(p.left) / 100) * 840}, ${(parseFloat(p.top) / 100) * 320})`}>
                {!reducedMotion && (
                  <motion.circle
                    r="6"
                    fill="rgba(245,166,35,0.35)"
                    initial={{ scale: 0.6, opacity: 0.6 }}
                    animate={{ scale: [0.6, 2.4], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 + i * 0.3 }}
                  />
                )}
                <circle r="5" fill="#f5a623" />
                <circle r="5" fill="none" stroke="#0a0e1a" strokeWidth="2" />
              </g>
            ))}
          </svg>

          {PINS.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              style={{ left: p.left, top: p.top }}
              className={clsx(
                "absolute w-40 translate-y-4",
                p.align === "left" && "text-left",
                p.align === "center" && "-translate-x-1/2 text-center",
                p.align === "right" && "-translate-x-full text-right"
              )}
            >
              <p className="font-display text-sm font-semibold text-white">{t(`${p.key}.label`)}</p>
              <p className="mt-0.5 text-xs leading-snug text-white/50">{t(`${p.key}.address`)}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: simple stacked list, no absolute-positioned map */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {OFFICE_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="flex items-start gap-3 border-t border-white/10 pt-6"
            >
              <span className="mt-0.5 text-amber">
                <PinIcon />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-white">
                  {t(`${key}.label`)}
                </p>
                <p className="mt-1 text-sm text-white/50">{t(`${key}.address`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
