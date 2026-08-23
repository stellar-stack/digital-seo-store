import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion, { FAQItem } from "@/components/ui/FAQAccordion";

export default function ServiceFAQ({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: FAQItem[];
}) {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <div className="mt-12">
          <FAQAccordion items={items} />
        </div>
      </Container>
    </section>
  );
}
