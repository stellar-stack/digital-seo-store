import Container from "@/components/ui/Container";

type Item = { title: string };

export default function StatsStrip({ items }: { items: Item[] }) {
  return (
    <Container>
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-0">
        {items.map((item, i) => (
          <p
            key={item.title}
            className={
              i === 0
                ? "px-6 text-center text-sm font-bold uppercase tracking-wide text-ink md:text-[0.95rem]"
                : "px-6 text-center text-sm font-bold uppercase tracking-wide text-ink md:border-l md:border-ink/25 md:text-[0.95rem]"
            }
          >
            {item.title}
          </p>
        ))}
      </div>
    </Container>
  );
}
