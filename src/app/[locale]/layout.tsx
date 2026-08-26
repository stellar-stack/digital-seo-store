import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { HeaderVisibilityProvider } from "@/components/providers/HeaderVisibility";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://digitalseostore.com"),
    title: {
      default: t("titleDefault"),
      template: `%s | Digital SEO Store`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
        >
          {tCommon("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <HeaderVisibilityProvider>
              <Header />
              <main id="main-content" className="flex-1 pt-20">
                {children}
              </main>
              <Footer />
              <ScrollProgress />
              <BackToTop />
            </HeaderVisibilityProvider>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
