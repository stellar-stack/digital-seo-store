import { getTranslations } from "next-intl/server";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";
import MobileStackCard from "@/components/ui/MobileStackCard";
import type { FAQItem } from "@/components/ui/FAQAccordion";
import BlogTeaser from "@/components/sections/BlogTeaser";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import StatsStrip from "@/components/sections/StatsStrip";
import CroServices from "@/components/sections/cro/CroServices";
import LocalIntro from "@/components/sections/local/LocalIntro";
import LocalProcess from "@/components/sections/local/LocalProcess";
import EcomBenefits from "@/components/sections/ecommerce/EcomBenefits";
import EcomWhyDss from "@/components/sections/ecommerce/EcomWhyDss";
import EcomHero from "@/components/sections/ecommerce/EcomHero";
import CtaBand from "@/components/sections/ecommerce/CtaBand";
import { SOCIAL_SERVICE_ICONS } from "@/components/sections/social/SocialIcons";
import { SocialArt } from "@/components/sections/social/SocialArt";

type Pair = { title: string; description: string };

export default async function SocialServicesPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "socialServicesPage" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const faqItems = t.raw("faq.items") as FAQItem[];
  const path = "/services/social-media-marketing";

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
        art={<SocialArt />}
        footer={<StatsStrip items={t.raw("about.items") as Pair[]} />}
      />
      <MobileStackCard>
        <CroServices
          title={t("services.title")}
          paragraphs={[t("services.description")]}
          items={t.raw("services.items") as Pair[]}
          icons={SOCIAL_SERVICE_ICONS}
        />
      </MobileStackCard>
      <MobileStackCard>
        <LocalIntro title={t("cta.title")} paragraphs={t.raw("cta.paragraphs") as string[]} />
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
          steps={t.raw("process.steps") as Pair[]}
        />
      </MobileStackCard>
      <MobileStackCard>
        <CtaBand
          tone="cream"
          title={t("cta2.title")}
          paragraphs={t.raw("cta2.paragraphs") as string[]}
          button={t("cta2.button")}
          art={<SocialArt background={false} />}
          reverse
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
