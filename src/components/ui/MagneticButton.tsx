"use client";

import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "inverted" | "ghost";
} & (
  | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue disabled:pointer-events-none disabled:opacity-60";

const variants = {
  solid: "bg-blue text-white duration-500 hover:bg-blue-dark active:bg-blue-ink",
  outline: "border border-charcoal/20 text-charcoal duration-500 hover:border-blue hover:text-white hover:delay-100",
  inverted: "bg-white text-blue hover:bg-mist",
  ghost: "text-charcoal hover:text-blue-ink",
};

export default function MagneticButton({
  children,
  className,
  variant = "solid",
  as = "button",
  ...rest
}: Props) {
  const classes = clsx(base, variants[variant], className);

  const content = (
    <>
      {variant === "outline" && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-blue transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-100 group-focus-visible:scale-100"
        />
      )}
      {children}
    </>
  );

  if (as === "a") {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    if (typeof href === "string" && href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
