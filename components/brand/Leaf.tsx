import { useId } from "react";

// Heart-shaped blade, sinus at the top, tip at the bottom (viewBox 0 0 100 110).
export const LEAF_PATH =
  "M50 24C46 10 30 2 17 8 3 15 0 34 6 52c7 22 28 40 44 54 16-14 37-32 44-54 6-18 3-37-11-44C70 2 54 10 50 24Z";

const SLITS: [number, number, number, number][] = [
  [31, 41, -4, 57],
  [34, 59, 4, 80],
  [39, 76, 20, 98],
];
const HOLES: [number, number, number, number][] = [
  [39, 35, 3.2, 2.2],
  [41, 53, 3, 2],
  [44, 70, 2.4, 1.7],
];

/**
 * The Kenstera leaf: a monstera blade with its slits and holes cut out.
 * Inherits `currentColor`. Pass `veins` for the larger, detailed version.
 */
export function Leaf({
  className,
  veins = false,
  title,
}: {
  className?: string;
  veins?: boolean;
  title?: string;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 110"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130">
        <rect x="-10" y="-10" width="120" height="130" fill="#000" />
        <path d={LEAF_PATH} fill="#fff" />
        <g stroke="#000" strokeWidth={veins ? 3.6 : 5} strokeLinecap="round">
          {SLITS.map(([x1, y1, x2, y2], i) => (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} />
              <line x1={100 - x1} y1={y1} x2={100 - x2} y2={y2} />
            </g>
          ))}
        </g>
        <g fill="#000">
          {HOLES.map(([cx, cy, rx, ry], i) => (
            <g key={i}>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(-28 ${cx} ${cy})`} />
              <ellipse cx={100 - cx} cy={cy} rx={rx} ry={ry} transform={`rotate(28 ${100 - cx} ${cy})`} />
            </g>
          ))}
        </g>
        {veins && (
          <g stroke="#000" strokeWidth="0.7" strokeLinecap="round" opacity="0.55">
            <path d="M50 24V104" />
            {[32, 50, 67, 82].map((y, i) => (
              <g key={i}>
                <path d={`M50 ${y}L${10 + i * 8} ${y + 15}`} />
                <path d={`M50 ${y}L${90 - i * 8} ${y + 15}`} />
              </g>
            ))}
          </g>
        )}
      </mask>
      <rect x="-10" y="-10" width="120" height="130" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Leaf className="h-[1.15em] w-auto -rotate-12 text-lime" />
      <span className="font-display text-[1.25em] leading-none tracking-[-0.02em]" style={{ fontVariationSettings: '"SOFT" 80, "WONK" 0' }}>
        Kenstera
      </span>
    </span>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`arrow h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}
