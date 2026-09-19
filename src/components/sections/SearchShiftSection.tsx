"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function SearchShiftSection() {
  const t = useTranslations("home.searchShift");

  return (
    <section className="bg-cream py-20 md:py-24">
      <Container className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl lg:text-[2.75rem]"
        >
          {t("titleLine1")}{" "}
          <span className="text-blue">{t("titleLine2")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-6 max-w-2xl border-l-2 border-blue pl-4 font-display text-lg font-semibold leading-snug text-ink"
        >
          {t("closing")}
        </motion.p>
      </Container>
    </section>
  );
}
