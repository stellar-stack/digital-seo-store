"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const STEP_KEYS = ["discover", "team", "strategy", "grow"] as const;

export default function ProcessSteps() {
  const t = useTranslations("home.process");

  return (
    <section className="bg-mist py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-line md:grid-cols-4">
          {STEP_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="relative bg-cream p-8"
            >
              <span className="font-display text-4xl font-semibold text-amber/50">
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
      </Container>
    </section>
  );
}
