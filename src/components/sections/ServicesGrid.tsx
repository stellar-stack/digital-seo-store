"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/config/services";

const FEATURED = [
  "seo",
  "ecommerceSeo",
  "wordpressDevelopment",
  "localSeo",
  "seoAudit",
  "smm",
  "contentMarketing",
  "ppc",
] as const;

export default function ServicesGrid() {
  const t = useTranslations("nav.services");
  const tCard = useTranslations("home.servicesGrid");
  const tHeading = useTranslations("home.servicesSection");

  const featured = FEATURED.map((key) => services.find((s) => s.key === key)!).filter(
    Boolean
  );

  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={tHeading("eyebrow")}
          title={tHeading("title")}
          description={tHeading("description")}
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-xl hover:shadow-ink/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-lg font-semibold text-amber-dark transition-colors group-hover:bg-amber/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-6 text-lg font-semibold text-ink">
                  {t(s.key as never)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {tCard(s.key as never)}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-dark opacity-0 transition-opacity group-hover:opacity-100">
                  {tCard("learnMore")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services/seo"
            className="text-sm font-semibold text-charcoal underline decoration-amber decoration-2 underline-offset-4 hover:text-amber-dark"
          >
            {tCard("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
