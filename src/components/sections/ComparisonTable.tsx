"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const ROW_KEYS = [
  "promises",
  "oneSize",
  "juggle",
  "communication",
  "quickWins",
] as const;

export default function ComparisonTable() {
  const t = useTranslations("home.comparison");

  return (
    <section className="bg-ink py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          dark
        />

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10">
          <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
            <div className="p-6 text-sm font-semibold text-white/40">
              {t("othersLabel")}
            </div>
            <div className="p-6 text-sm font-semibold text-amber">
              {t("usLabel")}
            </div>
          </div>
          {ROW_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-2 border-b border-white/5 last:border-b-0"
            >
              <div className="p-6 text-sm text-white/45">{t(`rows.${key}.them`)}</div>
              <div className="p-6 text-sm font-medium text-white/90">
                {t(`rows.${key}.us`)}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
