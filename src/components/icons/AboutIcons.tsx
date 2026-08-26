const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Hero stat badges (about.stats: experts, clients, years, offices — order-matched).
export const STAT_ICONS: React.ReactNode[] = [
  // Experts — people
  <svg {...common}>
    <circle cx="9" cy="9" r="3" />
    <path d="M3.5 19c.6-3 2.7-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
    <circle cx="17" cy="8.5" r="2.3" />
    <path d="M15.5 14.5c2.3.2 3.9 1.8 4.4 4.5" />
  </svg>,
  // Clients — briefcase
  <svg {...common}>
    <rect x="3.5" y="8" width="17" height="11" rx="2" />
    <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
    <path d="M3.5 13h17" />
  </svg>,
  // Years — calendar
  <svg {...common}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
    <path d="M4 10h16" />
    <path d="M8 3.5v4M16 3.5v4" />
  </svg>,
  // Offices — pin
  <svg {...common}>
    <path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>,
];
