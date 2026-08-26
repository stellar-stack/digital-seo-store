"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import DotGridWave from "@/components/sections/DotGridWave";

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

const SPARK_PATHS = [
  "M2,36 L18,30 L34,32 L50,20 L66,22 L82,10 L98,6",
  "M2,32 L18,34 L34,22 L50,24 L66,14 L82,16 L98,4",
  "M2,38 L18,26 L34,28 L50,16 L66,18 L82,8 L98,4",
];

function CardCounter({ value, suffix }: { value: number; suffix: string }) {
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
    <p className="font-display text-5xl font-semibold tabular-nums text-white">
      {display}
      {suffix}
    </p>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const tStat = useTranslations("about.stats");
  const tExtra = useTranslations("home.hero.extraStats");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const stepRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 120, damping: 16, mass: 0.6 });
  const springRy = useSpring(ry, { stiffness: 120, damping: 16, mass: 0.6 });

  const scrollProgress = useMotionValue(0);
  const bgColor = useTransform(scrollProgress, [0, 1], ["#0a0e1a", "#170f08"]);
  const wordColor = useTransform(scrollProgress, [0, 1], ["#f8dfae", "#f5a623"]);
  const glowOpacity = useTransform(scrollProgress, [0, 1], [0.12, 0.34]);
  const glowScale = useTransform(scrollProgress, [0, 1], [0.85, 1.3]);
  const glowX = useTransform(scrollProgress, [0, 1], ["36%", "64%"]);
  // A second, larger, cooler-toned shape drifting at its own rate behind
  // the dot grid — gives the background actual depth instead of one flat
  // layer, without competing with the amber glow above.
  const parallaxY = useTransform(scrollProgress, [0, 1], [50, -50]);
  const parallaxOpacity = useTransform(scrollProgress, [0, 1], [0.05, 0.14]);

  function handleCardMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    ry.set(relX * 8);
    rx.set(relY * -8);
  }

  function handleCardMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const STEP_COUNT = ROTATING_KEYS.length;
    let currentStep = 0;

    // Deliberately no custom wheel/touch interception here, and no pausing
    // of Lenis (the site's global smooth-scroll): both were tried to
    // guarantee zero skipped steps, but fighting the browser's/Lenis's own
    // scroll physics with a hand-rolled lock proved fragile in practice
    // (compounding scroll, then a debounce that could get stuck open on a
    // trackpad's momentum tail). Skip-resistance instead comes from simply
    // giving each step a generous scroll distance, so a normal flick's
    // scroll delta rarely spans more than one step. Everything scrolls
    // through Lenis exactly like the rest of the site — nothing gets stuck.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * (STEP_COUNT - 1) * 1.6,
        scrub: 0.5,
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
          const next = Math.min(STEP_COUNT - 1, Math.floor(self.progress * STEP_COUNT));
          if (next !== currentStep) {
            currentStep = next;
            stepRef.current = next;
            setStepIndex(next);
          }
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const activeCard = CARDS[stepIndex];
  const activeLabel = activeCard.extra ? tExtra(activeCard.stat) : tStat(activeCard.stat);

  return (
    <div ref={wrapperRef} data-nav-theme="dark" className="relative -mt-20">
      <motion.section
        ref={pinRef}
        style={{ backgroundColor: reducedMotion ? "#0a0e1a" : bgColor }}
        className="relative overflow-hidden py-20 md:py-24"
      >
        <motion.div
          aria-hidden
          style={{
            y: reducedMotion ? 0 : parallaxY,
            opacity: reducedMotion ? 0.08 : parallaxOpacity,
          }}
          className="pointer-events-none absolute -bottom-40 -left-24 h-[38rem] w-[38rem] rounded-full bg-white blur-[180px]"
        />
        <motion.div
          aria-hidden
          style={{
            left: reducedMotion ? "36%" : glowX,
            opacity: reducedMotion ? 0.15 : glowOpacity,
            scale: reducedMotion ? 1 : glowScale,
          }}
          className="pointer-events-none absolute -top-32 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-amber blur-[160px]"
        />
        <DotGridWave reducedMotion={reducedMotion} />

        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-amber mb-7"
              >
                {t("eyebrow")}
              </motion.p>

              <h1 className="font-display max-w-2xl text-[2.1rem] leading-[1.15] font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
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
                      style={{ color: reducedMotion ? "#f5a623" : wordColor }}
                      className="absolute left-0 top-0 block"
                    >
                      {t(`rotating.${ROTATING_KEYS[stepIndex]}`)}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="mt-6 max-w-lg text-base leading-relaxed text-white/55"
              >
                {t("subtitle")}
              </motion.p>

              <div className="mt-9 flex items-center gap-2" aria-hidden>
                {ROTATING_KEYS.map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "h-1 rounded-full transition-all duration-500 ease-out",
                      i === stepIndex ? "w-9 bg-amber" : "w-4 bg-white/15"
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
                <MagneticButton as="a" href="/about" variant="outlineLight">
                  {t("ctaSecondary")}
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/45"
              >
                <span>
                  <span className="font-display font-semibold text-white">45+</span>{" "}
                  {tStat("experts")}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden />
                <span>
                  <span className="font-display font-semibold text-white">75+</span>{" "}
                  {tStat("clients")}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden />
                <span>
                  <span className="font-display font-semibold text-white">5+</span> {tStat("years")}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative hidden lg:block"
              style={{ perspective: 1200 }}
            >
              <motion.div
                key={reducedMotion ? "ghost-a" : `ghost-a-${stepIndex}`}
                initial={{ opacity: 0, rotate: -9, x: -8, y: 4 }}
                animate={{ opacity: 1, rotate: -6, x: 0, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-4 top-8 h-[19rem] origin-bottom rounded-[28px] border border-white/8 bg-white/[0.02]"
              />
              <motion.div
                key={reducedMotion ? "ghost-b" : `ghost-b-${stepIndex}`}
                initial={{ opacity: 0, rotate: 7, x: 8, y: 2 }}
                animate={{ opacity: 1, rotate: 4, x: 0, y: 0 }}
                transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-4 top-4 h-[19rem] origin-bottom rounded-[28px] border border-white/10 bg-white/[0.035]"
              />

              <motion.div
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{ rotateX: reducedMotion ? 0 : springRx, rotateY: reducedMotion ? 0 : springRy }}
                className="relative h-[19rem] rounded-[28px] border border-white/12 bg-white/[0.06] p-8 shadow-2xl shadow-ink/50 backdrop-blur-xl [transform-style:preserve-3d]"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {t("panelEyebrow")}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6"
                  >
                    <svg
                      viewBox="0 0 100 44"
                      className="h-16 w-full text-amber"
                      fill="none"
                    >
                      <motion.path
                        d={SPARK_PATHS[stepIndex % SPARK_PATHS.length]}
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>

                    <div className="mt-4">
                      <CardCounter value={activeCard.value} suffix={activeCard.suffix} />
                      <p className="mt-2 text-sm text-white/50">{activeLabel}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </div>
  );
}
