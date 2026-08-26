"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";

const ITEM_KEYS = [
  "results",
  "tactics",
  "inhouse",
  "enterprise",
  "linkbuilding",
  "measure",
  "standout",
  "examples",
  "cost",
  "guarantee",
] as const;

export default function FAQPreview() {
  const t = useTranslations("home.faq");

  const items = ITEM_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section className="bg-cream py-20 md:py-24">
      <Container className="max-w-4xl">
        <SectionHeading title={t("title")} align="center" />
        <div className="mt-14">
          <FAQAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
