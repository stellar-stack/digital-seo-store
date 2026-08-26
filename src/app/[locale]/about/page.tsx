import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AboutHero from "@/components/sections/AboutHero";
import ServiceIntro from "@/components/sections/ServiceIntro";
import ValuesList from "@/components/sections/ValuesList";
import AlternatingFeatureRows from "@/components/sections/AlternatingFeatureRows";
import OfficesStrip from "@/components/sections/OfficesStrip";
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
      <AboutHero />
      <MobileStackCard>
        <ServiceIntro
          title={t("story.title")}
          paragraphs={[t("story.paragraph1"), t("story.paragraph2")]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <ValuesList
          eyebrow={t("values.eyebrow")}
          title={t("values.title")}
          description={t("values.description")}
          items={valuesItems}
        />
      </MobileStackCard>
      <MobileStackCard>
        <AlternatingFeatureRows
          eyebrow={t("why.eyebrow")}
          title={t("why.title")}
          description={t("why.description")}
          items={whyItems}
        />
      </MobileStackCard>
      <MobileStackCard>
        <OfficesStrip />
      </MobileStackCard>
      <MobileStackCard>
        <CTASection title={t("cta.title")} subtitle={t("cta.subtitle")} />
      </MobileStackCard>
    </>
  );
}
