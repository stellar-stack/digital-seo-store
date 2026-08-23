"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactSection() {
  const t = useTranslations("contact");

  const offices = [
    { label: t("offices.us.label"), address: t("offices.us.address") },
    { label: t("offices.canada.label"), address: t("offices.canada.address") },
    { label: t("offices.india.label"), address: t("offices.india.address") },
  ];

  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {t("info.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{t("info.description")}</p>

            <div className="mt-9 space-y-2">
              <a
                href="mailto:hello@digitalseostore.com"
                className="block text-lg font-semibold text-ink hover:text-amber-dark transition-colors"
              >
                hello@digitalseostore.com
              </a>
              <a
                href="tel:+12505056094"
                className="block text-lg font-semibold text-ink hover:text-amber-dark transition-colors"
              >
                +1 250 505 6094
              </a>
            </div>

            <div className="mt-10 space-y-6 border-t border-line pt-8">
              {offices.map((office) => (
                <div key={office.label}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-dark">
                    {office.label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{office.address}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-3xl border border-line bg-white p-8 md:p-10"
          >
            <h3 className="font-display text-xl font-semibold text-ink">{t("form.title")}</h3>
            <p className="mt-2 text-sm text-muted">{t("form.description")}</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
