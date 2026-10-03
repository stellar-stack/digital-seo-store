import Container from "@/components/ui/Container";

export default function HireIntro({
  title,
  paragraphs,
  tone = "white",
}: {
  title: string;
  paragraphs: string[];
  tone?: "white" | "cream";
}) {
  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <h2 className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-muted md:pt-2 md:text-lg">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
