import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ServiceHero from "@/components/sections/ServiceHero";
import AboutStats from "@/components/sections/AboutStats";
import ServiceIntro from "@/components/sections/ServiceIntro";
import ServiceFeatures from "@/components/sections/ServiceFeatures";
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
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const valuesItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`values.items.${i}.title`),
    description: t(`values.items.${i}.description`),
  }));

  const whyItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`why.items.${i}.title`),
    description: t(`why.items.${i}.description`),
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
      <AboutStats />
      <ServiceIntro
        title={t("story.title")}
        paragraphs={[t("story.paragraph1"), t("story.paragraph2")]}
      />
      <ServiceFeatures
        eyebrow={t("values.eyebrow")}
        title={t("values.title")}
        description={t("values.description")}
        items={valuesItems}
      />
      <ServiceFeatures
        eyebrow={t("why.eyebrow")}
        title={t("why.title")}
        description={t("why.description")}
        items={whyItems}
      />
      <CTASection title={t("cta.title")} subtitle={t("cta.subtitle")} />
    </>
  );
}
