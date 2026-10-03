import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import MobileStackCard from "@/components/ui/MobileStackCard";
import type { FAQItem } from "@/components/ui/FAQAccordion";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import LocalProcess from "@/components/sections/local/LocalProcess";
import EcomHero from "@/components/sections/ecommerce/EcomHero";
import EcomWhyDss from "@/components/sections/ecommerce/EcomWhyDss";
import CtaBand from "@/components/sections/ecommerce/CtaBand";
import AuditFinalCta from "@/components/sections/audit/AuditFinalCta";
import HireIntro from "@/components/sections/hire/HireIntro";
import HireSolutions from "@/components/sections/hire/HireSolutions";
import HireChallenges from "@/components/sections/hire/HireChallenges";
import HireProcessNodes from "@/components/sections/hire/HireProcessNodes";
import HirePricing from "@/components/sections/hire/HirePricing";
import HireChecklist from "@/components/sections/hire/HireChecklist";
import { HireArt } from "@/components/sections/hire/HireArt";

type Pair = { title: string; description: string };
type Solution = { title: string; paragraphs: string[]; list?: string[]; cta: string };

export default async function HireServicesPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hireServicesPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const faqItems = t.raw("faq.items") as FAQItem[];
  const faqItems2 = t.raw("faq2.items") as FAQItem[];
  const path = "/services/hire-seo-experts";

  const allFaq = [...faqItems, ...faqItems2];
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
      mainEntity: allFaq.map((item) => ({
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
        title={t("hero.title")}
        description={t("hero.description")}
        points={t.raw("hero.points") as string[]}
        cta={t("hero.cta")}
        art={<HireArt />}
      />
      <MobileStackCard>
        <HireIntro
          tone="cream"
          title={t("intro.title")}
          paragraphs={t.raw("intro.paragraphs") as string[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <HireSolutions
          title={t("businessIntro.title")}
          description={t("businessIntro.description")}
          items={t.raw("businessSolutions") as Solution[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <EcomWhyDss
          title={t("comparison.title")}
          columns={t.raw("comparison.columns") as string[]}
          rows={t.raw("comparison.rows") as string[][]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalProcess
          title={t("process.title")}
          description={t("process.description")}
          highlight="Agile SEO Methodology"
          steps={t.raw("process.steps") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <CtaBand
          tone="cream"
          title={t("cta.title")}
          paragraphs={t.raw("cta.paragraphs") as string[]}
          button={t("cta.cta")}
          art={<HireArt background={false} />}
          reverse
        />
      </MobileStackCard>
      <MobileStackCard>
        <AuditFinalCta
          title={t("partner.title")}
          paragraphs={t.raw("partner.paragraphs") as string[]}
          listIntro={t("partner.listIntro")}
          list={t.raw("partner.list") as string[]}
          closing={t("partner.closing")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <BlogTeaser posts={posts} title={t("blog.title")} description={t("blog.description")} />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFAQ title={t("faq.title")} items={faqItems} />
      </MobileStackCard>
      <MobileStackCard>
        <HireChallenges
          title={t("challenges.title")}
          quotes={t.raw("challenges.quotes") as string[]}
          cta={t("challenges.cta")}
          button={t("challenges.button")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <HireProcessNodes
          tone="cream"
          title={t("process2.title")}
          description={t("process2.description")}
          steps={t.raw("process2.steps") as string[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <HirePricing
          title={t("pricing.title")}
          paragraphs={t.raw("pricing.paragraphs") as string[]}
          plans={t.raw("pricing.plans") as string[]}
          closingParagraphs={t.raw("pricing.closingParagraphs") as string[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <HireChecklist
          title={t("why.title")}
          items={t.raw("why.items") as string[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFAQ tone="white" title={t("faq2.title")} items={faqItems2} />
      </MobileStackCard>
    </>
  );
}
