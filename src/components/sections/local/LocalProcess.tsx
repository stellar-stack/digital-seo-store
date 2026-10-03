"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";

type Step = { title: string; description: string };

const DEFAULT_HIGHLIGHT = "success-driven";

export default function LocalProcess({
  title,
  description,
  highlight = DEFAULT_HIGHLIGHT,
  steps,
  tone = "white",
}: {
  title: string;
  description?: string;
  highlight?: string;
  steps: Step[];
  tone?: "white" | "cream";
}) {
  const at = title.indexOf(highlight);

  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <h2 className="font-display mx-auto max-w-3xl text-center text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
          {at === -1 ? (
            title
          ) : (
            <>
              {title.slice(0, at)}
              <span className="text-blue">{highlight}</span>
              {title.slice(at + highlight.length)}
            </>
          )}
        </h2>
        {description && (
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        )}

        <ol className="mx-auto mt-16 max-w-4xl">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            const textOnLeft = i % 2 === 0;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[1fr_auto_1fr] md:gap-x-12"
              >
                <div className="col-start-1 row-start-1 flex flex-col items-center md:col-start-2">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue/10 font-display text-lg font-semibold text-blue">
                    {i + 1}
                  </span>
                  {!last && (
                    <span
                      aria-hidden
                      className="my-2 min-h-[3.5rem] flex-1 border-l-2 border-dashed border-blue/45"
                    />
                  )}
                </div>

                <div
                  className={clsx(
                    "col-start-2 row-start-1 pb-9 pt-2 md:pb-10",
                    textOnLeft ? "md:col-start-1 md:text-right" : "md:col-start-3"
                  )}
                >
                  <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
                  <p
                    className={clsx(
                      "mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted",
                      textOnLeft && "md:ml-auto"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
