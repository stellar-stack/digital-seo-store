import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/config/services";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceIntro from "@/components/sections/ServiceIntro";
import ServiceFeatures from "@/components/sections/ServiceFeatures";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import CTASection from "@/components/sections/CTASection";
import MobileStackCard from "@/components/ui/MobileStackCard";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: `services.${service.key}` });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = findService(slug);
  if (!service) notFound();

  const t = await getTranslations(`services.${service.key}`);
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const featureItems = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`features.items.${i}.title`),
    description: t(`features.items.${i}.description`),
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
        <ServiceIntro
          title={t("intro.title")}
          paragraphs={[t("intro.paragraph1"), t("intro.paragraph2")]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFeatures
          eyebrow={t("features.eyebrow")}
          title={t("features.title")}
          description={t("features.description")}
          items={featureItems}
        />
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
