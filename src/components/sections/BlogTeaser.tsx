"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import PostMeta from "@/components/blog/PostMeta";
import type { BlogPost } from "@/lib/blog";

export default function BlogTeaser({
  posts,
  title,
  description,
  tone = "white",
}: {
  posts: BlogPost[];
  title?: string;
  description?: string;
  tone?: "white" | "mist";
}) {
  const t = useTranslations("home.blogTeaser");
  const locale = useLocale();

  const eyebrow = title ? undefined : t("eyebrow");
  const heading = title ?? t("title");
  const intro = title ? description : t("description");

  return (
    <section className={tone === "mist" ? "bg-mist section-y" : "bg-white section-y"}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wide text-muted/80">{eyebrow}</p>
          )}
          <h2 className="font-display mt-3 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          {intro && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p>}
        </motion.div>

        <div className="stack-gap grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-none">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-mist ring-1 ring-ink/5 group-focus-visible:ring-2 group-focus-visible:ring-blue">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  )}
                </div>

                <PostMeta
                  readTime={post.readTime}
                  date={post.date}
                  locale={locale}
                  lastUpdatedLabel={t("lastUpdated")}
                  className="mt-5 text-sm"
                />

                <h3 className="font-display mt-3 text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-blue-ink md:text-xl">
                  {post.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href="/blog"
            className="inline-flex min-w-[15rem] items-center justify-center rounded-xl border-2 border-blue px-10 py-3.5 text-base font-semibold text-blue transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            {t("showMore")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
