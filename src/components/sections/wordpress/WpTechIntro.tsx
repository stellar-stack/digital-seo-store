import Container from "@/components/ui/Container";

export default function WpTechIntro({ title, description, tone = "white" }: { title: string; description: string; tone?: "white" | "cream" }) {
  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{description}</p>
        </div>
      </Container>
    </section>
  );
}
