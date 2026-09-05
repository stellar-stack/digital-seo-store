import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-cream py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/8 blur-[140px]" />
      </div>
      <Container className="relative text-center">
        <p className="font-display text-8xl font-semibold text-blue">404</p>
        <h1 className="font-display mx-auto mt-6 max-w-lg text-3xl font-semibold text-ink md:text-4xl">
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
