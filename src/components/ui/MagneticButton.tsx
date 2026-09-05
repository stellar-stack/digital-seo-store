"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "inverted" | "ghost";
  strength?: number;
} & (
  | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

const springConfig = { stiffness: 200, damping: 18, mass: 0.4 };

const MotionLink = motion.create(Link);

export default function MagneticButton({
  children,
  className,
  variant = "solid",
  strength = 0.35,
  as = "button",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300";
  const variants = {
    solid: "bg-blue text-white hover:bg-blue-dark",
    outline: "border border-charcoal/20 text-charcoal hover:border-charcoal/50",
    inverted: "bg-white text-blue hover:bg-cream",
    ghost: "text-charcoal hover:text-blue-ink",
  };

  const sharedProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: clsx(base, variants[variant], className),
  };

  if (as === "a") {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isInternal = typeof href === "string" && href.startsWith("/");

    if (isInternal) {
      return (
        <MotionLink
          ref={ref}
          href={href as string}
          {...sharedProps}
          {...(anchorRest as Record<string, unknown>)}
        >
          {children}
        </MotionLink>
      );
    }

    return (
      <motion.a
        ref={ref}
        href={href}
        {...sharedProps}
        {...(anchorRest as Record<string, unknown>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      {...sharedProps}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}
