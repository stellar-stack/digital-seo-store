"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const TESTIMONIAL_KEYS = ["local", "ppc", "social"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIAL_KEYS.map((key, i) => (
            <motion.figure
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="flex h-full flex-col rounded-3xl border border-line bg-white p-8"
            >
              <div className="mb-5 flex gap-1 text-amber">
                {"★★★★★".split("").map((star, si) => (
                  <span key={si}>{star}</span>
                ))}
              </div>
              <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-charcoal/80">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber text-sm font-semibold text-ink">
                  {initials(t(`items.${key}.name`))}
                </span>
                <span className="text-sm font-semibold text-ink">
                  {t(`items.${key}.name`)}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
