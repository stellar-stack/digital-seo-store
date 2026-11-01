"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

const CX = 360;
const CY = 240;
const R_OUTER = 190;
const R_INNER = 134;
const R_CORE = 122;
const R_BAND = (R_OUTER + R_INNER) / 2;
const R_CONNECTOR = 208;
const HALF_SWEEP = 28.5;
const CORNER = 12;
const CYCLE_MS = 3600;
const TITLE_SIZE = 16;
const ICON_SIZE = 18;
const ICON_GAP = 8;
const toDeg = (px: number) => (px / R_BAND) * (180 / Math.PI);

type Segment = {
  title: string;
  lines: [string, string];
  angle: number;
  fill: string;
  ink: string;
  icon: React.ReactNode;
};

// Clockwise from the top, in the positions of the original Digital Growth
// Engine artwork. The fills are deepened from the site's illustration palette
// so bold white labels stay legible (at least 3:1 at large-text size).
const SEGMENTS: Segment[] = [
  {
    title: "SEO 2.0",
    lines: ["Modern", "Search Visibility"],
    angle: -90,
    fill: "var(--color-blue)",
    ink: "var(--color-on-accent)",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4.5 4.5" />
      </>
    ),
  },
  {
    title: "PAID MEDIA",
    lines: ["Targeted", "Growth"],
    angle: -30,
    fill: "#12925f",
    ink: "#ffffff",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
  },
  {
    title: "CRO",
    lines: ["Turn Visitors", "Into Customers"],
    angle: 30,
    fill: "#0f8f9e",
    ink: "#ffffff",
    icon: <path d="M5 20v-6M12 20V9M19 20V4" />,
  },
  {
    title: "SOCIAL",
    lines: ["Engage &", "Expand Reach"],
    angle: 90,
    fill: "#d93a30",
    ink: "#ffffff",
    icon: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
      </>
    ),
  },
  {
    title: "CONTENT",
    lines: ["Build Trust", "& Authority"],
    angle: 150,
    fill: "#d9690f",
    ink: "#ffffff",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
  },
  {
    title: "AI SEARCH",
    lines: ["Be Visible", "in AI Answers"],
    angle: 210,
    fill: "#6b5ce7",
    ink: "#ffffff",
    icon: (
      <>
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 8V4M9 13.5v1M15 13.5v1" />
        <circle cx="12" cy="3.5" r="1" />
      </>
    ),
  },
];

type Stage = { title: string; lines: string[]; color: string; icon: React.ReactNode };

// Clockwise journey around the ring, starting lower left.
const STAGES: Stage[] = [
  {
    title: "VISIBILITY",
    lines: ["Get Discovered"],
    color: "#d9690f",
    icon: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "DEMAND",
    lines: ["Attract the", "Right Audience"],
    color: "#6b5ce7",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5a3 3 0 0 1 0 6M21 20c0-2.8-1.6-5-4-5.7" />
      </>
    ),
  },
  {
    title: "CUSTOMERS",
    lines: ["Drive", "Conversions"],
    color: "#12925f",
    icon: (
      <>
        <path d="M3 4h2.5l2.4 11h10.6l2-8H6.4" />
        <circle cx="9.5" cy="19.5" r="1.5" />
        <circle cx="17.5" cy="19.5" r="1.5" />
      </>
    ),
  },
  {
    title: "REVENUE",
    lines: ["Sustainable", "Business Growth"],
    color: "#0f8f9e",
    icon: <path d="M5 20v-6M12 20V9M19 20V4" />,
  },
];

function pt(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return `${(CX + r * Math.cos(a)).toFixed(2)} ${(CY + r * Math.sin(a)).toFixed(2)}`;
}

function xy(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: +(CX + r * Math.cos(a)).toFixed(2), y: +(CY + r * Math.sin(a)).toFixed(2) };
}

// A ring segment with softly rounded corners.
function sectorPath(a0: number, a1: number) {
  const dOuter = (CORNER / R_OUTER) * (180 / Math.PI);
  const dInner = (CORNER / R_INNER) * (180 / Math.PI);
  return [
    `M ${pt(R_OUTER, a0 + dOuter)}`,
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${pt(R_OUTER, a1 - dOuter)}`,
    `Q ${pt(R_OUTER, a1)} ${pt(R_OUTER - CORNER, a1)}`,
    `L ${pt(R_INNER + CORNER, a1)}`,
    `Q ${pt(R_INNER, a1)} ${pt(R_INNER, a1 - dInner)}`,
    `A ${R_INNER} ${R_INNER} 0 0 0 ${pt(R_INNER, a0 + dInner)}`,
    `Q ${pt(R_INNER, a0)} ${pt(R_INNER + CORNER, a0)}`,
    `L ${pt(R_OUTER - CORNER, a0)}`,
    `Q ${pt(R_OUTER, a0)} ${pt(R_OUTER, a0 + dOuter)}`,
    "Z",
  ].join(" ");
}

// Upper-half labels read clockwise; lower-half ones run the other way so they
// stay left to right rather than upside down.
function isLower(mid: number) {
  return Math.sin((mid * Math.PI) / 180) > 0.01;
}

// The icon and title sit side by side along the curve, centred as one unit.
function labelLayout(s: Segment) {
  const dir = isLower(s.angle) ? -1 : 1;
  const titleWidth = s.title.length * TITLE_SIZE * 0.66;
  const unit = ICON_SIZE + ICON_GAP + titleWidth;
  return {
    icon: xy(R_BAND, s.angle + dir * toDeg(-unit / 2 + ICON_SIZE / 2)),
    titleAngle: s.angle + dir * toDeg((ICON_SIZE + ICON_GAP) / 2),
  };
}

function labelArc(s: Segment) {
  const { titleAngle } = labelLayout(s);
  const a0 = titleAngle - HALF_SWEEP;
  const a1 = titleAngle + HALF_SWEEP;
  if (isLower(s.angle)) return `M ${pt(R_BAND + 6, a1)} A ${R_BAND + 6} ${R_BAND + 6} 0 0 0 ${pt(R_BAND + 6, a0)}`;
  return `M ${pt(R_BAND - 6, a0)} A ${R_BAND - 6} ${R_BAND - 6} 0 0 1 ${pt(R_BAND - 6, a1)}`;
}

const CONNECTORS = [
  { d: `M 30 268 H 140 Q 154 268 156 280 A ${R_CONNECTOR} ${R_CONNECTOR} 0 0 0 ${pt(R_CONNECTOR, 144)}`, dot: xy(R_CONNECTOR, 144) },
  { d: `M 30 212 H 140 Q 154 212 156 200 A ${R_CONNECTOR} ${R_CONNECTOR} 0 0 1 ${pt(R_CONNECTOR, 216)}`, dot: xy(R_CONNECTOR, 216) },
  { d: `M 690 212 H 580 Q 566 212 564 200 A ${R_CONNECTOR} ${R_CONNECTOR} 0 0 0 ${pt(R_CONNECTOR, -36)}`, dot: xy(R_CONNECTOR, -36) },
  { d: `M 690 268 H 580 Q 566 268 564 280 A ${R_CONNECTOR} ${R_CONNECTOR} 0 0 1 ${pt(R_CONNECTOR, 36)}`, dot: xy(R_CONNECTOR, 36) },
];

function StageIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

export default function GrowthEngine() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SEGMENTS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  const current = SEGMENTS[active];

  return (
    <div>
      {/* Readers using assistive technology get the whole engine as a list. */}
      <div className="sr-only">
        <p>DIGITAL GROWTH ENGINE</p>
        <ul>
          {SEGMENTS.map((s) => (
            <li key={s.title}>
              {s.title}: {s.lines.join(" ")}
            </li>
          ))}
        </ul>
        <ol>
          {STAGES.map((s) => (
            <li key={s.title}>
              {s.title}: {s.lines.join(" ")}
            </li>
          ))}
        </ol>
      </div>

      {/* Below xl the side labels move under the ring, so the drawing is cropped
          to the ring itself and can stay large enough to read. */}
      <div className="mx-auto max-w-[19rem] overflow-hidden sm:max-w-[21rem] xl:mr-0 xl:max-w-[35rem] xl:overflow-visible" aria-hidden>
        <svg
          viewBox="20 36 680 408"
          className="font-display -ml-[35.5%] w-[171%] max-w-none xl:ml-0 xl:w-full"
          onPointerLeave={() => setPaused(false)}
        >
          <defs>
            {SEGMENTS.map((s, i) => (
              <path key={s.title} id={`engine-arc-${i}`} d={labelArc(s)} fill="none" />
            ))}
          </defs>

          <g className="hidden xl:inline">
            {CONNECTORS.map((c, i) => (
              <g key={STAGES[i].title} className="animate-rise" style={{ "--d": `${500 + i * 90}ms` } as React.CSSProperties}>
                <path d={c.d} fill="none" stroke={STAGES[i].color} strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
                <circle cx={c.dot.x} cy={c.dot.y} r="4" fill={STAGES[i].color} />
              </g>
            ))}
            {STAGES.map((s, i) => {
              const right = i >= 2;
              const upper = i === 1 || i === 2;
              const x = right ? 690 : 30;
              const anchor = right ? "end" : "start";
              const titleY = upper ? (s.lines.length > 1 ? 150 : 170) : 296;
              const textX = right ? x - 28 : x + 28;
              return (
                <g key={s.title} className="animate-rise" style={{ "--d": `${600 + i * 90}ms` } as React.CSSProperties}>
                  <svg x={right ? x - 22 : x} y={titleY - 17} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                  <text x={textX} y={titleY} textAnchor={anchor} className="fill-ink text-[15px] font-semibold tracking-wide">
                    {s.title}
                  </text>
                  {s.lines.map((line, k) => (
                    <text key={line} x={textX} y={titleY + 20 + k * 18} textAnchor={anchor} className="fill-muted text-[14px]">
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>

          {SEGMENTS.map((s, i) => {
            const selected = i === active;
            const a0 = s.angle - HALF_SWEEP;
            const a1 = s.angle + HALF_SWEEP;
            const out = xy(5, s.angle);
            const { icon } = labelLayout(s);
            return (
              <g key={s.title} className="animate-rise" style={{ "--d": `${120 + i * 70}ms` } as React.CSSProperties}>
                <g
                  onPointerEnter={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className="cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: selected ? `translate(${out.x - CX}px, ${out.y - CY}px)` : undefined }}
                >
                  <path d={sectorPath(a0, a1)} fill={s.fill} className={clsx("transition-opacity duration-700", selected ? "opacity-100" : "opacity-[0.92]")} />
                  <text fontSize={TITLE_SIZE} className="font-semibold tracking-[0.02em]" fill={s.ink}>
                    <textPath href={`#engine-arc-${i}`} startOffset="50%" textAnchor="middle">
                      {s.title}
                    </textPath>
                  </text>
                  <svg x={icon.x - ICON_SIZE / 2} y={icon.y - ICON_SIZE / 2} width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke={s.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </g>
              </g>
            );
          })}

          <circle cx={CX} cy={CY} r={R_CORE} fill="#ffffff" stroke="var(--color-line)" strokeWidth="1" />

          <image href="/brand/logo-symbol.png" x={CX - 30} y={CY - 100} width="60" height="46" className="only-blue" />
          <image href="/brand/logo-symbol-orange.png" x={CX - 30} y={CY - 100} width="60" height="46" className="only-orange" />

          <text x={CX} y={CY - 28} textAnchor="middle" className="fill-ink text-[22px] font-semibold tracking-tight">
            DIGITAL
          </text>
          <text x={CX} y={CY - 4} textAnchor="middle" className="fill-accent text-[22px] font-semibold tracking-tight">
            GROWTH
          </text>
          <text x={CX} y={CY + 20} textAnchor="middle" className="fill-accent text-[22px] font-semibold tracking-tight">
            ENGINE
          </text>

          <g key={active} className="animate-rise">
            <text x={CX} y={CY + 49} textAnchor="middle" className="fill-muted text-[15px]">
              {current.lines[0]}
            </text>
            <text x={CX} y={CY + 68} textAnchor="middle" className="fill-muted text-[15px]">
              {current.lines[1]}
            </text>
          </g>
        </svg>
      </div>

      <ol aria-hidden className="mx-auto mt-8 grid max-w-[24rem] grid-cols-2 gap-x-6 gap-y-5 sm:max-w-[40rem] sm:grid-cols-4 lg:max-w-[24rem] lg:grid-cols-2 xl:hidden">
        {STAGES.map((s) => (
          <li key={s.title} className="flex items-start gap-2.5">
            <span style={{ color: s.color }}>
              <StageIcon className="mt-0.5 h-5 w-5 shrink-0">{s.icon}</StageIcon>
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide text-ink">{s.title}</span>
              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">
                {s.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
