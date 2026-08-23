"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ServiceHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
  breadcrumbLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  breadcrumbLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-16 pb-24 md:pt-20 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-amber/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 text-xs font-medium text-white/40"
        >
          <Link href="/" className="hover:text-white/70">
            {breadcrumbLabel}
          </Link>
          <span>/</span>
          <span className="text-white/60">{title}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-amber mb-6"
        >
          {eyebrow}
        </motion.p>

        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              {title}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {ctaLabel && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-9"
          >
            <MagneticButton as="a" href={ctaHref} variant="solid">
              {ctaLabel}
            </MagneticButton>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
