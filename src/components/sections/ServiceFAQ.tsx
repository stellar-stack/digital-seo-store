import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion, { FAQItem } from "@/components/ui/FAQAccordion";

export default function ServiceFAQ({
  eyebrow,
  title,
  items,
  id,
  tone = "cream",
}: {
  id?: string;
  tone?: "cream" | "white";
  eyebrow?: string;
  title?: string;
  items: FAQItem[];
}) {
  return (
    <section id={id} className={`scroll-mt-24 section-y ${tone === "white" ? "bg-white" : "bg-cream"}`}>
      <Container className="max-w-4xl">
        {title && <SectionHeading eyebrow={eyebrow} title={title} align="center" />}
        <div className={title ? "mt-12" : undefined}>
          <FAQAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
