import type { ServiceKey } from "@/config/services";

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const SERVICE_ICONS: Record<ServiceKey, React.ReactNode> = {
  seo: (
    <svg {...common}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M14.8 14.8 20 20" />
      <path d="M7 10.5l1.8 1.8L13 8" />
    </svg>
  ),
  localSeo: (
    <svg {...common}>
      <path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  ecommerceSeo: (
    <svg {...common}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  seoAudit: (
    <svg {...common}>
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <path d="M9.5 3.5h5a.5.5 0 0 1 .5.5v1.5H9V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  ),
  ppc: (
    <svg {...common}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  ),
  sem: (
    <svg {...common}>
      <path d="M4 10v4h3.2L13 18V6L7.2 10H4Z" />
      <path d="M16.5 9a4 4 0 0 1 0 6" />
      <path d="M18.7 6.8a7.5 7.5 0 0 1 0 10.4" />
    </svg>
  ),
  smm: (
    <svg {...common}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5v5A2.5 2.5 0 0 1 14.5 14H10l-4 3.5V14h-.5A2.5 2.5 0 0 1 3 11.5v-5Z" />
      <circle cx="16.5" cy="16.5" r="3.2" />
    </svg>
  ),
  contentMarketing: (
    <svg {...common}>
      <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M9 12h6M9 15.5h6M9 8.5h3" />
    </svg>
  ),
  cro: (
    <svg {...common}>
      <path d="M4 5h16l-6 8v6l-4 2v-8L4 5Z" />
    </svg>
  ),
  reputationManagement: (
    <svg {...common}>
      <path d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3.5Z" />
    </svg>
  ),
  wordpressDevelopment: (
    <svg {...common}>
      <path d="M9 8 5 12l4 4" />
      <path d="M15 8l4 4-4 4" />
      <path d="M13.5 6.5l-3 11" />
    </svg>
  ),
  hireSeoExperts: (
    <svg {...common}>
      <circle cx="9" cy="8.5" r="2.8" />
      <path d="M3.5 19c.7-3 3-4.8 5.5-4.8s4.8 1.8 5.5 4.8" />
      <circle cx="16.5" cy="9" r="2.2" />
      <path d="M15 14.5c2 .2 3.7 1.7 4.3 4.2" />
    </svg>
  ),
};
