import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAnswerCategories } from "@/lib/answers";
import AnswersExplorer from "@/components/sections/AnswersExplorer";
import CTASection from "@/components/sections/CTASection";
import { absoluteUrl, breadcrumbList } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "answersPage" });
  return { title: t("title") };
}

export default async function AnswersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("answersPage");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const categories = getAnswerCategories(locale);

  // Only questions with an answer qualify for FAQ rich results.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((c) =>
      c.items
        .filter((item) => item.answer)
        .map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        }))
    ),
  };

  const breadcrumbSchema = breadcrumbList([
    { name: tCommon("home"), url: absoluteUrl("/", locale) },
    { name: tNav("answers"), url: absoluteUrl("/answers", locale) },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AnswersExplorer
        categories={categories}
        labels={{
          title: t("title"),
          searchPlaceholder: t("searchPlaceholder"),
          search: t("search"),
          clearSearch: t("clearSearch"),
          topics: t("topics"),
          noResults: t.raw("noResults") as string,
        }}
      />
      <CTASection />
    </>
  );
}
