const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches localSeoPage.services.items.
export const LOCAL_SERVICE_ICONS: React.ReactNode[] = [
  // Local SEO Audit — clipboard with check
  <svg key="audit" {...common}>
    <rect x="5" y="4.5" width="14" height="16" rx="2" />
    <path d="M9 4.5V3.5h6v1" />
    <path d="M8.8 13l2.2 2.2 4.2-4.4" />
  </svg>,
  // Keyword research — magnifier over lines
  <svg key="keyword" {...common}>
    <circle cx="10.5" cy="10.5" r="5.5" />
    <path d="m15 15 5 5" />
    <path d="M8 10.5h5M10.5 8v5" />
  </svg>,
  // Google business profile — storefront
  <svg key="gbp" {...common}>
    <path d="M4 9.5 5.5 4.5h13L20 9.5" />
    <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
    <path d="M5.5 12.5v7h13v-7" />
    <path d="M10 19.5v-4h4v4" />
  </svg>,
  // eCommerce — cart
  <svg key="ecom" {...common}>
    <path d="M3.5 4.5h2.4l2 10.2h9.4l1.8-7.4H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="16.5" cy="19" r="1.3" />
  </svg>,
  // On-page — browser window
  <svg key="onpage" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="M7 14h6M7 16.5h9" />
  </svg>,
  // Content writing — pen on page
  <svg key="content" {...common}>
    <path d="M6 3.5h8l4 4V20.5H6z" />
    <path d="M14 3.5v4h4" />
    <path d="M9 12h6M9 15.5h4" />
  </svg>,
  // Link building — chain
  <svg key="link" {...common}>
    <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
    <path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
  </svg>,
  // Nextdoor advertising — megaphone
  <svg key="ads" {...common}>
    <path d="M4 10.5v3.5h3.5L14 18.5v-12L7.5 10.5z" />
    <path d="M17 9.5a4 4 0 0 1 0 6" />
    <path d="M7.5 14l1 5h2.2" />
  </svg>,
  // Citation management — pin over list
  <svg key="citation" {...common}>
    <path d="M12 21s6-5.3 6-10.3A6 6 0 0 0 6 10.7C6 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>,
];
