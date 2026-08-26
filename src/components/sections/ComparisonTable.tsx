"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { useHeaderHidden } from "@/components/providers/HeaderVisibility";

const ROW_KEYS = [
  "promises",
  "oneSize",
  "juggle",
  "communication",
  "quickWins",
  "measure",
  "vendor",
  "strategy2",
  "outsource",
] as const;

function XIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-white/25" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.2 7.2l5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-amber" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.16" />
      <path
        d="M6 10.3l2.6 2.6L14.2 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ComparisonTable({ showClosing = false }: { showClosing?: boolean }) {
  const t = useTranslations("home.comparison");
  const headerHidden = useHeaderHidden();

  return (
    <section className="bg-ink py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          dark
        />

        <div role="table" aria-label={t("title")} className="relative mt-16 rounded-3xl border border-white/10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 rounded-tr-3xl rounded-br-3xl bg-gradient-to-b from-amber/[0.09] via-amber/[0.05] to-amber/[0.09]"
          />

          <div
            role="row"
            className={clsx(
              "sticky z-20 grid grid-cols-2 rounded-t-3xl border-b border-white/10 bg-ink/95 backdrop-blur-xl transition-[top] duration-300 ease-out",
              headerHidden ? "top-0" : "top-20"
            )}
          >
            <div role="columnheader" className="p-6 text-sm font-semibold text-white/40">
              {t("othersLabel")}
            </div>
            <div role="columnheader" className="flex items-center gap-2 p-6 text-sm font-semibold text-amber">
              <CheckIcon />
              {t("usLabel")}
            </div>
          </div>

          {ROW_KEYS.map((key, i) => (
            <div
              key={key}
              role="row"
              className="relative z-10 grid grid-cols-2 border-b border-white/5 last:rounded-b-3xl last:border-b-0"
            >
              <motion.div
                role="cell"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-3 p-6 text-sm text-white/45"
              >
                <XIcon />
                <span className="pt-0.5">{t(`rows.${key}.them`)}</span>
              </motion.div>

              <div role="cell" className="overflow-hidden p-6">
                <motion.div
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  whileInView={{ clipPath: "inset(0 0 0 0%)" }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  className="flex items-start gap-3 text-sm font-medium text-white/90"
                >
                  <CheckIcon />
                  <span className="pt-0.5">{t(`rows.${key}.us`)}</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {showClosing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 text-center"
          >
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {t("closingTitle")}
            </h3>
            <p className="mt-3 text-white/55">{t("closingSubtitle")}</p>
            <div className="mt-8 flex justify-center">
              <MagneticButton as="a" href="/contact" variant="solid">
                {t("closingCta")}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
