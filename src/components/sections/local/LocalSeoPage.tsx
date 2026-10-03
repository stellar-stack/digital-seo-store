import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import MobileStackCard from "@/components/ui/MobileStackCard";
import StatsStrip from "@/components/sections/StatsStrip";
import type { FAQItem } from "@/components/ui/FAQAccordion";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ComparisonTable from "@/components/sections/ComparisonTable";
import LocalHero from "@/components/sections/local/LocalHero";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalIntro from "@/components/sections/local/LocalIntro";
import LocalProcess from "@/components/sections/local/LocalProcess";
import LocalClosing from "@/components/sections/local/LocalClosing";

type Step = { title: string; description: string };
type Pair = { title: string; description: string };

function flattenAnswer(answer: FAQItem["answer"]): string {
  const blocks = Array.isArray(answer) ? answer : [answer];
  return blocks.map((b) => (typeof b === "string" ? b : b.list.join(" "))).join(" ");
}

export default async function LocalSeoPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "localSeoPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const faqItems = t.raw("faq.items") as FAQItem[];
  const path = "/services/local-seo";

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
        acceptedAnswer: { "@type": "Answer", text: flattenAnswer(item.answer) },
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

      <LocalHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        points={t.raw("hero.points") as string[]}
        cta={t("hero.cta")}
        footer={<StatsStrip items={t.raw("about.items") as Pair[]} />}
      />
      <MobileStackCard>
        <LocalServices
          title={t("services.title")}
          description={t("services.description")}
          items={t.raw("services.items") as { title: string; paragraphs: string[] }[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalIntro title={t("intro.title")} paragraphs={t.raw("intro.paragraphs") as string[]} />
      </MobileStackCard>
      <MobileStackCard round={false}>
        <ComparisonTable showClosing />
      </MobileStackCard>
      <MobileStackCard>
        <LocalProcess title={t("process.title")} steps={t.raw("process.steps") as Step[]} />
      </MobileStackCard>
      <MobileStackCard>
        <LocalClosing title={t("closing.title")} paragraphs={t.raw("closing.paragraphs") as string[]} />
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
