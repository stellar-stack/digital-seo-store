"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeading from "@/components/ui/SectionHeading";

export default function IntroStatement() {
  const t = useTranslations("home.intro");

  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="mt-10 flex justify-center">
            <MagneticButton as="a" href="/contact" variant="outline">
              {t("cta")}
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
