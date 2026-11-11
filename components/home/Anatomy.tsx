import { useId } from "react";
import { LEAF_PATH } from "@/components/brand/Leaf";
import type { SystemId } from "@/content/site";

/**
 * The whole plant as a small silhouette. One part is drawn solid in the
 * accent colour; the rest recede. Decorative only.
 */
export function Anatomy({ active, className = "" }: { active: SystemId; className?: string }) {
  const uid = useId();
  const maskId = `${uid}-mask`;
  const bladeId = `${uid}-blade`;
  const tone = (id: SystemId) =>
    active === id ? { color: "var(--color-leaf)", opacity: 1 } : { color: "currentColor", opacity: 0.14 };
  return (
    <svg viewBox="30 60 340 480" className={className} aria-hidden="true" fill="none">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130">
          <path d={LEAF_PATH} fill="#fff" />
          <path d="M31 41-4 57M34 59 4 80M39 76 20 98M69 41 104 57M66 59 96 80M61 76 80 98" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
        </mask>
        <g id={bladeId}>
          <rect x="-10" y="-10" width="120" height="130" fill="currentColor" mask={`url(#${maskId})`} />
        </g>
      </defs>

      <g style={tone("leaves")}>
        <use href={`#${bladeId}`} transform="translate(112 190) rotate(38) scale(1.05) translate(-50 -24)" />
        <use href={`#${bladeId}`} transform="translate(292 160) rotate(-36) scale(1.15) translate(-50 -24)" />
        <use href={`#${bladeId}`} transform="translate(204 118) rotate(176) scale(0.95) translate(-50 -24)" />
      </g>
      <g style={tone("branches")} stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M200 330C176 290 140 240 112 190" />
        <path d="M200 300C232 262 268 214 292 160" />
        <path d="M200 270C196 220 198 170 204 118" />
      </g>
      <g style={tone("stem")}>
        <path d="M200 420C204 380 196 330 200 262" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      </g>
      <g style={tone("roots")} stroke="currentColor" strokeLinecap="round">
        <path d="M200 420C198 450 190 480 170 520M200 420C206 456 222 486 250 530" strokeWidth="6" />
        <path d="M200 424C176 440 140 446 104 470M200 424C230 438 270 448 310 464" strokeWidth="4.5" />
      </g>
    </svg>
  );
}
