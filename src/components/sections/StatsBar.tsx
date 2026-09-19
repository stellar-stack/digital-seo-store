"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import StatCounter from "@/components/ui/StatCounter";

const STATS = [
  { value: 250, suffix: "+", key: "businesses" },
  { value: 30, suffix: "+", key: "experience" },
  { value: 30, suffix: "+", key: "industries" },
  { value: 50, suffix: "+", key: "countries" },
] as const;

export default function StatsBar() {
  const t = useTranslations("home.stats");

  return (
    <section className="bg-mist py-16 md:py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center text-xl font-semibold text-ink sm:text-2xl"
        >
          {t("title")}
        </motion.h2>
        <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((s) => (
            <StatCounter key={s.key} value={s.value} suffix={s.suffix} label={t(s.key)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
