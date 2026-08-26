export const services = [
  { slug: "seo", key: "seo", category: "seo" },
  { slug: "local-seo", key: "localSeo", category: "seo" },
  { slug: "ecommerce-seo", key: "ecommerceSeo", category: "seo" },
  { slug: "seo-audit", key: "seoAudit", category: "seo" },
  { slug: "ppc", key: "ppc", category: "paidGrowth" },
  { slug: "sem", key: "sem", category: "paidGrowth" },
  { slug: "cro", key: "cro", category: "paidGrowth" },
  { slug: "social-media-marketing", key: "smm", category: "contentReputation" },
  { slug: "content-marketing", key: "contentMarketing", category: "contentReputation" },
  { slug: "reputation-management", key: "reputationManagement", category: "contentReputation" },
  { slug: "wordpress-development", key: "wordpressDevelopment", category: "devTeam" },
  { slug: "hire-seo-experts", key: "hireSeoExperts", category: "devTeam" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
export type ServiceKey = (typeof services)[number]["key"];
export type ServiceCategory = (typeof services)[number]["category"];

// Column order for the desktop mega-menu: two columns of two categories
// each, balanced at 6 service rows per column (4+2 and 3+3).
export const SERVICE_CATEGORY_COLUMNS: ServiceCategory[][] = [
  ["seo", "devTeam"],
  ["paidGrowth", "contentReputation"],
];
