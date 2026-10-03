const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Order matches socialServicesPage.services.items.
export const SOCIAL_SERVICE_ICONS: React.ReactNode[] = [
  // Facebook — group of people
  <svg key="facebook" {...common}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19c.6-3 2.7-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
    <circle cx="17" cy="8" r="2.3" />
    <path d="M15.5 14.2c2.3.2 3.9 1.8 4.4 4.5" />
  </svg>,
  // Instagram — camera
  <svg key="instagram" {...common}>
    <rect x="3.5" y="6.5" width="17" height="13" rx="3.5" />
    <circle cx="12" cy="13" r="3.5" />
    <circle cx="17" cy="9.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>,
  // Twitter — chat bubble
  <svg key="twitter" {...common}>
    <path d="M4 6.5h16v10H9l-5 3.5V16.5H4z" />
  </svg>,
  // LinkedIn — briefcase
  <svg key="linkedin" {...common}>
    <rect x="3.5" y="8" width="17" height="11" rx="2" />
    <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
    <path d="M3.5 13h17" />
  </svg>,
  // TikTok — music note
  <svg key="tiktok" {...common}>
    <path d="M14 4v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 4c.4 2.6 2.2 4.3 5 4.5" />
  </svg>,
  // Pinterest — pin
  <svg key="pinterest" {...common}>
    <path d="M12 21s6-5.3 6-10.3A6 6 0 0 0 6 10.7C6 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>,
  // Ecommerce — cart
  <svg key="ecommerce" {...common}>
    <path d="M3.5 4.5h2.4l2 10.2h9.4l1.8-7.4H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="16.5" cy="19" r="1.3" />
  </svg>,
  // Enterprise — building
  <svg key="enterprise" {...common}>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <path d="M9 8h1M14 8h1M9 12h1M14 12h1M10.5 20.5v-3h3v3" />
  </svg>,
  // D2C — direct arrow to person
  <svg key="d2c" {...common}>
    <circle cx="8" cy="8" r="3" />
    <path d="M3 19c.5-2.8 2.4-4.4 5-4.4" />
    <path d="M13 12h7.5M17 8.5l3.5 3.5-3.5 3.5" />
  </svg>,
];
