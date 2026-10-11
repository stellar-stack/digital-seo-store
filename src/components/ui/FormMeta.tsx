"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

// Hidden fields every public form sends: where it was submitted from, and a
// honeypot that only bots fill in (see src/actions/forms.ts).
export default function FormMeta() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="page" value={pathname} />
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}
