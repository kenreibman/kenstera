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
];

/** The Kenstera leaf: a monstera blade with its slits and holes cut out. */
export function Leaf({ className, title }: { className?: string; title?: string }) {
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
        <path d={LEAF_PATH} fill="#fff" />
        <g stroke="#000" strokeWidth="4.5" strokeLinecap="round">
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
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
              <ellipse cx={100 - cx} cy={cy} rx={rx} ry={ry} />
            </g>
          ))}
        </g>
      </mask>
      <rect x="-10" y="-10" width="120" height="130" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-[-0.02em] ${className}`}>
      <Leaf className="h-[1.05em] w-auto text-lime" />
      Kenstera
    </span>
  );
}
