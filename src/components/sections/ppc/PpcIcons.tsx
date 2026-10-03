const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches ppcServicesPage.services.items.
export const PPC_SERVICE_ICONS: React.ReactNode[] = [
  // Search Ads — magnifier
  <svg key="search" {...common}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15.5 15.5 5 5" />
  </svg>,
  // Display Ads — browser with image
  <svg key="display" {...common}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9.5h17" />
    <rect x="7" y="12" width="10" height="5" rx="1" />
  </svg>,
  // Social Ads — chat bubbles
  <svg key="social" {...common}>
    <path d="M4 6.5h11v7H9l-3 3v-3H4z" />
    <path d="M13.5 9.5h6v6h-2.5v2.5l-2.5-2.5h-1" />
  </svg>,
  // Remarketing — refresh target
  <svg key="remarketing" {...common}>
    <path d="M20 11a8 8 0 0 0-14.9-3.5M4 13a8 8 0 0 0 14.9 3.5" />
    <path d="M4.5 4.5v4h4M19.5 19.5v-4h-4" />
  </svg>,
  // Google Shopping — bag with tag
  <svg key="shopping" {...common}>
    <path d="M6.5 8 8 4.5h8L17.5 8" />
    <path d="M5 8h14l-1.2 11H6.2z" />
    <path d="M9.5 11a2.5 2.5 0 0 0 5 0" />
  </svg>,
  // In-Stream — play button
  <svg key="instream" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
  </svg>,
  // Gmail Sponsored Promotions — envelope
  <svg key="gmail" {...common}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>,
  // Local Services Ads — pin with check
  <svg key="local" {...common}>
    <path d="M12 21s6-5.3 6-10.3A6 6 0 0 0 6 10.7C6 15.7 12 21 12 21Z" />
    <path d="m9.3 10.6 1.7 1.7 3.2-3.4" />
  </svg>,
  // Amazon PPC — package
  <svg key="amazon" {...common}>
    <path d="m12 3.5 8 4.2v8.6l-8 4.2-8-4.2V7.7z" />
    <path d="m4 7.7 8 4.2 8-4.2M12 11.9v8.6" />
  </svg>,
];
