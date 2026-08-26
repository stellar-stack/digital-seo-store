import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { routing } from "@/i18n/routing";
import { getLegalDoc } from "@/lib/legal";
import Container from "@/components/ui/Container";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegalDoc("privacy-policy", locale);
  return { title: doc?.title ?? "Privacy Policy" };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const doc = getLegalDoc("privacy-policy", locale);
  if (!doc) notFound();

  return (
    <div className="bg-cream py-20 md:py-28">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {new Date(doc.updated).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-a:text-amber-ink prose-strong:text-ink">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
        </div>
      </Container>
    </div>
  );
}
