const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches reputationServicesPage.services.items.
export const REPUTATION_SERVICE_ICONS: React.ReactNode[] = [
  // Reputation Management Software — dashboard
  <svg key="software" {...common}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M7.5 15.5l3-3.5 2.5 2 3.5-4.5" />
  </svg>,
  // Online Reputation Repair — wrench
  <svg key="repair" {...common}>
    <path d="M14.5 6.5a4 4 0 0 0 5 5l-7.5 7.5a2.1 2.1 0 0 1-3-3L16.5 8.5a4 4 0 0 1-2-2z" />
  </svg>,
  // White Label — tag
  <svg key="whitelabel" {...common}>
    <path d="M3.5 12.5V4.5h8l9 9-8 8z" />
    <circle cx="8" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>,
  // Review Response — reply arrow in bubble
  <svg key="response" {...common}>
    <path d="M4 6.5h16v10H10l-4 3v-3H4z" />
    <path d="M9 11.5h6M12 9l3 2.5-3 2.5" />
  </svg>,
  // Review Monitoring — eye
  <svg key="monitoring" {...common}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Review Generation — star with plus
  <svg key="generation" {...common}>
    <path d="M12 4.5l2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 16.4l-4.6 2.5.9-5.2-3.8-3.7 5.2-.8z" />
  </svg>,
  // SEO Reputation — search
  <svg key="seo" {...common}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15.5 15.5 5 5" />
  </svg>,
  // Survey Campaign — clipboard with bars
  <svg key="survey" {...common}>
    <rect x="5" y="4.5" width="14" height="16" rx="2" />
    <path d="M9 4.5V3.5h6v1" />
    <path d="M9 16v-3M12 16V9M15 16v-5" />
  </svg>,
  // Product Reviews — shopping bag
  <svg key="products" {...common}>
    <path d="M5 8h14l-1.2 11H6.2z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>,
  // Business Listings — pin on list
  <svg key="listings" {...common}>
    <path d="M12 21s6-5.3 6-10.3A6 6 0 0 0 6 10.7C6 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>,
  // Email Marketing — envelope
  <svg key="email" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>,
  // QR Codes — qr grid
  <svg key="qr" {...common}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <path d="M14 14h2.5v2.5H14zM18 14h2v2.5h-2zM14 18h6v2h-6z" fill="currentColor" stroke="none" />
  </svg>,
  // Two-Way SMS — two-way arrows in bubble
  <svg key="sms" {...common}>
    <path d="M4 6.5h16v10H10l-4 3v-3H4z" />
    <path d="M8.5 9.5h7M8.5 13.5h7M14 7.5l1.5 2-1.5 2M10 11.5l-1.5 2 1.5 2" />
  </svg>,
];
