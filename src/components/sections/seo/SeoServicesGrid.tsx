"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

type Item = { title: string; description: string };

export default function SeoServicesGrid({
  eyebrow,
  title,
  description,
  items,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
  cta: string;
}) {
  return (
    <section id="services" className="scroll-mt-24 bg-mist section-y">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="stack-gap grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group relative bg-white p-8 transition-colors duration-300 hover:bg-cream md:p-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-blue transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <MagneticButton as="a" href="/contact" variant="solid">
            {cta}
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
