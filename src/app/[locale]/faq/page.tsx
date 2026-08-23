import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ServiceHero from "@/components/sections/ServiceHero";
import FAQCategories from "@/components/sections/FAQCategories";
import CTASection from "@/components/sections/CTASection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

const CATEGORY_KEYS = ["general", "results", "pricing", "working"] as const;
const ITEMS_PER_CATEGORY = 4;

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faqPage");
  const tCommon = await getTranslations("common");

  const categories = CATEGORY_KEYS.map((key) => ({
    title: t(`categories.${key}.title`),
    items: Array.from({ length: ITEMS_PER_CATEGORY }, (_, i) => ({
      question: t(`categories.${key}.items.${i}.question`),
      answer: t(`categories.${key}.items.${i}.answer`),
    })),
  }));

  return (
    <>
      <ServiceHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        breadcrumbLabel={tCommon("home")}
      />
      <FAQCategories categories={categories} />
      <CTASection title={t("cta.title")} subtitle={t("cta.subtitle")} />
    </>
  );
}
