import Image from "next/image";
import type { Author } from "@/content/authors";

export function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2.4 8.2h4.3V22H2.4V8.2ZM4.6 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM9.4 8.2h4.1v1.9h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V22h-4.3v-6.7c0-1.6 0-3.7-2.2-3.7s-2.6 1.7-2.6 3.6V22H9.4V8.2Z" />
    </svg>
  );
}

export default function AuthorBio({
  author,
  label,
  linkedinLabel,
}: {
  author: Author;
  label: string;
  linkedinLabel: string;
}) {
  return (
    <section id="post-author" className="mt-14 scroll-mt-28 border-t border-line pt-12 md:mt-16 md:pt-16">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-[12rem_minmax(0,1fr)] md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
        <div className="relative aspect-[10/11] w-40 overflow-hidden rounded-2xl bg-mist sm:w-full">
          <Image
            src={author.image}
            alt={author.name}
            fill
            sizes="(min-width: 768px) 224px, 192px"
            unoptimized={author.image.endsWith(".svg")}
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-6">
            <div>
              <p className="font-display text-base font-semibold text-muted">{label}</p>
              <p className="font-display mt-1 text-2xl font-bold text-ink md:text-[1.75rem]">{author.name}</p>
            </div>
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkedinLabel}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-blue transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_8px_20px_-8px_rgba(10,14,26,0.25)] active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <LinkedInMark className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-5 text-base leading-[1.75] text-charcoal md:text-[1.0625rem]">{author.bio}</p>
        </div>
      </div>
    </section>
  );
}
