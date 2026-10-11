"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

/**
 * Holds its children out of the layout until the reader reaches the article's
 * closing section (the heading with `triggerId`), then unfolds them into place.
 * Scrolling back above that section folds them away again. The trigger line
 * matches PostToc's active-section rule, so this appears exactly when the last
 * Navigation entry lights up.
 */
export default function RevealAtEnd({
  triggerId,
  children,
  className,
}: {
  triggerId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = document.getElementById(triggerId);
    if (!el) {
      setShown(true);
      return;
    }
    const update = () => setShown(el.getBoundingClientRect().top <= window.innerHeight * 0.33);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [triggerId]);

  return (
    <div
      inert={!shown}
      className={clsx(
        "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        shown ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]",
        className
      )}
    >
      <div className={clsx("min-h-0", shown ? "overflow-visible" : "overflow-hidden")}>
        <div
          className={clsx(
            "pt-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
