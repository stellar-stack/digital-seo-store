import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { routing } from "@/i18n/routing";
import { getAllBlogPosts, getBlogPost, getBlogSlugs } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PostMeta from "@/components/blog/PostMeta";
import PostToc from "@/components/blog/PostToc";
import StickySidebar from "@/components/blog/StickySidebar";
import RevealAtEnd from "@/components/blog/RevealAtEnd";
import ShareLinks from "@/components/blog/ShareLinks";
import NewsletterBox from "@/components/blog/NewsletterBox";
import AuthorBio from "@/components/blog/AuthorBio";
import { getHeadings, nodeText, slugifyHeading } from "@/lib/headings";
import { DEFAULT_AUTHOR, DEFAULT_REVIEWER, getAuthor, type Author } from "@/content/authors";
import CTASection from "@/components/sections/CTASection";
import { absoluteUrl, organizationRef, breadcrumbList } from "@/lib/seo";

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-muted/70" fill="none">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-px h-[1.15rem] w-[1.15rem] shrink-0 sm:mt-0" aria-hidden>
      <path
        d="M10 1.2l2.1 1.6 2.6-.2.9 2.5 2.3 1.3-.6 2.6 1.1 2.4-1.9 1.8-.3 2.6-2.6.5-1.6 2.1L10 17.6l-2.4 1.1-1.6-2.1-2.6-.5-.3-2.6-1.9-1.8L2.3 9.3l-.6-2.6L4 5.4l.9-2.5 2.6.2L10 1.2Z"
        className="fill-blue"
      />
      <path d="M6.6 10.1l2.2 2.2 4.6-4.6" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Byline({ label, person }: { label: string; person: Author }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_2px_10px_-3px_rgba(10,14,26,0.18)] ring-2 ring-white">
        <Image
          src={person.image}
          alt=""
          fill
          sizes="56px"
          unoptimized={person.image.endsWith(".svg")}
          className="object-cover"
        />
      </span>
      <div className="text-[0.9375rem] leading-snug">
        <p className="text-muted">{label}</p>
        <p className="mt-1 text-charcoal">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-ink/40 underline-offset-[3px] transition-colors duration-300 hover:text-blue-ink hover:decoration-blue"
          >
            {person.name}
          </a>
          , {person.role}
        </p>
      </div>
    </div>
  );
}

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
  const tTeaser = await getTranslations("home.blogTeaser");
  const headings = getHeadings(post.content);
  const author = getAuthor(post.author, DEFAULT_AUTHOR);
  const reviewer = getAuthor(post.reviewer, DEFAULT_REVIEWER);
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
      <section className="relative bg-[#f3f6fb]">
        <Container>
          <div className="pb-10 pt-8 sm:pt-10 lg:w-1/2 lg:py-10 xl:w-[52%] xl:py-14">
            <nav aria-label="Breadcrumb" className="animate-rise">
              <ol className="flex items-center gap-x-3 text-[0.9375rem] text-muted">
                <li className="shrink-0">
                  <Link href="/" className="transition-colors hover:text-ink">
                    {tCommon("home")}
                  </Link>
                </li>
                <li aria-hidden className="shrink-0"><Chevron /></li>
                <li className="shrink-0">
                  <Link href="/blog" className="transition-colors hover:text-ink">
                    {tBlog("hero.eyebrow")}
                  </Link>
                </li>
                <li aria-hidden className="shrink-0"><Chevron /></li>
                <li aria-current="page" className="min-w-0 truncate text-ink">
                  {post.title}
                </li>
              </ol>
            </nav>

            <div className="mt-7 animate-rise [--d:70ms]">
              <p className="inline-flex items-start gap-2 rounded-2xl bg-blue/[0.08] px-4 py-2 text-[0.9375rem] leading-snug text-charcoal sm:items-center sm:rounded-full">
                <VerifiedIcon />
                {tBlog("post.humanBadge")}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4 animate-rise [--d:140ms]">
              <Byline label={tBlog("post.writtenBy")} person={author} />
              <Byline label={tBlog("post.reviewedBy")} person={reviewer} />
            </div>

            <h1 className="font-display mt-7 animate-rise text-pretty [--d:210ms] text-[2rem] font-bold leading-[1.15] tracking-tight text-ink sm:text-[2.5rem] lg:text-[2.25rem] xl:mt-8 xl:text-[2.75rem] 2xl:text-5xl">
              {post.title}
            </h1>

            <PostMeta
              readTime={post.readTime}
              date={post.date}
              locale={locale}
              lastUpdatedLabel={tTeaser("lastUpdated")}
              className="mt-6 animate-rise text-[0.9375rem] [--d:280ms] sm:text-base lg:mt-8"
            />
          </div>
        </Container>

        {post.image && (
          <div className="px-5 pb-10 sm:px-6 lg:absolute lg:right-0 lg:top-0 lg:aspect-[3/2] lg:h-full lg:max-w-[45%] lg:p-0">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:rounded-none">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="animate-settle object-cover lg:object-left"
              />
            </div>
          </div>
        )}
      </section>

      <div className="bg-white section-y">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[21rem_minmax(0,1fr)] xl:gap-16">
            <StickySidebar className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <PostToc
                headings={headings}
                label={tBlog("post.navigation")}
                showAllLabel={tBlog("post.showAllToc")}
              />
              <ShareLinks
                url={postUrl}
                title={post.title}
                label={tBlog("post.share")}
                shareOn={(network) => tBlog("post.shareOn", { network })}
                className="mt-10 hidden lg:flex"
              />
              <div className="hidden lg:block">
                <RevealAtEnd triggerId={headings.at(-1)?.id ?? "post-author"}>
                  <NewsletterBox />
                </RevealAtEnd>
              </div>
            </StickySidebar>

            <div className="min-w-0 max-w-3xl">
              <div className="prose prose-neutral max-w-none [--tw-prose-bullets:var(--color-blue)] prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink prose-h2:mb-5 prose-h2:mt-16 prose-h2:scroll-mt-28 prose-h2:text-[1.625rem] prose-h2:leading-[1.2] md:prose-h2:text-[2rem] prose-h3:mb-3 prose-h3:mt-11 prose-h3:text-[1.25rem] prose-h3:leading-snug md:prose-h3:text-[1.375rem] prose-h4:mb-2 prose-h4:mt-8 prose-h4:text-[1.0625rem] prose-p:my-5 prose-p:leading-[1.75] prose-p:text-charcoal md:prose-p:text-[1.0625rem] prose-a:text-blue-ink prose-a:underline-offset-4 prose-strong:font-semibold prose-strong:text-ink prose-ul:my-5 prose-li:my-1.5 prose-li:text-charcoal md:prose-li:text-[1.0625rem] [&>p:first-child]:mt-0 [&>p:first-child]:text-lg [&>p:first-child]:leading-[1.7] [&>p:first-child]:text-muted sm:[&>p:first-child]:text-xl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => <h2 id={slugifyHeading(nodeText(children))}>{children}</h2>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <AuthorBio
                author={author}
                label={tBlog("post.author")}
                linkedinLabel={tBlog("post.onLinkedin", { name: author.name })}
              />

              <div className="mt-12 space-y-8 lg:hidden">
                <ShareLinks
                  url={postUrl}
                  title={post.title}
                  label={tBlog("post.share")}
                  shareOn={(network) => tBlog("post.shareOn", { network })}
                />
                <NewsletterBox />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {related.length > 0 && (
        <div className="border-t border-line bg-cream section-y">
          <Container className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
              {tBlog("hero.eyebrow")}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-line bg-white p-5 text-sm font-semibold text-ink transition-colors hover:border-blue/40"
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
