import { clsx } from "clsx";
import { LinkedInMark } from "@/components/blog/AuthorBio";

const NETWORKS = [
  {
    name: "Facebook",
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path d="M13.4 24v-8.4h2.8l.5-3.3h-3.3v-2.1c0-.9.4-1.8 1.9-1.8h1.5V5.6s-1.4-.2-2.7-.2c-2.7 0-4.5 1.6-4.5 4.6v2.4H6.6v3.3h3V24h3.8Z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: <LinkedInMark className="h-[1.4rem] w-[1.4rem] text-ink" />,
  },
  {
    name: "X",
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden>
        <path d="M3 3h5.2l12.8 18h-5.2L3 3Z" />
        <path d="M20.5 3l-7.3 8.2M3.6 21l7.2-8.1" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ShareLinks({
  url,
  title,
  label,
  shareOn,
  className,
}: {
  url: string;
  title: string;
  label: string;
  shareOn: (network: string) => string;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <span className="mr-2 flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 13V2.5M6.5 6 10 2.5 13.5 6M4 10.5V16a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 16 16v-5.5" />
        </svg>
        {label}
      </span>
      {NETWORKS.map((n) => (
        <a
          key={n.name}
          href={n.href(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={shareOn(n.name)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_8px_20px_-8px_rgba(10,14,26,0.25)] active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          {n.icon}
        </a>
      ))}
    </div>
  );
}
