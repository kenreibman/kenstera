import { useId } from "react";
import { LEAF_PATH } from "@/components/brand/Leaf";
import type { SystemId } from "@/content/site";

/**
 * Botanical-plate diagram of the whole plant. Each part is a `data-part`
 * group; the active one is inked in clay. `active = null` shows every part.
 */
export function Anatomy({ active, className = "" }: { active: SystemId | null; className?: string }) {
  const uid = useId();
  const maskId = `${uid}-mask`;
  const bladeId = `${uid}-blade`;
  const on = (id: SystemId) => (active === id ? "true" : "false");
  return (
    <svg
      viewBox="0 0 400 580"
      className={`anatomy ${className}`}
      data-all={active === null ? "true" : "false"}
      role="img"
      aria-label="Diagram of a plant: roots, stem, branches and leaves, each standing for one Kenstera system"
      fill="none"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130">
          <path d={LEAF_PATH} fill="#fff" />
          <g stroke="#000" strokeWidth="4" strokeLinecap="round">
            <path d="M31 41-4 57M34 59 4 80M39 76 20 98M69 41 104 57M66 59 96 80M61 76 80 98" />
          </g>
          <g fill="#000">
            <ellipse cx="39" cy="35" rx="3" ry="2" />
            <ellipse cx="61" cy="35" rx="3" ry="2" />
            <ellipse cx="41" cy="53" rx="2.8" ry="1.9" />
            <ellipse cx="59" cy="53" rx="2.8" ry="1.9" />
          </g>
          <path d="M50 24V102" stroke="#000" strokeWidth="1" opacity="0.7" />
        </mask>
        <g id={bladeId}>
          <rect x="-10" y="-10" width="120" height="130" fill="currentColor" mask={`url(#${maskId})`} />
        </g>
      </defs>

      {/* soil line */}
      <path d="M40 420H360" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />

      <g data-part="leaves" data-on={on("leaves")}>
        <use href={`#${bladeId}`} transform="translate(112 190) rotate(38) scale(1.05) translate(-50 -24)" />
        <use href={`#${bladeId}`} transform="translate(292 160) rotate(-36) scale(1.15) translate(-50 -24)" />
        <use href={`#${bladeId}`} transform="translate(204 118) rotate(176) scale(0.95) translate(-50 -24)" />
        <text x="388" y="96" textAnchor="end" className="label" fill="currentColor">fig. 4 — folium</text>
        <path d="M388 104H300" stroke="currentColor" strokeWidth="0.75" />
      </g>

      <g data-part="branches" data-on={on("branches")} stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        <path d="M200 330C176 290 140 240 112 190" />
        <path d="M200 300C232 262 268 214 292 160" />
        <path d="M200 270C196 220 198 170 204 118" />
        <text x="12" y="286" className="label" fill="currentColor" stroke="none">fig. 3 — ramus</text>
        <path d="M12 294H150" strokeWidth="0.75" />
      </g>

      <g data-part="stem" data-on={on("stem")}>
        <path d="M200 420C204 380 196 330 200 262" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <text x="388" y="372" textAnchor="end" className="label" fill="currentColor">fig. 2 — caulis</text>
        <path d="M388 380H212" stroke="currentColor" strokeWidth="0.75" />
      </g>

      <g data-part="roots" data-on={on("roots")} stroke="currentColor" strokeLinecap="round">
        <path d="M200 420C198 450 190 480 170 520" strokeWidth="3" />
        <path d="M200 420C206 456 222 486 250 530" strokeWidth="3" />
        <path d="M200 424C176 440 140 446 104 470" strokeWidth="2.2" />
        <path d="M200 424C230 438 270 448 310 464" strokeWidth="2.2" />
        <path d="M184 478C170 484 150 500 136 524M228 492C246 500 272 506 290 520M140 452C128 462 112 482 104 500M272 450C290 462 300 480 304 498" strokeWidth="1.4" />
        <text x="12" y="548" className="label" fill="currentColor" stroke="none">fig. 1 — radix</text>
        <path d="M12 556H160" strokeWidth="0.75" />
      </g>
    </svg>
  );
}
