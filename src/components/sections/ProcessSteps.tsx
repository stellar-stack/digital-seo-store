"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const STEP_KEYS = ["discover", "team", "strategy", "grow"] as const;

// Static, always-fade-in grid — used on mobile and whenever the visitor
// has prefers-reduced-motion set, exactly as this section rendered before
// the pinned desktop sequence was added below. Pinning a section on a
// touch-scroll device is a well-known jank/accessibility trap, so it's
// scoped to desktop-with-motion only, never retrofitted onto this path.
function StaticStepGrid({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-line md:grid-cols-4">
      {STEP_KEYS.map((key, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          className="relative bg-cream p-8"
        >
          <span className="font-display text-4xl font-semibold text-blue/50">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display mt-6 text-lg font-semibold text-ink">
            {t(`steps.${key}.title`)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t(`steps.${key}.description`)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// Desktop, motion-enabled pinned storytelling sequence: the section holds
// scroll position while the active step crossfades in place and a fill
// line tracks progress through the 4-step journey — the GSAP + ScrollTrigger
// narrative pattern the brief called for, built once here rather than
// retrofitted across every section.
function PinnedStepStory({ t }: { t: ReturnType<typeof useTranslations> }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const scrollProgress = useMotionValue(0);
  const fillScale = useTransform(scrollProgress, [0, 1], [0, 1]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const STEP_COUNT = STEP_KEYS.length;
    let currentStep = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * (STEP_COUNT - 1) * 1.3,
        scrub: 0.5,
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
          const next = Math.min(STEP_COUNT - 1, Math.floor(self.progress * STEP_COUNT));
          if (next !== currentStep) {
            currentStep = next;
            setStepIndex(next);
          }
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        ref={pinRef}
        className="grid gap-12 py-8 lg:min-h-screen lg:grid-cols-[1.1fr_0.9fr] lg:content-center lg:items-center"
      >
        <div>
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-line">
            <motion.div
              style={{ scaleX: fillScale }}
              className="absolute inset-y-0 left-0 h-full w-full origin-left rounded-full bg-blue"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <span className="font-display text-6xl font-semibold text-blue/40">
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-6 max-w-md text-3xl font-semibold text-ink md:text-4xl">
                {t(`steps.${STEP_KEYS[stepIndex]}.title`)}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                {t(`steps.${STEP_KEYS[stepIndex]}.description`)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-1 rounded-3xl border border-line bg-cream p-3">
          {STEP_KEYS.map((key, i) => {
            const active = i === stepIndex;
            return (
              <div
                key={key}
                className={clsx(
                  "flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300",
                  active ? "bg-white shadow-sm shadow-ink/5" : ""
                )}
              >
                <span
                  className={clsx(
                    "font-display text-sm tabular-nums transition-colors duration-300",
                    active ? "text-blue-ink" : "text-muted/50"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={clsx(
                    "font-display text-base font-semibold transition-colors duration-300",
                    active ? "text-ink" : "text-charcoal/35"
                  )}
                >
                  {t(`steps.${key}.title`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProcessSteps({
  namespace = "home.process",
  showHeading = true,
}: {
  namespace?: string;
  showHeading?: boolean;
}) {
  const t = useTranslations(namespace);
  const [desktopStory, setDesktopStory] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktopStory(desktop.matches && !reduced.matches);
    update();
    reduced.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="bg-mist py-20 md:py-24">
      <Container>
        {showHeading && <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />}

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-10 max-w-2xl border-l-4 border-blue pl-6 md:pl-8"
        >
          <p className="text-2xl font-medium leading-snug text-ink md:text-3xl">
            {t("description")}
          </p>
        </motion.blockquote>

        <div className="mt-16">
          {desktopStory ? <PinnedStepStory t={t} /> : <StaticStepGrid t={t} />}
        </div>
      </Container>
    </section>
  );
}
