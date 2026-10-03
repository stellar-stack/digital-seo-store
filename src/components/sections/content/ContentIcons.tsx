const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches contentServicesPage.services.items.
export const CONTENT_SERVICE_ICONS: React.ReactNode[] = [
  // Strategy & Consulting — target
  <svg key="strategy" {...common}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>,
  // Website Content — browser page
  <svg key="website" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17M7 13h6M7 15.5h9" />
  </svg>,
  // Blog Writing — pen on notebook
  <svg key="blog" {...common}>
    <path d="M6 3.5h10a2 2 0 0 1 2 2V20.5H6z" />
    <path d="M9 8h5M9 11.5h6" />
  </svg>,
  // Content Optimization — sliders
  <svg key="optimization" {...common}>
    <path d="M5 6h14M5 12h14M5 18h14" />
    <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>,
  // Social Media Content — chat bubbles
  <svg key="social" {...common}>
    <path d="M4 6.5h11v7H9l-3 3v-3H4z" />
    <path d="M13.5 9.5h6v6h-2.5v2.5l-2.5-2.5h-1" />
  </svg>,
  // Email Content — envelope
  <svg key="email" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>,
  // eCommerce Content — tag
  <svg key="ecommerce" {...common}>
    <path d="M3.5 12.5V4.5h8l9 9-8 8z" />
    <circle cx="8" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>,
  // Video Content — play button
  <svg key="video" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>,
  // Ad Copywriting — megaphone
  <svg key="ads" {...common}>
    <path d="M4 10.5v3.5h3.5L14 18.5v-12L7.5 10.5z" />
    <path d="M17 9.5a4 4 0 0 1 0 6" />
    <path d="M7.5 14l1 5h2.2" />
  </svg>,
];
