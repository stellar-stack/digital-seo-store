import Image from "next/image";

// The blue mark and the original orange one are both in the page; CSS shows the
// one matching the theme, so switching never waits on a download.
export default function Logo({ priority = false, className }: { priority?: boolean; className?: string }) {
  return (
    <>
      <Image
        src="/brand/logo.png"
        alt="Digital SEO Store"
        width={168}
        height={86}
        priority={priority}
        className={`only-blue ${className ?? ""}`}
      />
      <Image
        src="/brand/logo-orange.png"
        alt="Digital SEO Store"
        width={168}
        height={86}
        loading="eager"
        className={`only-orange ${className ?? ""}`}
      />
    </>
  );
}
