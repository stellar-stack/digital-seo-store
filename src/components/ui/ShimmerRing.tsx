"use client";

import { clsx } from "clsx";

export default function ShimmerRing({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "relative inline-flex shrink-0 overflow-hidden rounded-full p-[1.5px]",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-[-60%] animate-[shimmer-spin_2.6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.95)_10deg,rgba(245,166,35,1)_28deg,transparent_55deg,transparent_360deg)]"
      />
      <span className="relative z-10 rounded-full">{children}</span>
    </span>
  );
}
