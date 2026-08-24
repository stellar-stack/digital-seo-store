"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function SectionPhoto({
  src,
  alt,
  tone = "light",
  className,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "relative overflow-hidden rounded-3xl border",
        tone === "dark" ? "border-white/10" : "border-line",
        className
      )}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </motion.div>
  );
}
