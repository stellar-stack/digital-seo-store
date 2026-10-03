const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches croServicesPage.services.items.
export const CRO_SERVICE_ICONS: React.ReactNode[] = [
  // CRO Consultation — speech bubbles
  <svg key="consult" {...common}>
    <path d="M4 6.5h11v7H9l-3 3v-3H4z" />
    <path d="M13.5 9.5h6v6h-2.5v2.5l-2.5-2.5h-1" />
  </svg>,
  // Analytics Audit and Setup — clipboard check
  <svg key="audit" {...common}>
    <rect x="5" y="4.5" width="14" height="16" rx="2" />
    <path d="M9 4.5V3.5h6v1" />
    <path d="M8.8 13l2.2 2.2 4.2-4.4" />
  </svg>,
  // Data Collection and Analysis — bar chart
  <svg key="data" {...common}>
    <path d="M4 20h16" />
    <rect x="6" y="12" width="3" height="6" rx="1" />
    <rect x="11" y="8" width="3" height="10" rx="1" />
    <rect x="16" y="5" width="3" height="13" rx="1" />
  </svg>,
  // A/B Testing — split
  <svg key="ab" {...common}>
    <path d="M12 4v16" strokeDasharray="2 4" />
    <path d="M4 8h4l-2-2.5M8 8l-2 2.5" />
    <path d="M20 16h-4l2 2.5M16 16l2-2.5" />
  </svg>,
  // CRO Roadmap — route with pins
  <svg key="roadmap" {...common}>
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="6" r="2" />
    <path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6" />
  </svg>,
  // Customer Journey Mapping — path with nodes
  <svg key="journey" {...common}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M7 6.5h4l2 3.5M14 13l3 3.5" />
  </svg>,
];
