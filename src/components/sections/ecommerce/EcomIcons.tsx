const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches ecommerceSeoPage.services.items.
export const ECOM_SERVICE_ICONS: React.ReactNode[] = [
  // Keyword research
  <svg key="keyword" {...common}>
    <circle cx="10.5" cy="10.5" r="5.5" />
    <path d="m15 15 5 5" />
    <path d="M8 10.5h5M10.5 8v5" />
  </svg>,
  // Local SEO — pin
  <svg key="local" {...common}>
    <path d="M12 21s6-5.3 6-10.3A6 6 0 0 0 6 10.7C6 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>,
  // Technical — gear
  <svg key="tech" {...common}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
    <circle cx="12" cy="12" r="6.4" />
  </svg>,
  // PPC — click target
  <svg key="ppc" {...common}>
    <circle cx="11" cy="11" r="6.5" />
    <circle cx="11" cy="11" r="2.5" />
    <path d="m14.5 14.5 6 2.3-2.6 1.1-1.1 2.6z" />
  </svg>,
  // Content writing
  <svg key="content" {...common}>
    <path d="M6 3.5h8l4 4V20.5H6z" />
    <path d="M14 3.5v4h4" />
    <path d="M9 12h6M9 15.5h4" />
  </svg>,
  // Web design — browser
  <svg key="web" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="M7 14h6M7 16.5h9" />
  </svg>,
  // Email
  <svg key="email" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>,
  // Walmart marketplace — storefront
  <svg key="store" {...common}>
    <path d="M4 9.5 5.5 4.5h13L20 9.5" />
    <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
    <path d="M5.5 12.5v7h13v-7" />
    <path d="M10 19.5v-4h4v4" />
  </svg>,
  // Amazon — package
  <svg key="box" {...common}>
    <path d="m12 3.5 8 4.2v8.6l-8 4.2-8-4.2V7.7z" />
    <path d="m4 7.7 8 4.2 8-4.2M12 11.9v8.6" />
  </svg>,
  // CRO — funnel
  <svg key="funnel" {...common}>
    <path d="M4 5.5h16l-6 7v5.5l-4 2v-7.5z" />
  </svg>,
];
