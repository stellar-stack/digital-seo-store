import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import MobileStackCard from "@/components/ui/MobileStackCard";
import type { FAQItem } from "@/components/ui/FAQAccordion";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import EcomBenefits from "@/components/sections/ecommerce/EcomBenefits";
import EcomWhyDss from "@/components/sections/ecommerce/EcomWhyDss";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalProcess from "@/components/sections/local/LocalProcess";
import CtaBand from "@/components/sections/ecommerce/CtaBand";
import EcomHero from "@/components/sections/ecommerce/EcomHero";
import { ECOM_SERVICE_ICONS } from "@/components/sections/ecommerce/EcomIcons";

type Pair = { title: string; description: string };

export default async function EcommerceSeoPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "ecommerceSeoPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const faqItems = t.raw("faq.items") as FAQItem[];
  const path = "/services/ecommerce-seo";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t("hero.title"),
      description: t("meta.description"),
      serviceType: t("hero.title"),
      areaServed: "Worldwide",
      provider: organizationRef(),
      url: absoluteUrl(path, locale),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: (Array.isArray(item.answer) ? item.answer : [item.answer])
            .map((b) => (typeof b === "string" ? b : b.list.join(" ")))
            .join(" "),
        },
      })),
    },
    breadcrumbList([
      { name: tCommon("home"), url: absoluteUrl("/", locale) },
      { name: t("hero.title"), url: absoluteUrl(path, locale) },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <EcomHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        cta={t("hero.cta")}
      />
      <MobileStackCard>
        <LocalServices
          title={t("services.title")}
          description={t("services.description")}
          items={t.raw("services.items") as { title: string; paragraphs: string[] }[]}
          icons={ECOM_SERVICE_ICONS}
        />
      </MobileStackCard>
      <MobileStackCard>
        <CtaBand
          title={t("cta.title")}
          paragraphs={[t("cta.subtitle")]}
          button={t("cta.button")}
          reverse
        />
      </MobileStackCard>
      <MobileStackCard>
        <EcomBenefits
          title={t("benefits.title")}
          description={t("benefits.description")}
          items={t.raw("benefits.items") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <EcomWhyDss
          title={t("comparison.title")}
          description={t("comparison.description")}
          columns={t.raw("comparison.columns") as string[]}
          rows={t.raw("comparison.rows") as string[][]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalProcess
          title={t("process.title")}
          description={t("process.description")}
          highlight="proven eCommerce SEO strategy"
          steps={t.raw("process.steps") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <CtaBand
          tone="cream"
          title={t("closing.title")}
          paragraphs={t.raw("closing.paragraphs") as string[]}
          button={t("closing.button")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <BlogTeaser posts={posts} />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFAQ items={faqItems} />
      </MobileStackCard>
    </>
  );
}
