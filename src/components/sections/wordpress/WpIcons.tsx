const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches wordpressServicesPage.services.items.
export const WP_SERVICE_ICONS: React.ReactNode[] = [
  // WordPress Web Development — globe
  <svg key="web" {...common}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 3 2.5 14 0 17M12 3.5c-2.5 3-2.5 14 0 17" />
  </svg>,
  // CMS Development — layers
  <svg key="cms" {...common}>
    <path d="m12 4 8.5 4.5L12 13 3.5 8.5z" />
    <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  </svg>,
  // Migration — arrow transfer
  <svg key="migration" {...common}>
    <path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5" />
  </svg>,
  // eCommerce Development — cart
  <svg key="ecommerce" {...common}>
    <path d="M3.5 4.5h2.4l2 10.2h9.4l1.8-7.4H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="16.5" cy="19" r="1.3" />
  </svg>,
  // Maintenance and Support — shield check
  <svg key="maintenance" {...common}>
    <path d="M12 3.5 19.5 6.5v5.5c0 5-3.4 7.6-7.5 8.5-4.1-.9-7.5-3.5-7.5-8.5V6.5Z" />
    <path d="M9 12l2 2 4-4.4" />
  </svg>,
  // Theme Development — layout with palette
  <svg key="theme" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17M9 9.5v9.5" />
  </svg>,
  // Third-Party API Integration — plug
  <svg key="api" {...common}>
    <path d="M9 4v4M15 4v4M7 8h10v3a5 5 0 0 1-10 0z" />
    <path d="M12 16v4.5" />
  </svg>,
  // Hire Dedicated Developers — person with code brackets
  <svg key="hire" {...common}>
    <circle cx="10" cy="8" r="3.5" />
    <path d="M3.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="m17 13-2 2 2 2M21 13l2 2-2 2" />
  </svg>,
  // Ongoing Development and Growth — rising chart
  <svg key="growth" {...common}>
    <path d="M3.5 17.5 9 12l4 4 7.5-7.5" />
    <path d="M15.5 8.5h4v4" />
  </svg>,
];
