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
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import SeoServicesPage from "@/components/sections/seo/SeoServicesPage";
import LocalSeoPage from "@/components/sections/local/LocalSeoPage";
import EcommerceSeoPage from "@/components/sections/ecommerce/EcommerceSeoPage";
import SeoAuditPage from "@/components/sections/audit/SeoAuditPage";
import PpcServicesPage from "@/components/sections/ppc/PpcServicesPage";
import SemServicesPage from "@/components/sections/sem/SemServicesPage";
import CroServicesPage from "@/components/sections/cro/CroServicesPage";
import WordpressServicesPage from "@/components/sections/wordpress/WordpressServicesPage";
import HireServicesPage from "@/components/sections/hire/HireServicesPage";
import SocialServicesPage from "@/components/sections/social/SocialServicesPage";
import ContentServicesPage from "@/components/sections/content/ContentServicesPage";
import ReputationServicesPage from "@/components/sections/reputation/ReputationServicesPage";

const SEO_SERVICES_SLUG = "seo-services";
const LOCAL_SEO_SLUG = "local-seo";
const ECOMMERCE_SEO_SLUG = "ecommerce-seo";
const SEO_AUDIT_SLUG = "seo-audit";
const PPC_SLUG = "ppc-management-services";
const SEM_SLUG = "sem";
const CRO_SLUG = "conversion-rate-optimization";
const WORDPRESS_SLUG = "wordpress-development";
const HIRE_SLUG = "hire-seo-experts";
const SOCIAL_SLUG = "social-media-marketing";
const CONTENT_SLUG = "content-marketing";
const REPUTATION_SLUG = "reputation-management";

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

  if (slug === SEO_SERVICES_SLUG) {
    const tSeo = await getTranslations({ locale, namespace: "seoServicesPage.meta" });
    return {
      title: { absolute: tSeo("title") },
      description: tSeo("description"),
    };
  }

  if (slug === LOCAL_SEO_SLUG) {
    const tLocal = await getTranslations({ locale, namespace: "localSeoPage.meta" });
    return {
      title: { absolute: tLocal("title") },
      description: tLocal("description"),
    };
  }

  if (slug === ECOMMERCE_SEO_SLUG) {
    const tEcom = await getTranslations({ locale, namespace: "ecommerceSeoPage.meta" });
    return {
      title: { absolute: tEcom("title") },
      description: tEcom("description"),
    };
  }

  if (slug === SEO_AUDIT_SLUG) {
    const tAudit = await getTranslations({ locale, namespace: "seoAuditPage.meta" });
    return {
      title: { absolute: tAudit("title") },
      description: tAudit("description"),
    };
  }

  if (slug === PPC_SLUG) {
    const tPpc = await getTranslations({ locale, namespace: "ppcServicesPage.meta" });
    return {
      title: { absolute: tPpc("title") },
      description: tPpc("description"),
    };
  }

  if (slug === SEM_SLUG) {
    const tSem = await getTranslations({ locale, namespace: "semServicesPage.meta" });
    return {
      title: { absolute: tSem("title") },
      description: tSem("description"),
    };
  }

  if (slug === CRO_SLUG) {
    const tCro = await getTranslations({ locale, namespace: "croServicesPage.meta" });
    return {
      title: { absolute: tCro("title") },
      description: tCro("description"),
    };
  }

  if (slug === REPUTATION_SLUG) {
    const tRep = await getTranslations({ locale, namespace: "reputationServicesPage.meta" });
    return {
      title: { absolute: tRep("title") },
      description: tRep("description"),
    };
  }

  if (slug === CONTENT_SLUG) {
    const tContent = await getTranslations({ locale, namespace: "contentServicesPage.meta" });
    return {
      title: { absolute: tContent("title") },
      description: tContent("description"),
    };
  }

  if (slug === SOCIAL_SLUG) {
    const tSocial = await getTranslations({ locale, namespace: "socialServicesPage.meta" });
    return {
      title: { absolute: tSocial("title") },
      description: tSocial("description"),
    };
  }

  if (slug === HIRE_SLUG) {
    const tHire = await getTranslations({ locale, namespace: "hireServicesPage.meta" });
    return {
      title: { absolute: tHire("title") },
      description: tHire("description"),
    };
  }

  if (slug === WORDPRESS_SLUG) {
    const tWp = await getTranslations({ locale, namespace: "wordpressServicesPage.meta" });
    return {
      title: { absolute: tWp("title") },
      description: tWp("description"),
    };
  }

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

  if (slug === SEO_SERVICES_SLUG) {
    return <SeoServicesPage locale={locale} />;
  }

  if (slug === LOCAL_SEO_SLUG) {
    return <LocalSeoPage locale={locale} />;
  }

  if (slug === ECOMMERCE_SEO_SLUG) {
    return <EcommerceSeoPage locale={locale} />;
  }

  if (slug === SEO_AUDIT_SLUG) {
    return <SeoAuditPage locale={locale} />;
  }

  if (slug === PPC_SLUG) {
    return <PpcServicesPage locale={locale} />;
  }

  if (slug === SEM_SLUG) {
    return <SemServicesPage locale={locale} />;
  }

  if (slug === CRO_SLUG) {
    return <CroServicesPage locale={locale} />;
  }

  if (slug === WORDPRESS_SLUG) {
    return <WordpressServicesPage locale={locale} />;
  }

  if (slug === HIRE_SLUG) {
    return <HireServicesPage locale={locale} />;
  }

  if (slug === SOCIAL_SLUG) {
    return <SocialServicesPage locale={locale} />;
  }

  if (slug === CONTENT_SLUG) {
    return <ContentServicesPage locale={locale} />;
  }

  if (slug === REPUTATION_SLUG) {
    return <ReputationServicesPage locale={locale} />;
  }

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("hero.title"),
    description: t("hero.subtitle"),
    serviceType: t("hero.title"),
    areaServed: "Worldwide",
    provider: organizationRef(),
    url: absoluteUrl(`/services/${service.slug}`, locale),
  };

  const breadcrumbSchema = breadcrumbList([
    { name: tCommon("home"), url: absoluteUrl("/", locale) },
    { name: t("hero.title"), url: absoluteUrl(`/services/${service.slug}`, locale) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
