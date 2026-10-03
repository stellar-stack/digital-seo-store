"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

// Real brand marks supplied directly — every tool in this row now has an
// official logo image, so there's no monogram/fallback path left to render.
const TOOLS = [
  { key: "search", src: "/images/home/google.png" },
  { key: "chatgpt", src: "/images/home/chatgpt.png" },
  { key: "googleAds", src: "/images/home/adwords.png" },
  { key: "meta", src: "/images/home/icons8-meta-94.png" },
  { key: "hubspot", src: "/images/home/icons8-hubspot-24.png" },
  { key: "semrush", src: "/images/home/semrush.png" },
  { key: "ahrefs", src: "/images/home/ahrefs-icon.png" },
  { key: "shopify", src: "/images/home/shopify.png" },
  { key: "wordpress", src: "/images/home/wordpress.png" },
  { key: "figma", src: "/images/home/figma.png" },
] as const;

const PER_SLIDE = 5;
const SLIDES = Array.from({ length: Math.ceil(TOOLS.length / PER_SLIDE) }, (_, i) =>
  TOOLS.slice(i * PER_SLIDE, i * PER_SLIDE + PER_SLIDE)
);
const INTERVAL_MS = 4000;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M10 3.5 5.5 8l4.5 4.5" : "M6 3.5 10.5 8 6 12.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ToolsStrip() {
  const t = useTranslations("home.tools");
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, paused, reduceMotion, count]);

  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <section className="border-t border-line bg-white section-y">
      <Container className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xs text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted lg:text-left"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={t("eyebrow")}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label={t("previous")}
                onClick={() => go(index - 1)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-blue/40 hover:text-blue sm:h-9 sm:w-9"
              >
                <Chevron direction="left" />
              </button>

              <div className="w-[14.5rem] overflow-hidden sm:w-[18rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-5 gap-2 sm:gap-3"
                  >
                    {SLIDES[index].map((tool) => (
                      <div
                        key={tool.key}
                        title={t(`items.${tool.key}`)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:h-12 sm:w-12"
                      >
                        <Image
                          src={tool.src}
                          alt={t(`items.${tool.key}`)}
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                aria-label={t("next")}
                onClick={() => go(index + 1)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-blue/40 hover:text-blue sm:h-9 sm:w-9"
              >
                <Chevron direction="right" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={t("slide", { n: i + 1 })}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={
                    i === index
                      ? "h-1.5 w-6 rounded-full bg-blue transition-all duration-500"
                      : "h-1.5 w-1.5 rounded-full bg-line transition-all duration-500 hover:bg-blue/50"
                  }
                />
              ))}
            </div>
          </div>

          <span className="text-sm text-muted">{t("andMore")}</span>
        </motion.div>
      </Container>
    </section>
  );
}
