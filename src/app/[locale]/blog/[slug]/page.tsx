import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { routing } from "@/i18n/routing";
import { getAllBlogPosts, getBlogPost, getBlogSlugs } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBlogSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const tCommon = await getTranslations("common");
  const tBlog = await getTranslations("blogPage");
  const related = getAllBlogPosts(locale)
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const postUrl = absoluteUrl(`/blog/${slug}`, locale);
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: organizationRef(),
    publisher: organizationRef(),
    image: absoluteUrl(`/blog/${slug}/opengraph-image`, locale),
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    url: postUrl,
  };

  const breadcrumbSchema = breadcrumbList([
    { name: tCommon("home"), url: absoluteUrl("/", locale) },
    { name: tBlog("hero.eyebrow"), url: absoluteUrl("/blog", locale) },
    { name: post.title, url: postUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="relative overflow-hidden bg-ink pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-amber/15 blur-[130px]" />
        </div>
        <Container className="relative max-w-3xl">
          <div className="mb-8 flex items-center gap-2 text-xs font-medium text-white/40">
            <Link href="/" className="hover:text-white/70">
              {tCommon("home")}
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/70">
              {tBlog("hero.eyebrow")}
            </Link>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber">
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readTime}
          </p>
          <h1 className="font-display mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </Container>
      </article>

      <div className="bg-cream py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-a:text-amber-ink prose-strong:text-ink">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </Container>
      </div>

      {related.length > 0 && (
        <div className="border-t border-line bg-cream pb-16">
          <Container className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
              {tBlog("hero.eyebrow")}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-line bg-white p-5 text-sm font-semibold text-ink transition-colors hover:border-amber/40"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      <CTASection />
    </>
  );
}
