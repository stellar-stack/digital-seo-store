"use client";

import { KeyboardEvent, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { getServerTheme, getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

const OPTIONS: { value: Theme; swatch: string }[] = [
  { value: "blue", swatch: "#0071e3" },
  { value: "orange", swatch: "#ffad00" },
];

// Modelled on the Accent Color picker in Apple's System Settings: a row of
// colour wells where the selected one carries a ring. Each well has a 44pt
// tall hit area around a 20pt dot.
export default function ThemeSwitch({ className }: { className?: string }) {
  const t = useTranslations("nav.theme");
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next = OPTIONS[(OPTIONS.findIndex((o) => o.value === theme) + 1) % OPTIONS.length];
    setTheme(next.value);
    refs.current[OPTIONS.indexOf(next)]?.focus();
  }

  return (
    <div role="radiogroup" aria-label={t("label")} onKeyDown={onKeyDown} className={clsx("flex items-center", className)}>
      {OPTIONS.map((option, i) => {
        const selected = theme === option.value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={t(option.value)}
            title={t(option.value)}
            tabIndex={selected ? 0 : -1}
            onClick={() => setTheme(option.value)}
            className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
          >
            <span
              aria-hidden
              className={clsx(
                "block h-5 w-5 rounded-full shadow-[inset_0_0_0_1px_rgba(10,14,26,0.12)] outline outline-2 outline-offset-2 transition-[outline-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-active:scale-95",
                selected ? "outline-charcoal/40" : "outline-transparent"
              )}
              style={{ backgroundColor: option.swatch }}
            />
          </button>
        );
      })}
    </div>
  );
}
