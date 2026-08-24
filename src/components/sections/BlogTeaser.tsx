"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/lib/blog";

export default function BlogTeaser({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("home.blogTeaser");
  const locale = useLocale();

  return (
    <section className="bg-mist py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-xl hover:shadow-ink/5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-dark">
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="font-display mt-4 text-lg font-semibold leading-snug text-ink">
                  {post.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-dark opacity-0 transition-opacity group-hover:opacity-100">
                  {t("readMore")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
