"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import StatCounter from "@/components/ui/StatCounter";
import { STAT_ICONS } from "@/components/icons/AboutIcons";

// Experts/years intentionally diverge from the 45+/5+ figures used on the
// homepage — confirmed with the client as current, About-page-only numbers.
const STATS = [
  { value: 63, suffix: "", key: "experts" },
  { value: 75, suffix: "+", key: "clients" },
  { value: 15, suffix: "", key: "years" },
  { value: 3, suffix: "", key: "offices" },
] as const;

const wordVariants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AboutHero() {
  const t = useTranslations("about");
  const tStats = useTranslations("about.stats");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const words = t("hero.title").split(" ");

  return (
    <div data-nav-theme="dark" className="relative -mt-20">
    <section className="relative overflow-hidden bg-ink pt-36 pb-24 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-amber/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 text-xs font-medium text-white/40"
        >
          <Link href="/" className="hover:text-white/70">
            {tCommon("home")}
          </Link>
          <span>/</span>
          <span className="text-white/60">{t("hero.title")}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-amber mb-6"
        >
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07 }}
          className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
        >
          {words.map((word, i) => (
            <span key={i}>
              <span className="inline-block overflow-hidden pb-1.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-9"
        >
          <MagneticButton as="a" href="/contact" variant="solid">
            {tNav("cta")}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div key={s.key} className="bg-ink/95 p-6">
              <StatCounter
                value={s.value}
                suffix={s.suffix}
                label={tStats(s.key)}
                icon={STAT_ICONS[i]}
                dark
              />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
    </div>
  );
}
