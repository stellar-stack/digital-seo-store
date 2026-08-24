"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/sections/ContactForm";

const REASSURANCE_ICONS = {
  speed: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  experts: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 19c.8-3 3-4.7 5.5-4.7s4.7 1.7 5.5 4.7M15.5 8a3 3 0 1 1 3.6 4.8M18 14.3c1.9.5 3.1 1.8 3.6 3.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  free: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M5 9h14v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3 6h18v3H3zM12 6V4.5a1.5 1.5 0 1 1 1.5 1.5M12 6V4.5A1.5 1.5 0 1 0 10.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9v11" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

export default function ContactSection() {
  const t = useTranslations("contact");

  const offices = [
    { label: t("offices.us.label"), address: t("offices.us.address") },
    { label: t("offices.canada.label"), address: t("offices.canada.address") },
    { label: t("offices.india.label"), address: t("offices.india.address") },
  ];

  const reassurance = [
    { key: "speed", title: t("info.reassurance.speed.title"), description: t("info.reassurance.speed.description") },
    { key: "experts", title: t("info.reassurance.experts.title"), description: t("info.reassurance.experts.description") },
    { key: "free", title: t("info.reassurance.free.title"), description: t("info.reassurance.free.description") },
  ] as const;

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

            <div className="mt-10 space-y-5">
              {reassurance.map((item) => (
                <div key={item.key} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-amber-dark">
                    {REASSURANCE_ICONS[item.key]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              ))}
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
