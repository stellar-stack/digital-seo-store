"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import DotGridWave from "@/components/sections/DotGridWave";

const STEP_INTERVAL_MS = 3400;

const ROTATING_KEYS = [
  "growth",
  "sales",
  "traffic",
  "recover",
  "rank",
  "results",
] as const;

const CARDS = [
  { value: 45, suffix: "+", stat: "experts", extra: false },
  { value: 75, suffix: "+", stat: "clients", extra: false },
  { value: 5, suffix: "+", stat: "years", extra: false },
  { value: 3, suffix: "", stat: "offices", extra: false },
  { value: 9, suffix: "", stat: "services", extra: true },
  { value: 3, suffix: "", stat: "languages", extra: true },
] as const;

function BigStat({ value, suffix }: { value: number; suffix: string }) {
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
      {suffix}
    </p>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const tStat = useTranslations("about.stats");
  const tExtra = useTranslations("home.hero.extraStats");

  const [stepIndex, setStepIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const STEP_COUNT = ROTATING_KEYS.length;
  const progress = useMotionValue(0);
  const bgColor = useTransform(progress, [0, 1], ["#ffffff", "#f7f9ff"]);
  const wordColor = useTransform(progress, [0, 1], ["#4da3f0", "#0071e3"]);
  const glowOpacity = useTransform(progress, [0, 1], [0.05, 0.12]);
  const glowScale = useTransform(progress, [0, 1], [0.85, 1.3]);
  const glowX = useTransform(progress, [0, 1], ["36%", "64%"]);
  // A second, larger, cooler-toned shape drifting at its own rate behind
  // the dot grid — gives the background actual depth instead of one flat
  // layer, without competing with the blue glow above.
  const parallaxY = useTransform(progress, [0, 1], [50, -50]);
  const parallaxOpacity = useTransform(progress, [0, 1], [0.02, 0.05]);

  // No scroll-pin, no scroll-jacking: the rotating word/stat/background
  // simply plays on its own timer, so scrolling past the hero is 100%
  // native. Each step still smoothly morphs the background/glow toward the
  // next point in the same progress range the old scroll-scrub used.
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

  const activeCard = CARDS[stepIndex];
  const activeLabel = activeCard.extra ? tExtra(activeCard.stat) : tStat(activeCard.stat);

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
                    {t("titleStatic")}
                  </motion.span>
                </span>
                <span className="relative mt-1 block min-h-[2.55em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={stepIndex}
                      initial={{ y: 34, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -34, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ color: reducedMotion ? "#0071e3" : wordColor }}
                      className="absolute left-0 top-0 block"
                    >
                      <span className="relative inline-block">
                        {t(`rotating.${ROTATING_KEYS[stepIndex]}`)}
                        {/* A loose, imperfect marker-stroke under the word — hand-made,
                            not a machine-straight underline. */}
                        <svg
                          aria-hidden
                          viewBox="0 0 220 24"
                          preserveAspectRatio="none"
                          className="pointer-events-none absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5"
                        >
                          <motion.path
                            d="M4,14 C30,6 55,18 85,10 C115,4 140,16 170,9 C190,5 205,12 216,8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </svg>
                      </span>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="mt-6 max-w-lg text-base leading-relaxed text-muted"
              >
                {t("subtitle")}
              </motion.p>

              <div className="mt-9 flex items-center gap-2" aria-hidden>
                {ROTATING_KEYS.map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "h-1 rounded-full transition-all duration-500 ease-out",
                      i === stepIndex ? "w-9 bg-blue" : "w-4 bg-line"
                    )}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <MagneticButton as="a" href="/contact" variant="solid">
                  {t("ctaPrimary")}
                </MagneticButton>
                <MagneticButton as="a" href="/about" variant="outline">
                  {t("ctaSecondary")}
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
              >
                <span>
                  <span className="font-display font-semibold text-ink">45+</span>{" "}
                  {tStat("experts")}
                </span>
                <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
                <span>
                  <span className="font-display font-semibold text-ink">75+</span>{" "}
                  {tStat("clients")}
                </span>
                <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
                <span>
                  <span className="font-display font-semibold text-ink">5+</span> {tStat("years")}
                </span>
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
                  <BigStat value={activeCard.value} suffix={activeCard.suffix} />
                  <p className="mt-3 text-lg text-muted">{activeLabel}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
