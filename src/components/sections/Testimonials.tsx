"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const TESTIMONIALS = [
  { key: "ireland", photo: "/images/testimonials/ireland.jpg", hasName: true },
  { key: "usaLegal", photo: "/images/testimonials/usa-legal.jpg", hasName: true },
  { key: "californiaEcommerce", photo: "/images/testimonials/california-ecommerce.jpg", hasName: true },
  { key: "canada", photo: "/images/testimonials/canada.jpg", hasName: true },
  { key: "india", photo: "/images/testimonials/india.jpg", hasName: false },
  { key: "australia", photo: "/images/testimonials/india-ioi.jpg", hasName: true },
  { key: "newZealand", photo: "/images/testimonials/new-zealand.jpg", hasName: true },
] as const;

const INTERVAL_MS = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Testimonials() {
  const t = useTranslations("home.testimonials");
  const reduceMotion = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = (d: number) => setState(([i]) => [(i + d + count) % count, d]);
  const goTo = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setTimeout(() => setState(([i]) => [(i + 1) % count, 1]), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduceMotion, count]);

  const item = TESTIMONIALS[index];

  const renderBody = (tm: (typeof TESTIMONIALS)[number]) => (
    <>
                  <svg viewBox="0 0 32 24" className="h-6 w-8 text-blue/25" fill="currentColor" aria-hidden>
                    <path d="M0 24V14.4C0 6.4 4.8 1.3 12 0l1.4 3.2C9.2 4.6 7 7.5 6.8 11.2H12V24H0Zm19.6 0V14.4c0-8 4.8-13.1 12-14.4L33 3.2c-4.2 1.4-6.4 4.3-6.6 8H31.6V24H19.6Z" />
                  </svg>

                  <blockquote className="mt-6 max-w-3xl font-display text-lg leading-relaxed text-ink sm:text-xl md:text-[1.4rem] md:leading-[1.6]">
                    {t(`items.${tm.key}.quote`)}
                  </blockquote>

                  <figcaption className="mt-8 flex flex-col items-center gap-3 md:mt-10 md:flex-row md:gap-4 md:text-left">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-cream">
                      <Image
                        src={tm.photo}
                        alt={tm.hasName ? t(`items.${tm.key}.name`) : t(`items.${tm.key}.role`)}
                        fill
                        sizes="64px"
                        className="object-cover object-[50%_30%]"
                      />
                    </span>
                    <span>
                      {tm.hasName && (
                        <span className="block font-display text-base font-semibold text-ink">{t(`items.${tm.key}.name`)}</span>
                      )}
                      <span className={clsx("block text-sm", tm.hasName ? "text-charcoal/80" : "font-display text-base font-semibold text-ink")}>
                        {t(`items.${tm.key}.role`)}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        <span aria-hidden className="mr-1.5">{t(`items.${tm.key}.flag`)}</span>
                        {t(`items.${tm.key}.company`)}
                      </span>
                    </span>
                  </figcaption>
    </>
  );

  const figureClass =
    "flex flex-col items-center px-6 py-10 text-center sm:px-12 md:px-16 md:py-14 [grid-area:1/1]";

  const arrowClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-charcoal shadow-[0_1px_2px_rgba(10,14,26,0.06)] transition-colors duration-300 hover:border-blue/40 hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

  return (
    <section className="bg-cream section-y">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={t("title")}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="stack-gap mx-auto max-w-5xl"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <button type="button" aria-label={t("previous")} onClick={() => go(-1)} className={clsx(arrowClass, "hidden md:flex")}>
              <Arrow dir="prev" />
            </button>

            <div className="relative grid min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_24px_60px_-40px_rgba(10,14,26,0.35)]">
              {TESTIMONIALS.map((tm) => (
                <div key={tm.key} aria-hidden className={clsx(figureClass, "invisible pointer-events-none")}>
                  {renderBody(tm)}
                </div>
              ))}
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.figure
                  key={item.key}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 48 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -48 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${count}`}
                  className={clsx(figureClass, "cursor-grab active:cursor-grabbing")}
                >
                  {renderBody(item)}
                </motion.figure>
              </AnimatePresence>
            </div>

            <button type="button" aria-label={t("next")} onClick={() => go(1)} className={clsx(arrowClass, "hidden md:flex")}>
              <Arrow dir="next" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button type="button" aria-label={t("previous")} onClick={() => go(-1)} className={clsx(arrowClass, "md:hidden")}>
              <Arrow dir="prev" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((tm, i) => (
                <button
                  key={tm.key}
                  type="button"
                  aria-label={`${i + 1} / ${count}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="flex h-6 items-center"
                >
                  <span
                    className={clsx(
                      "block h-1.5 rounded-full transition-all duration-500 ease-out",
                      i === index ? "w-6 bg-blue" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/40"
                    )}
                  />
                </button>
              ))}
            </div>
            <button type="button" aria-label={t("next")} onClick={() => go(1)} className={clsx(arrowClass, "md:hidden")}>
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
