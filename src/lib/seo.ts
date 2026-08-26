export const SITE_URL = "https://digitalseostore.com";

export function absoluteUrl(path: string, locale: string): string {
  const normalized = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${normalized}`;
}

export function organizationRef() {
  return {
    "@type": "Organization",
    name: "Digital SEO Store",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
  };
}

export function breadcrumbList(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
