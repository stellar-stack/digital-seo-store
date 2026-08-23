"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";

const PREVIEW_KEYS = ["results", "tactics", "cost", "guarantee"] as const;

export default function FAQPreview() {
  const t = useTranslations("home.faq");

  const items = PREVIEW_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section className="bg-mist py-24 md:py-32">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
        <div className="mt-14">
          <FAQAccordion items={items} />
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-sm font-semibold text-charcoal underline decoration-amber decoration-2 underline-offset-4 hover:text-amber-dark"
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
