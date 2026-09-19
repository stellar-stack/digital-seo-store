"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import DotGridWave from "@/components/sections/DotGridWave";

const STEP_INTERVAL_MS = 3400;

// The hero's headline is a single fixed title now (no rotating phrase list
// in the current content), but the right-hand editorial stat panel still
// gets to cycle — through the same four "Proof" numbers shown just below
// in StatsBar, so it doesn't invent anything new.
const STAT_KEYS = ["businesses", "experience", "industries", "countries"] as const;
const STAT_VALUES: Record<(typeof STAT_KEYS)[number], number> = {
  businesses: 250,
  experience: 30,
  industries: 30,
  countries: 50,
};

function BigStat({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <p className="font-display text-[5.5rem] font-semibold leading-[0.95] tabular-nums text-ink xl:text-[7rem]">
      {display}
      <span className="text-blue">+</span>
    </p>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const tStat = useTranslations("home.stats");

  const [stepIndex, setStepIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const STEP_COUNT = STAT_KEYS.length;
  const progress = useMotionValue(0);
  const bgColor = useTransform(progress, [0, 1], ["#ffffff", "#f7f9ff"]);
  const glowOpacity = useTransform(progress, [0, 1], [0.05, 0.12]);
  const glowScale = useTransform(progress, [0, 1], [0.85, 1.3]);
  const glowX = useTransform(progress, [0, 1], ["36%", "64%"]);
  // A second, larger, cooler-toned shape drifting at its own rate behind
  // the dot grid — gives the background actual depth instead of one flat
  // layer, without competing with the blue glow above.
  const parallaxY = useTransform(progress, [0, 1], [50, -50]);
  const parallaxOpacity = useTransform(progress, [0, 1], [0.02, 0.05]);

  // No scroll-pin, no scroll-jacking: the stat panel simply plays on its
  // own timer, so scrolling past the hero is 100% native.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    const id = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEP_COUNT);
    }, STEP_INTERVAL_MS);

    return () => clearInterval(id);
  }, [STEP_COUNT]);

  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(progress, stepIndex / (STEP_COUNT - 1), {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [stepIndex, reducedMotion, progress, STEP_COUNT]);

  const activeStatKey = STAT_KEYS[stepIndex];

  // The title's last word gets the hand-drawn underline accent — a loose,
  // imperfect marker-stroke, not a machine-straight line.
  const titleWords = t("title").split(" ");
  const titleLastWord = titleWords[titleWords.length - 1];
  const titleLeadingWords = titleWords.slice(0, -1).join(" ");

  return (
    <div className="relative">
      <motion.section
        style={{ backgroundColor: reducedMotion ? "#ffffff" : bgColor }}
        className="relative overflow-hidden pt-4 pb-20 md:pt-6 md:pb-24"
      >
        <motion.div
          aria-hidden
          style={{
            y: reducedMotion ? 0 : parallaxY,
            opacity: reducedMotion ? 0.08 : parallaxOpacity,
          }}
          className="pointer-events-none absolute -bottom-40 -left-24 h-[38rem] w-[38rem] rounded-full bg-blue/10 blur-[180px]"
        />
        <motion.div
          aria-hidden
          style={{
            left: reducedMotion ? "36%" : glowX,
            opacity: reducedMotion ? 0.08 : glowOpacity,
            scale: reducedMotion ? 1 : glowScale,
          }}
          className="pointer-events-none absolute -top-32 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue blur-[160px]"
        />
        <DotGridWave reducedMotion={reducedMotion} />

        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-blue mb-7"
              >
                {t("eyebrow")}
              </motion.p>

              <h1 className="font-display max-w-2xl text-[2.1rem] leading-[1.15] font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="block"
                  >
                    {titleLeadingWords}{" "}
                    <span className="relative inline-block whitespace-nowrap">
                      {titleLastWord}
                      <svg
                        aria-hidden
                        viewBox="0 0 220 24"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5"
                      >
                        <motion.path
                          d="M4,14 C30,6 55,18 85,10 C115,4 140,16 170,9 C190,5 205,12 216,8"
                          fill="none"
                          stroke="#0071e3"
                          strokeWidth="6"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </svg>
                    </span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="mt-6 max-w-lg text-base leading-relaxed text-muted"
              >
                {t("description")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="mt-6 max-w-md border-l-2 border-blue pl-4 font-display text-lg font-semibold leading-snug text-ink"
              >
                {t("subDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <MagneticButton as="a" href="/contact" variant="solid">
                  {t("ctaPrimary")}
                </MagneticButton>
                <MagneticButton as="a" href="/about" variant="outline">
                  {t("ctaSecondary")}
                </MagneticButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {t("panelEyebrow")}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5"
                >
                  <BigStat value={STAT_VALUES[activeStatKey]} />
                  <p className="mt-3 text-lg text-muted">{tStat(activeStatKey)}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-2" aria-hidden>
                {STAT_KEYS.map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "h-1 rounded-full transition-all duration-500 ease-out",
                      i === stepIndex ? "w-9 bg-blue" : "w-4 bg-line"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
