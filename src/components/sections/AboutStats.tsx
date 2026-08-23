"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import StatCounter from "@/components/ui/StatCounter";

const STATS = [
  { value: 45, suffix: "+", key: "experts" },
  { value: 75, suffix: "+", key: "clients" },
  { value: 5, suffix: "+", key: "years" },
  { value: 3, suffix: "", key: "offices" },
] as const;

export default function AboutStats() {
  const t = useTranslations("about.stats");

  return (
    <section className="border-y border-line bg-mist py-16">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((s) => (
            <StatCounter key={s.key} value={s.value} suffix={s.suffix} label={t(s.key)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
