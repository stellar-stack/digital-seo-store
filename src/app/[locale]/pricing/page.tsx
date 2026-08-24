import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ServiceHero from "@/components/sections/ServiceHero";
import PricingGrid from "@/components/sections/PricingGrid";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import CTASection from "@/components/sections/CTASection";
import MobileStackCard from "@/components/ui/MobileStackCard";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pricing");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const plans = [0, 1, 2].map((i) => ({
    name: t(`plans.${i}.name`),
    price: t(`plans.${i}.price`),
    period: t(`plans.${i}.period`),
    description: t(`plans.${i}.description`),
    features: [0, 1, 2, 3, 4, 5].map((f) => t(`plans.${i}.features.${f}`)),
    cta: t(`plans.${i}.cta`),
    highlighted: i === 1,
  }));

  const faqItems = [0, 1, 2].map((i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }));

  return (
    <>
      <ServiceHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        ctaLabel={tNav("cta")}
        breadcrumbLabel={tCommon("home")}
      />
      <MobileStackCard>
        <PricingGrid plans={plans} note={t("note")} />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFAQ eyebrow={t("faq.eyebrow")} title={t("faq.title")} items={faqItems} />
      </MobileStackCard>
      <MobileStackCard>
        <CTASection title={t("cta.title")} subtitle={t("cta.subtitle")} />
      </MobileStackCard>
    </>
  );
}
