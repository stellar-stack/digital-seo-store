import { getTranslations } from "next-intl/server";
import { getBlogPost } from "@/lib/blog";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Digital SEO Store Blog";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) {
    return renderOgImage({ title: "Digital SEO Store", description: "" });
  }

  const tBlog = await getTranslations({ locale, namespace: "blogPage" });

  return renderOgImage({
    eyebrow: tBlog("hero.eyebrow"),
    title: post.title,
    description: post.excerpt,
  });
}
