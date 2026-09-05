import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });
  return { title: t("title") };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYou");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-cream py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/8 blur-[140px]" />
      </div>
      <Container className="relative text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue text-2xl font-bold text-white">
          ✓
        </span>
        <h1 className="font-display mx-auto mt-8 max-w-xl text-3xl font-semibold text-ink md:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">{t("subtitle")}</p>
        <div className="mt-10">
          <MagneticButton as="a" href="/" variant="solid">
            {t("button")}
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
