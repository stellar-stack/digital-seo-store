"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export default function PricingGrid({
  plans,
  note,
}: {
  plans: Plan[];
  note: string;
}) {
  return (
    <section className="bg-cream py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={clsx(
                "flex flex-col rounded-3xl p-8",
                plan.highlighted
                  ? "bg-blue text-white"
                  : "border border-line bg-white text-charcoal"
              )}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <p
                className={clsx(
                  "mt-2 text-sm leading-relaxed",
                  plan.highlighted ? "text-white/70" : "text-muted"
                )}
              >
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold">{plan.price}</span>
                <span className={clsx("text-sm", plan.highlighted ? "text-white/70" : "text-muted")}>
                  {plan.period}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={clsx(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        plan.highlighted ? "bg-white/25 text-white" : "bg-blue/15 text-blue-dark"
                      )}
                    >
                      ✓
                    </span>
                    <span className={plan.highlighted ? "text-white/90" : "text-charcoal/80"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <MagneticButton
                as="a"
                href="/contact"
                variant={plan.highlighted ? "inverted" : "outline"}
                className="mt-8 w-full justify-center"
              >
                {plan.cta}
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">{note}</p>
      </Container>
    </section>
  );
}
