export const services = [
  { slug: "seo", key: "seo" },
  { slug: "local-seo", key: "localSeo" },
  { slug: "ecommerce-seo", key: "ecommerceSeo" },
  { slug: "seo-audit", key: "seoAudit" },
  { slug: "ppc", key: "ppc" },
  { slug: "sem", key: "sem" },
  { slug: "social-media-marketing", key: "smm" },
  { slug: "content-marketing", key: "contentMarketing" },
  { slug: "cro", key: "cro" },
  { slug: "reputation-management", key: "reputationManagement" },
  { slug: "wordpress-development", key: "wordpressDevelopment" },
  { slug: "hire-seo-experts", key: "hireSeoExperts" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
