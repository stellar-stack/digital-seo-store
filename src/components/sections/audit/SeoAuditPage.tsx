import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import MobileStackCard from "@/components/ui/MobileStackCard";
import type { FAQItem } from "@/components/ui/FAQAccordion";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import StatsStrip from "@/components/sections/StatsStrip";
import SeoWhatYouGet from "@/components/sections/seo/SeoWhatYouGet";
import SeoComparison from "@/components/sections/seo/SeoComparison";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalIntro from "@/components/sections/local/LocalIntro";
import LocalProcess from "@/components/sections/local/LocalProcess";
import AuditHero from "@/components/sections/audit/AuditHero";
import AuditReasons from "@/components/sections/audit/AuditReasons";
import AuditQuickList from "@/components/sections/audit/AuditQuickList";
import AuditTaxonomy from "@/components/sections/audit/AuditTaxonomy";
import AuditFinalCta from "@/components/sections/audit/AuditFinalCta";
import { AUDIT_SERVICE_ICONS } from "@/components/sections/audit/AuditServiceIcons";

type Pair = { title: string; description: string };

export default async function SeoAuditPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "seoAuditPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const faqItems = t.raw("faq.items") as FAQItem[];
  const path = "/services/seo-audit";

  const comparisonRows = t.raw("comparison.rows") as { feature: string; cells: string[] }[];

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

      <AuditHero
        title={t("hero.title")}
        hook={t("hero.hook")}
        lead={t("hero.lead")}
        description={t("hero.description")}
        cta={t("hero.cta")}
              footer={<StatsStrip items={t.raw("about.items") as Pair[]} />}
      />
      <MobileStackCard>
        <AuditReasons
          title={t("reasons.title")}
          paragraphs={t.raw("reasons.paragraphs") as string[]}
          items={t.raw("reasons.items") as Pair[]}
          cta={t("reasons.cta")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <AuditQuickList
          title={t("quickList.title")}
          description={t("quickList.description")}
          items={t.raw("quickList.items") as Pair[]}
          cta={t("quickList.cta")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalServices
          title={t("services.title")}
          description={t("services.description")}
          items={(t.raw("services.items") as Pair[]).map((s) => ({
            title: s.title,
            paragraphs: [s.description],
          }))}
          icons={AUDIT_SERVICE_ICONS}
          closing={{
            title: t("services.closingTitle"),
            description: t("services.closingDescription"),
            cta: t("services.cta"),
          }}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalIntro title={t("cta.title")} paragraphs={t.raw("cta.paragraphs") as string[]} />
      </MobileStackCard>
      <MobileStackCard>
        <AuditTaxonomy
          title={t("taxonomy.title")}
          description={t("taxonomy.description")}
          groups={t.raw("taxonomy.groups") as { title: string; items: string[] }[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalProcess
          title={t("process.title")}
          highlight="SEO Health"
          steps={t.raw("process.steps") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <SeoWhatYouGet
          tone="cream"
          title={t("benefits.title")}
          description={t("benefits.description")}
          items={t.raw("benefits.items") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <SeoComparison
          title={t("comparison.title")}
          columns={t.raw("comparison.columns") as string[]}
          rows={comparisonRows.map((r) => r.cells)}
          rowLabels={comparisonRows.map((r) => r.feature)}
        />
      </MobileStackCard>
      <MobileStackCard>
        <AuditFinalCta
          title={t("finalCta.title")}
          paragraphs={t.raw("finalCta.paragraphs") as string[]}
          listIntro={t("finalCta.listIntro")}
          list={t.raw("finalCta.list") as string[]}
          closing={t("finalCta.closing")}
          cta={t("finalCta.cta")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <BlogTeaser posts={posts} tone="mist" />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFAQ title={t("faq.title")} items={faqItems} />
      </MobileStackCard>
    </>
  );
}
