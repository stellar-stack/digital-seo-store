"use client";

import { FormEvent, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import StickySidebar from "@/components/blog/StickySidebar";
import { useHeaderHidden } from "@/components/providers/HeaderVisibility";
import type { AnswerCategory, AnswerItem } from "@/lib/answers";

type Labels = {
  title: string;
  searchPlaceholder: string;
  search: string;
  clearSearch: string;
  topics: string;
  noResults: string; // contains "{query}"
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function fold(s: string) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  // Neighbouring matched words become one continuous highlight.
  const word = `(?:${terms.map(escapeRegExp).join("|")})`;
  const parts = text.split(new RegExp(`(${word}(?:\\s+${word})*)`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-[3px] bg-blue/15 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-500",
        EASE,
        open ? "rotate-180 bg-blue/15 text-blue-ink" : "bg-mist text-charcoal group-hover:bg-blue/10 group-hover:text-blue-ink"
      )}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function AnswerRow({
  item,
  terms,
  open,
  onToggle,
}: {
  item: AnswerItem;
  terms: string[];
  open: boolean;
  onToggle: () => void;
}) {
  // Questions without an answer yet are listed, but are not interactive.
  if (item.answer === null) {
    return (
      <li id={item.id} className="scroll-mt-40 border-b border-line py-5 text-base leading-snug text-ink md:text-[1.0625rem] lg:scroll-mt-28">
        <Highlight text={item.question} terms={terms} />
      </li>
    );
  }

  const panelId = `${item.id}-answer`;
  return (
    <li id={item.id} className="scroll-mt-40 border-b border-line lg:scroll-mt-28">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-6 rounded-md py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          <span className="text-base font-medium leading-snug text-ink md:text-[1.0625rem]">
            <Highlight text={item.question} terms={terms} />
          </span>
          <Chevron open={open} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-label={item.question}
        inert={!open}
        className={clsx("grid transition-[grid-template-rows] duration-500", EASE, open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className={clsx(
              "max-w-[68ch] pb-6 pr-14 text-[0.9375rem] leading-[1.75] text-muted transition-opacity duration-500 md:text-base",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            <Highlight text={item.answer} terms={terms} />
          </p>
        </div>
      </div>
    </li>
  );
}

export default function AnswersExplorer({
  categories,
  labels,
}: {
  categories: AnswerCategory[];
  labels: Labels;
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const [active, setActive] = useState<string | null>(categories[0]?.id ?? null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const headerHidden = useHeaderHidden();

  const terms = useMemo(() => fold(deferred.trim()).split(/\s+/).filter(Boolean), [deferred]);
  const searching = terms.length > 0;

  // Every word must appear in the question or its answer (case- and accent-insensitive).
  const results = useMemo(() => {
    if (!searching) return categories.map((c) => ({ ...c, answerHits: new Set<string>() }));
    return categories
      .map((c) => {
        const answerHits = new Set<string>();
        const items = c.items.filter((item) => {
          const q = fold(item.question);
          const a = item.answer ? fold(item.answer) : "";
          if (!terms.every((t) => q.includes(t) || a.includes(t))) return false;
          if (!terms.every((t) => q.includes(t))) answerHits.add(item.id);
          return true;
        });
        return { ...c, items, answerHits };
      })
      .filter((c) => c.items.length > 0);
  }, [categories, terms, searching]);

  // Answers that matched the search (rather than their question) open once per
  // search so the match is visible, and can still be closed by the reader.
  useEffect(() => {
    const hits = results.flatMap((c) => [...c.answerHits]);
    if (hits.length) setOpenIds((prev) => new Set([...prev, ...hits]));
  }, [results]);

  // Restore a shared search (?q=) and open a linked answer (#question-id).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && categories.some((c) => c.items.some((i) => i.id === hash && i.answer))) {
      setOpenIds(new Set([hash]));
    }
  }, [categories]);

  // Keep the address shareable without adding history entries per keystroke.
  useEffect(() => {
    const url = new URL(window.location.href);
    const q = deferred.trim();
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);
  }, [deferred]);

  // Active topic: the last visible section whose top has passed the upper third.
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.33;
      let current: string | null = results[0]?.id ?? null;
      for (const c of results) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) current = c.id;
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
  }, [results]);

  // Sliding indicator for the desktop topic list.
  const listRef = useRef<HTMLOListElement>(null);
  const [bar, setBar] = useState<{ y: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const row = active ? listRef.current?.querySelector<HTMLElement>(`[data-topic="${active}"]`) : null;
    setBar(row ? { y: row.offsetTop, h: row.offsetHeight } : null);
  }, [active, results]);

  // Keep the active mobile tab in view inside its scroller.
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroller = tabsRef.current;
    const tab = active ? scroller?.querySelector<HTMLElement>(`[data-topic="${active}"]`) : null;
    if (!scroller || !tab) return;
    const target = tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    inputRef.current?.blur();
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const counts = new Map(results.map((c) => [c.id, c.items.length]));

  return (
    <>
      <section className="relative overflow-hidden bg-[#f3f6fb]">
        <Container className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,7vw,5.5rem)]">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display animate-rise text-balance text-[2.25rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              {labels.title}
            </h1>

            <form role="search" onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl animate-rise [--d:90ms] sm:mt-10">
              <div
                className={clsx(
                  "flex items-center rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,14,26,0.06),0_12px_32px_-16px_rgba(10,14,26,0.22)] ring-1 ring-ink/[0.07] transition-[box-shadow] duration-300",
                  "focus-within:shadow-[0_0_0_4px_rgba(0,113,227,0.15),0_12px_32px_-16px_rgba(10,14,26,0.22)] focus-within:ring-blue/50"
                )}
              >
                <svg viewBox="0 0 20 20" className="ml-3.5 h-5 w-5 shrink-0 text-muted sm:ml-5" fill="none" aria-hidden>
                  <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={labels.searchPlaceholder}
                  aria-label={labels.searchPlaceholder}
                  autoComplete="off"
                  enterKeyHint="search"
                  className="h-14 min-w-0 flex-1 text-ellipsis bg-transparent px-2.5 text-base text-ink outline-none placeholder:text-muted sm:h-16 sm:px-3 sm:text-lg [&::-webkit-search-cancel-button]:appearance-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label={labels.clearSearch}
                    className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-blue"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className={clsx(
                    "m-1.5 h-11 shrink-0 rounded-xl bg-blue px-4 text-[0.9375rem] font-semibold text-white transition-[background-color,transform] duration-300 hover:bg-blue-dark active:scale-[0.97] active:bg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue sm:m-2 sm:h-12 sm:px-7 sm:text-base",
                    EASE
                  )}
                >
                  {labels.search}
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      <div ref={resultsRef} className="scroll-mt-20 bg-white section-y">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[21rem_minmax(0,1fr)] xl:gap-16">
            <StickySidebar className="hidden min-w-0 lg:sticky lg:top-28 lg:block lg:self-start">
              <nav aria-label={labels.topics}>
                <ol ref={listRef} className="relative space-y-1">
                  <span
                    aria-hidden
                    className={clsx("pointer-events-none absolute -left-4 top-0 w-0.5 rounded-full bg-blue transition-[transform,height,opacity] duration-500", EASE)}
                    style={{
                      transform: `translateY(${(bar?.y ?? 0) + 8}px)`,
                      height: Math.max((bar?.h ?? 0) - 16, 0),
                      opacity: bar ? 1 : 0,
                    }}
                  />
                  {categories.map((c) => {
                    const count = counts.get(c.id) ?? 0;
                    const available = count > 0;
                    return (
                      <li key={c.id} data-topic={c.id}>
                        <a
                          href={`#${c.id}`}
                          aria-current={active === c.id ? "location" : undefined}
                          aria-disabled={!available || undefined}
                          tabIndex={available ? undefined : -1}
                          className={clsx(
                            "flex items-baseline justify-between gap-4 rounded-sm py-2.5 text-[0.9375rem] leading-snug transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
                            !available
                              ? "pointer-events-none text-charcoal/35"
                              : active === c.id
                                ? "font-medium text-blue-ink"
                                : "text-charcoal hover:text-blue-ink"
                          )}
                        >
                          {c.title}
                          {searching && available && <span className="text-sm tabular-nums text-muted">{count}</span>}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </StickySidebar>

            <div className="min-w-0 max-w-3xl">
              {results.length > 0 && (
                <div
                  ref={tabsRef}
                  className={clsx(
                    "sticky z-20 -mx-5 mb-8 flex gap-6 overflow-x-auto border-b border-line bg-white/90 px-5 backdrop-blur-xl transition-[top] duration-500 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden",
                    EASE,
                    headerHidden ? "top-0" : "top-20"
                  )}
                >
                  {results.map((c) => (
                    <a
                      key={c.id}
                      href={`#${c.id}`}
                      data-topic={c.id}
                      aria-current={active === c.id ? "location" : undefined}
                      className={clsx(
                        "relative shrink-0 whitespace-nowrap py-3.5 text-[0.9375rem] transition-colors duration-300",
                        active === c.id ? "font-medium text-ink" : "text-muted"
                      )}
                    >
                      {c.title}
                      <span
                        aria-hidden
                        className={clsx(
                          "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue transition-transform duration-500",
                          EASE,
                          active === c.id ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </a>
                  ))}
                </div>
              )}

              {results.length === 0 ? (
                <p role="status" className="py-16 text-center text-lg text-muted">
                  {labels.noResults.replace("{query}", deferred.trim())}
                </p>
              ) : (
                results.map((c, ci) => (
                  <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className={clsx("scroll-mt-40 lg:scroll-mt-28", ci > 0 && "mt-16 md:mt-20")}>
                    <h2 id={`${c.id}-title`} className="font-display text-[1.625rem] font-semibold leading-[1.2] tracking-tight text-ink md:text-[2rem]">
                      {c.title}
                    </h2>
                    <ul className="mt-5 border-t border-line md:mt-6">
                      {c.items.map((item) => (
                        <AnswerRow
                          key={item.id}
                          item={item}
                          terms={terms}
                          open={openIds.has(item.id)}
                          onToggle={() => toggle(item.id)}
                        />
                      ))}
                    </ul>
                  </section>
                ))
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
