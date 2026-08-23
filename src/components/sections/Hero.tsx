"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

const ROTATING_KEYS = ["seo", "ppc", "content", "social", "cro"] as const;

export default function Hero() {
  const t = useTranslations("home.hero");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_KEYS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink pt-20 pb-32 md:pt-28 md:pb-44"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-amber/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      <motion.div style={{ y, opacity, scale }}>
        <Container className="relative">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-amber mb-7"
          >
            {t("eyebrow")}
          </motion.p>

          <h1 className="font-display max-w-4xl text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {[t("titleLine1"), t("titleLine2")].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + i * 0.12,
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton as="a" href="/contact" variant="solid">
              {t("ctaPrimary")}
            </MagneticButton>
            <MagneticButton as="a" href="/services/seo" variant="outline" className="border-white/20 text-white hover:border-white/50">
              {t("ctaSecondary")}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-20 flex items-center gap-3 text-sm font-medium text-white/40"
          >
            <span>{t("rotatingPrefix")}</span>
            <span className="relative inline-flex h-6 w-40 items-center overflow-hidden">
              <motion.span
                key={wordIndex}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 font-semibold text-amber"
              >
                {t(`rotating.${ROTATING_KEYS[wordIndex]}`)}
              </motion.span>
            </span>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
