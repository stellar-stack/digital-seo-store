"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const TESTIMONIAL_KEYS = [
  "ireland",
  "usaLegal",
  "californiaEcommerce",
  "canada",
  "india",
  "australia",
  "newZealand",
] as const;

export default function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="bg-cream section-y">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div className="stack-gap grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIAL_KEYS.map((key, i) => (
            <motion.figure
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
              className="flex h-full flex-col rounded-3xl border border-line bg-white p-8"
            >
              <span className="text-2xl" aria-hidden>
                {t(`items.${key}.flag`)}
              </span>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-charcoal/80">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold text-ink">{t(`items.${key}.role`)}</p>
                <p className="mt-0.5 text-sm text-muted">{t(`items.${key}.company`)}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
