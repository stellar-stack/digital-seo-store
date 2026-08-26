import { getTranslations } from "next-intl/server";
import { services } from "@/config/services";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og";

export const alt = "Digital SEO Store Service";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return renderOgImage({ title: "Digital SEO Store", description: "" });
  }

  const t = await getTranslations({ locale, namespace: `services.${service.key}` });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return renderOgImage({
    eyebrow: tNav("servicesLabel"),
    title: t("hero.title"),
    description: t("hero.subtitle"),
  });
}
