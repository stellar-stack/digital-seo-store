"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import type { Heading } from "@/lib/headings";

const COLLAPSED_COUNT = 6;

function TocLinks({
  headings,
  active,
  indicator = false,
  revealFrom,
}: {
  headings: Heading[];
  active: string | null;
  indicator?: boolean;
  revealFrom?: number;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const [bar, setBar] = useState<{ y: number; h: number } | null>(null);

  // One indicator that slides between entries rather than one per entry, so the
  // reader's position reads as continuous movement.
  useLayoutEffect(() => {
    if (!indicator) return;
    // Measure the row, not the link: a row that is still animating in carries a
    // transform, which would make the link's offsets relative to the row itself.
    const row = active
      ? listRef.current?.querySelector<HTMLElement>(`a[href="#${CSS.escape(active)}"]`)?.closest("li")
      : null;
    setBar(row ? { y: row.offsetTop, h: row.offsetHeight } : null);
  }, [indicator, active, headings]);

  return (
    <ol ref={listRef} className="relative space-y-1">
      {indicator && (
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-0 w-0.5 rounded-full bg-blue transition-[transform,height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translateY(${(bar?.y ?? 0) + 8}px)`,
            height: Math.max((bar?.h ?? 0) - 16, 0),
            opacity: bar ? 1 : 0,
          }}
        />
      )}
      {headings.map((h, i) => {
        const reveal = revealFrom !== undefined && i >= revealFrom;
        return (
          <li
            key={h.id}
            className={reveal ? "animate-toc-reveal" : undefined}
            style={reveal ? { animationDelay: `${(i - revealFrom) * 35}ms` } : undefined}
          >
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={clsx(
                "block rounded-sm py-2.5 text-[0.9375rem] leading-snug transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
                active === h.id ? "font-medium text-blue-ink" : "text-charcoal hover:text-blue-ink"
              )}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function PostToc({
  headings,
  label,
  showAllLabel,
}: {
  headings: Heading[];
  label: string;
  showAllLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const collapsible = headings.length > COLLAPSED_COUNT + 1;
  const activeIndex = headings.findIndex((h) => h.id === active);
  // While collapsed, the section being read joins the list if it sits past the
  // cut, so the reader never loses their place.
  const visible =
    collapsible && !expanded
      ? [
          ...headings.slice(0, COLLAPSED_COUNT),
          ...(activeIndex >= COLLAPSED_COUNT ? [headings[activeIndex]] : []),
        ]
      : headings;

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // The active entry is the last heading that has scrolled past the upper
    // third of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      <details className="group border-y border-line lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
          {label}
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-charcoal transition-transform duration-300 group-open:rotate-180" fill="none" aria-hidden>
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <nav aria-label={label} className="pb-4">
          <TocLinks headings={headings} active={active} />
        </nav>
      </details>

      <nav aria-label={label} className="hidden lg:block">
        <p className="font-display text-xl font-semibold text-ink">{label}</p>
        <div className="mt-5">
          <TocLinks
            headings={visible}
            active={active}
            indicator
            revealFrom={COLLAPSED_COUNT}
          />
        </div>
        {collapsible && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="font-display mt-5 rounded-sm text-lg font-semibold text-blue transition-colors duration-300 hover:text-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
          >
            {showAllLabel}
          </button>
        )}
      </nav>
    </>
  );
}
