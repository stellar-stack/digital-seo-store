import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import MobileStackCard from "@/components/ui/MobileStackCard";
import CTASection from "@/components/sections/CTASection";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import SeoHero from "@/components/sections/seo/SeoHero";
import StatsStrip from "@/components/sections/StatsStrip";
import SeoServicesGrid from "@/components/sections/seo/SeoServicesGrid";
import SeoWhatYouGet from "@/components/sections/seo/SeoWhatYouGet";
import SeoComparison from "@/components/sections/seo/SeoComparison";
import SeoProcess from "@/components/sections/seo/SeoProcess";
import SeoWhyInvest from "@/components/sections/seo/SeoWhyInvest";

type Pair = { title: string; description: string };
type FaqItem = { question: string; answer: string[] };

export default async function SeoServicesPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "seoServicesPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const faqItems = t.raw("faq.items") as FaqItem[];
  const path = "/services/seo-services";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("hero.title"),
    description: t("meta.description"),
    serviceType: t("hero.title"),
    areaServed: "Worldwide",
    provider: organizationRef(),
    url: absoluteUrl(path, locale),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
    })),
  };

  const breadcrumbSchema = breadcrumbList([
    { name: tCommon("home"), url: absoluteUrl("/", locale) },
    { name: t("hero.title"), url: absoluteUrl(path, locale) },
  ]);

  return (
    <>
      {[serviceSchema, faqSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SeoHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        cta={t("hero.cta")}
        stats={t.raw("hero.stats") as { value: string; label: string }[]}
              footer={<StatsStrip items={t.raw("about.items") as Pair[]} />}
      />
      <MobileStackCard>
        <SeoServicesGrid
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          description={t("services.description")}
          items={t.raw("services.items") as Pair[]}
          cta={t("services.cta")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <SeoWhatYouGet
          eyebrow={t("whatYouGet.eyebrow")}
          title={t("whatYouGet.title")}
          description={t("whatYouGet.description")}
          items={t.raw("whatYouGet.items") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <CTASection id="get-started" title={t("cta.title")} subtitle="" button={t("cta.button")} />
      </MobileStackCard>
      <MobileStackCard>
        <SeoComparison
          title={t("comparison.title")}
          columns={t.raw("comparison.columns") as string[]}
          rows={t.raw("comparison.rows") as string[][]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <SeoProcess
          title={t("process.title")}
          description={t("process.description")}
          steps={t.raw("process.steps") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard round={false}>
        <SeoWhyInvest
          eyebrow={t("whyInvest.eyebrow")}
          title={t("whyInvest.title")}
          subtitle={t("whyInvest.subtitle")}
          paragraphs={t.raw("whyInvest.paragraphs") as string[]}
          listIntro={t("whyInvest.listIntro")}
          list={t.raw("whyInvest.list") as string[]}
          closing={t("whyInvest.closing")}
          phone={t("whyInvest.phone")}
          tocTitle={t("whyInvest.tocTitle")}
          toc={t.raw("whyInvest.toc") as string[]}
          cta={t("whyInvest.cta")}
        />
      </MobileStackCard>
      <MobileStackCard>
        <BlogTeaser posts={posts} />
      </MobileStackCard>
      <MobileStackCard>
        <ServiceFAQ id="faqs" title={t("faq.title")} items={faqItems} />
      </MobileStackCard>
    </>
  );
}
