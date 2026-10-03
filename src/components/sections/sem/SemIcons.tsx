const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches semServicesPage.services.items.
export const SEM_SERVICE_ICONS: React.ReactNode[] = [
  // Keyword Research and Strategy — magnifier over lines
  <svg key="keyword" {...common}>
    <circle cx="10.5" cy="10.5" r="5.5" />
    <path d="m15 15 5 5" />
    <path d="M8 10.5h5M10.5 8v5" />
  </svg>,
  // Amazon PPC — package
  <svg key="amazon" {...common}>
    <path d="m12 3.5 8 4.2v8.6l-8 4.2-8-4.2V7.7z" />
    <path d="m4 7.7 8 4.2 8-4.2M12 11.9v8.6" />
  </svg>,
  // Video Advertising — play button
  <svg key="video" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>,
  // eCommerce Advertising — bag with tag
  <svg key="ecommerce" {...common}>
    <path d="M6.5 8 8 4.5h8L17.5 8" />
    <path d="M5 8h14l-1.2 11H6.2z" />
    <path d="M9.5 11a2.5 2.5 0 0 0 5 0" />
  </svg>,
  // Social Media Paid Advertising — chat bubbles
  <svg key="social" {...common}>
    <path d="M4 6.5h11v7H9l-3 3v-3H4z" />
    <path d="M13.5 9.5h6v6h-2.5v2.5l-2.5-2.5h-1" />
  </svg>,
  // Landing Page Conversion — browser with cursor
  <svg key="landing" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="m11 12.5 5.5 2.2-2 .8 2 2-1 1-2-2-.8 2z" fill="currentColor" stroke="none" />
  </svg>,
  // Paid Search Advertising — search with ad tag
  <svg key="paidsearch" {...common}>
    <circle cx="10" cy="10" r="6" />
    <path d="m14.5 14.5 5.5 5.5" />
    <path d="M7.5 10h5" />
  </svg>,
  // A/B Split Testing — split arrows
  <svg key="split" {...common}>
    <path d="M12 4v16" strokeDasharray="2 4" />
    <path d="M4 8h4l-2-2.5M8 8l-2 2.5" />
    <path d="M20 16h-4l2 2.5M16 16l2-2.5" />
  </svg>,
  // SEM PPC Management — sliders
  <svg key="management" {...common}>
    <path d="M5 6h14M5 12h14M5 18h14" />
    <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>,
  // Bing and Google Ads Management — grid squares
  <svg key="ads" {...common}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>,
  // Remarketing — refresh
  <svg key="remarketing" {...common}>
    <path d="M20 11a8 8 0 0 0-14.9-3.5M4 13a8 8 0 0 0 14.9 3.5" />
    <path d="M4.5 4.5v4h4M19.5 19.5v-4h-4" />
  </svg>,
  // SEO — rising bars
  <svg key="seo" {...common}>
    <rect x="4" y="13" width="4" height="7" rx="1" />
    <rect x="10" y="8" width="4" height="12" rx="1" />
    <rect x="16" y="4" width="4" height="16" rx="1" />
  </svg>,
];
