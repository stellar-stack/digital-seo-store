"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionPhoto from "@/components/ui/SectionPhoto";

const SERVICES = [
  { key: "seo", slug: "seo" },
  { key: "ecommerceSeo", slug: "ecommerce-seo" },
  { key: "wordpressDevelopment", slug: "wordpress-development" },
  { key: "localSeo", slug: "local-seo" },
  { key: "seoAudit", slug: "seo-audit" },
  { key: "speedOptimization", slug: "seo-audit" },
  { key: "smm", slug: "social-media-marketing" },
  { key: "contentMarketing", slug: "content-marketing" },
  { key: "ppc", slug: "ppc" },
] as const;

export default function ServicesIndex() {
  const tCard = useTranslations("home.servicesGrid");
  const tHeading = useTranslations("home.servicesSection");

  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = SERVICES[activeIndex];

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <Container className="relative">
        <SectionHeading
          eyebrow={tHeading("eyebrow")}
          title={tHeading("title")}
          description={tHeading("description")}
          className="max-w-2xl"
        />

        <SectionPhoto
          src="/images/home/services-team.jpg"
          alt="Our team reviewing a client's SEO strategy together"
          className="mt-12 aspect-[21/9]"
        />

        <div className="mt-16 grid gap-x-12 lg:grid-cols-2">
          <div className="lg:pt-[4vh] lg:pb-[22vh]">
            {SERVICES.map((s, i) => (
              <div
                key={s.key}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                data-index={i}
                onMouseEnter={() => setActiveIndex(i)}
                className="border-b border-line py-10 first:border-t"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-6"
                >
                  <span className="flex items-center gap-5">
                    <span
                      className={clsx(
                        "font-display text-sm tabular-nums transition-colors duration-300",
                        i === activeIndex ? "text-amber-dark" : "text-muted/50"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={clsx(
                        "font-display text-xl font-semibold transition-colors duration-300 sm:text-2xl",
                        i === activeIndex ? "text-ink" : "text-charcoal/35"
                      )}
                    >
                      {tCard(`${s.key}.title` as never)}
                    </span>
                  </span>
                  <span
                    className={clsx(
                      "shrink-0 text-lg transition-all duration-300",
                      i === activeIndex
                        ? "translate-x-0 text-amber-dark opacity-100"
                        : "-translate-x-1 text-charcoal/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                  >
                    →
                  </span>
                </Link>

                <AnimatePresence initial={false}>
                  {i === activeIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden lg:hidden"
                    >
                      <p className="pt-4 pr-8 text-sm leading-relaxed text-muted">
                        {tCard(`${s.key}.description` as never)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[28px] border border-line bg-white p-10 shadow-xl shadow-ink/5"
                >
                  <span className="font-display text-sm text-amber-dark">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-ink">
                    {tCard(`${active.key}.title` as never)}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {tCard(`${active.key}.description` as never)}
                  </p>

                  <Link
                    href={`/services/${active.slug}`}
                    className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-amber-dark transition-colors hover:text-ink"
                  >
                    {tCard("learnMore")}
                    <span>→</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 rounded-3xl border border-line bg-mist px-8 py-10 text-center sm:px-14"
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
