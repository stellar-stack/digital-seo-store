"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/sections/ContactForm";

const STEP_KEYS = ["touch", "campaigns", "growth"] as const;

export default function SignupSection() {
  const t = useTranslations("home.signup");

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-amber/15 blur-[140px]" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display max-w-md text-3xl font-semibold leading-tight text-white md:text-4xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-5 max-w-md text-white/55"
            >
              {t("subtitle")}
            </motion.p>

            <div className="mt-10 space-y-8">
              {STEP_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
                  className="flex gap-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber/15 font-display text-sm font-semibold text-amber">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-3xl bg-white p-8 md:p-10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
