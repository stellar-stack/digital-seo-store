import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllBlogPosts } from "@/lib/blog";
import Hero from "@/components/sections/Hero";
import IntroStatement from "@/components/sections/IntroStatement";
import ServicesIndex from "@/components/sections/ServicesIndex";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Testimonials from "@/components/sections/Testimonials";
import BlogTeaser from "@/components/sections/BlogTeaser";
import FAQPreview from "@/components/sections/FAQPreview";
import SignupSection from "@/components/sections/SignupSection";
import MobileStackCard from "@/components/ui/MobileStackCard";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const posts = getAllBlogPosts(locale).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Digital SEO Store",
    url: "https://digitalseostore.com",
    logo: "https://digitalseostore.com/brand/logo.png",
    description: t("description"),
    foundingDate: "2021",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "1290 Oconee St",
        addressLocality: "Athens",
        addressRegion: "GA",
        postalCode: "30605",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "12473 91A Avenue",
        addressLocality: "Surrey",
        addressRegion: "BC",
        addressCountry: "CA",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-250-505-6094",
      email: "hello@digitalseostore.com",
      contactType: "sales",
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <MobileStackCard>
        <IntroStatement />
      </MobileStackCard>
      <MobileStackCard>
        <ServicesIndex />
      </MobileStackCard>
      <MobileStackCard>
        <ProcessSteps namespace="home.process" />
      </MobileStackCard>
      <MobileStackCard round={false}>
        <ComparisonTable showClosing />
      </MobileStackCard>
      <MobileStackCard>
        <Testimonials />
      </MobileStackCard>
      <MobileStackCard>
        <BlogTeaser posts={posts} />
      </MobileStackCard>
      <MobileStackCard>
        <FAQPreview />
      </MobileStackCard>
      <MobileStackCard>
        <SignupSection />
      </MobileStackCard>
    </>
  );
}
