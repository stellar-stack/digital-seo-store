"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection({
  title,
  subtitle,
  button,
}: {
  title?: string;
  subtitle?: string;
  button?: string;
} = {}) {
  const t = useTranslations("home.cta");

  const resolvedTitle = title ?? t("title");
  const resolvedSubtitle = subtitle ?? t("subtitle");
  const resolvedButton = button ?? t("button");

  return (
    <section className="relative overflow-hidden bg-blue py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[140px]" />
      </div>
      <Container className="relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mx-auto max-w-2xl text-3xl font-semibold leading-tight text-white md:text-4xl"
        >
          {resolvedTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-5 max-w-lg text-white/70"
        >
          {resolvedSubtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-10"
        >
          <MagneticButton as="a" href="/contact" variant="inverted">
            {resolvedButton}
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  );
}
