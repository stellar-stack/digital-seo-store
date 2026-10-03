"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const STEP_KEYS = ["discover", "team", "strategy", "grow"] as const;

export default function ProcessSteps({
  namespace = "home.process",
  showHeading = true,
}: {
  namespace?: string;
  showHeading?: boolean;
}) {
  const t = useTranslations(namespace);

  return (
    <section className="bg-cream section-y">
      <Container>
        {showHeading && <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />}

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-10 max-w-2xl border-l-4 border-blue pl-6 md:pl-8"
        >
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {t("description")}
          </p>
        </motion.blockquote>

        <div className="relative stack-gap grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-[2.1rem] right-0 left-0 hidden h-px bg-line lg:block"
          />
          {STEP_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="relative flex flex-col rounded-3xl border border-line bg-white p-7"
            >
              <span className="font-display flex h-11 w-11 items-center justify-center rounded-full bg-blue/10 text-sm font-semibold text-blue-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-6 text-lg font-semibold text-ink">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {t(`steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
