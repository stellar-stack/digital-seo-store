import { clsx } from "clsx";

function Stopwatch() {
  return (
    <svg viewBox="0 0 16 16" className="h-[1.1em] w-[1.1em] shrink-0" fill="none" aria-hidden>
      <circle cx="8" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 6v3.2l1.8 1.1M6.5 1.75h3M12.4 4.3l.9-.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function PostMeta({
  readTime,
  date,
  locale,
  lastUpdatedLabel,
  className,
}: {
  readTime: string;
  date: string;
  locale: string;
  lastUpdatedLabel: string;
  className?: string;
}) {
  return (
    <p className={clsx("flex flex-wrap items-center gap-x-2 gap-y-1 text-muted", className)}>
      <Stopwatch />
      <span>{readTime}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-blue" />
      <span>
        {lastUpdatedLabel}{" "}
        <time dateTime={date}>
          {new Date(date).toLocaleDateString(locale === "en" ? "en-GB" : locale, {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        </time>
      </span>
    </p>
  );
}
