import { getTranslations } from "next-intl/server";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Contact Digital SEO Store";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return renderOgImage({
    eyebrow: t("hero.eyebrow"),
    title: t("hero.title"),
    description: t("hero.subtitle"),
  });
}
