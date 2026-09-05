"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import { services, type ServiceCategory } from "@/config/services";
import { SERVICE_ICONS } from "@/components/icons/ServiceIcons";

const CATEGORY_SHOWCASE: ServiceCategory[] = ["seo", "paidGrowth", "contentReputation", "devTeam"];

const wordVariants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

function ServicePill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mx-0.5 inline-flex items-center rounded-full bg-blue/12 px-2.5 py-0.5 align-baseline text-[0.92em] font-semibold text-blue-ink transition-colors hover:bg-blue/20"
    >
      {children}
    </Link>
  );
}

export default function IntroStatement() {
  const t = useTranslations("home.intro");
  const tNav = useTranslations("nav");
  const words = t("title").split(" ");

  const categoryTiles = CATEGORY_SHOWCASE.map((category) => {
    const inCategory = services.filter((s) => s.category === category);
    const primary = inCategory[0];
    return {
      category,
      count: inCategory.length,
      href: `/services/${primary.slug}`,
      icon: SERVICE_ICONS[primary.key],
    };
  });

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(23,24,28,0.05)_1px,transparent_0)] [background-size:32px_32px]" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-ink"
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
              className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.1rem]"
            >
              {words.map((word, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden pb-1.5">
                    <motion.span variants={wordVariants} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="mt-6 max-w-xl text-base leading-loose text-muted md:text-lg"
            >
              {t.rich("description", {
                local: (chunks) => <ServicePill href="/services/local-seo">{chunks}</ServicePill>,
                rms: (chunks) => (
                  <ServicePill href="/services/reputation-management">{chunks}</ServicePill>
                ),
                cro: (chunks) => <ServicePill href="/services/cro">{chunks}</ServicePill>,
                ppc: (chunks) => <ServicePill href="/services/ppc">{chunks}</ServicePill>,
                social: (chunks) => (
                  <ServicePill href="/services/social-media-marketing">{chunks}</ServicePill>
                ),
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="mt-10"
            >
              <MagneticButton as="a" href="/contact" variant="outline">
                {t("cta")}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {categoryTiles.map((tile) => (
              <Link
                key={tile.category}
                href={tile.href}
                className="group rounded-3xl border border-line bg-white p-6 transition-colors hover:border-blue/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-blue-dark transition-colors group-hover:bg-blue/15 [&_svg]:h-5 [&_svg]:w-5">
                  {tile.icon}
                </span>
                <p className="font-display mt-5 text-base font-semibold text-ink">
                  {tNav(`megaMenu.categories.${tile.category}` as never)}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {tile.count} {tNav("servicesLabel").toLowerCase()}
                </p>
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
