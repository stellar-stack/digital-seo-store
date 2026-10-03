"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

const SERVICES = [
  { key: "seo", slug: "seo-services" },
  { key: "ecommerceSeo", slug: "ecommerce-seo" },
  { key: "localSeo", slug: "local-seo" },
  { key: "ppc", slug: "ppc-management-services" },
  { key: "smm", slug: "social-media-marketing" },
  { key: "contentMarketing", slug: "content-marketing" },
  { key: "cro", slug: "conversion-rate-optimization" },
  { key: "wordpressDevelopment", slug: "wordpress-development" },
  { key: "seoAudit", slug: "seo-audit" },
  { key: "speedOptimization", slug: "seo-audit" },
] as const;

export default function ServicesIndex() {
  const tCard = useTranslations("home.servicesGrid");
  const tHeading = useTranslations("home.servicesSection");

  const [activeIndex, setActiveIndex] = useState(0);
  const active = SERVICES[activeIndex];
  const tags = tCard(`${active.key}.tags` as never)
    .split("•")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <section className="relative bg-mist section-y">
      <Container className="relative">
        <SectionHeading
          eyebrow={tHeading("eyebrow")}
          title={tHeading("title")}
          description={tHeading("description")}
          className="max-w-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-[28px] border border-line bg-white shadow-xl shadow-ink/5 md:grid md:grid-cols-[300px_1fr]"
        >
          {/* Category tabs */}
          <div className="relative overflow-hidden bg-gradient-to-b from-blue/[0.07] to-blue/[0.02] p-3 md:p-4" role="tablist">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-blue/10 blur-3xl"
            />

            <div className="relative flex flex-wrap gap-2 md:block md:flex-nowrap md:gap-0">
              {SERVICES.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  className={clsx(
                    "rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-200 md:w-full md:px-5 md:py-3.5",
                    i === activeIndex
                      ? "border border-blue bg-blue text-white shadow-lg shadow-blue/25 md:border-0"
                      : "border border-blue-ink/25 bg-white text-blue-ink hover:bg-blue/5 md:border-0 md:bg-transparent md:text-ink/70 md:hover:bg-blue/[0.06] md:hover:text-ink"
                  )}
                >
                  {tCard(`${s.key}.title` as never)}
                </button>
              ))}
            </div>
          </div>

          {/* Active category detail */}
          <div className="relative border-t border-line p-8 md:border-t-0 md:border-l md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
                  {tCard(`${active.key}.title` as never)}
                </h3>
                <p className="mt-3 text-sm font-semibold text-blue-ink">
                  {tCard(`${active.key}.hook` as never)}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                  {tCard(`${active.key}.description` as never)}
                </p>

                <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  {tags.map((tag) => (
                    <li key={tag} className="flex items-start gap-2.5">
                      <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
                      <span className="text-sm text-ink/80">{tag}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex justify-end">
                  <Link
                    href={`/services/${active.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-ink transition-colors hover:text-ink"
                  >
                    {tCard("learnMore")}
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 rounded-3xl border border-line bg-white px-8 py-10 text-center sm:px-14"
        >
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {tHeading("closingTitle")}
          </h3>
          <p className="mt-3 text-sm text-muted sm:text-base">{tHeading("closingSubtitle")}</p>
          <div className="mt-7 flex justify-center">
            <MagneticButton as="a" href="/contact" variant="solid">
              {tHeading("closingCta")}
            </MagneticButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
