"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const INDUSTRIES = [
  {
    key: "ecommerce",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3.5 5h2l1.5 11h11l1.5-8h-13" />
        <circle cx="9.5" cy="19" r="1.4" />
        <circle cx="16.5" cy="19" r="1.4" />
      </svg>
    ),
  },
  {
    key: "saas",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" />
        <path d="M8 20h8M12 15.5V20" />
      </svg>
    ),
  },
  {
    key: "legal",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3.5v17M7 8h10M4 8l3-4.5M20 8l-3-4.5" />
        <path d="M2.5 13.5 4 8l1.5 5.5a1.9 1.9 0 0 1-1.5 1.9 1.9 1.9 0 0 1-1.5-1.9ZM19 13.5 20.5 8 22 13.5a1.9 1.9 0 0 1-1.5 1.9 1.9 1.9 0 0 1-1.5-1.9Z" />
        <path d="M8 20.5h8" />
      </svg>
    ),
  },
  {
    key: "realEstate",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3.5 11 12 3.5 20.5 11" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    key: "healthcare",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 21s-7-4.6-9.3-9.1C1.4 8.7 2.9 5.5 6 4.8c2-.5 3.7.4 6 2.7 2.3-2.3 4-3.2 6-2.7 3.1.7 4.6 3.9 3.3 7.1C19 16.4 12 21 12 21Z" />
        <path d="M9 11.5h2l1-2 1.5 4 1-2H17" />
      </svg>
    ),
  },
  {
    key: "fintech",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="M3 9.5h18" />
        <path d="M6.5 14h4" />
      </svg>
    ),
  },
] as const;

export default function IndustriesSection() {
  const t = useTranslations("home.industries");

  return (
    <section className="bg-cream py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          className="max-w-3xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              className="flex flex-col rounded-3xl border border-line bg-white p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue-dark [&_svg]:h-5 [&_svg]:w-5">
                {industry.icon}
              </span>
              <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                {t(`items.${industry.key}.name`)}
              </h3>
              <p className="mt-2 text-sm font-semibold text-blue-ink">
                {t(`items.${industry.key}.hook`)}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {t(`items.${industry.key}.description`)}
              </p>
              <p className="mt-5 text-xs font-medium leading-relaxed text-muted/80">
                {t(`items.${industry.key}.tags`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
