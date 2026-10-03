const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches seoAuditPage.services.items.
export const AUDIT_SERVICE_ICONS: React.ReactNode[] = [
  // Disciplined SEO Audit — clipboard check
  <svg key="disciplined" {...common}>
    <rect x="5" y="4.5" width="14" height="16" rx="2" />
    <path d="M9 4.5V3.5h6v1" />
    <path d="M8.8 13l2.2 2.2 4.2-4.4" />
  </svg>,
  // Technical Website Audit — gear
  <svg key="technical" {...common}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
  </svg>,
  // Extensive Competitor Analysis — magnifier over bars
  <svg key="competitor" {...common}>
    <circle cx="10.5" cy="10.5" r="5.5" />
    <path d="m15 15 5 5" />
    <path d="M8 12.5V9M10.5 12.5V7.5M13 12.5v-2" />
  </svg>,
  // Web/App Code Review — code brackets
  <svg key="code" {...common}>
    <path d="m9 8-4 4 4 4" />
    <path d="m15 8 4 4-4 4" />
  </svg>,
  // Website architecture audit — sitemap
  <svg key="architecture" {...common}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="18" cy="18" r="2.2" />
    <path d="M12 7.2V11M12 11 7 15.8M12 11l5 4.8" />
  </svg>,
  // Website theme audit — swatches
  <svg key="theme" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17" />
    <circle cx="8" cy="7.25" r="0.9" fill="currentColor" stroke="none" />
    <path d="M7 14h5M7 16.5h9" />
  </svg>,
  // Web/App Security Audit — shield
  <svg key="security" {...common}>
    <path d="M12 3.5 19.5 6.5v5.5c0 5-3.4 7.6-7.5 8.5-4.1-.9-7.5-3.5-7.5-8.5V6.5Z" />
    <path d="M9 12l2 2 4-4.4" />
  </svg>,
  // Website Performance Audit — speed gauge
  <svg key="performance" {...common}>
    <path d="M4 15.5a8 8 0 1 1 16 0" />
    <path d="M12 15.5 16 10" />
    <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>,
];
