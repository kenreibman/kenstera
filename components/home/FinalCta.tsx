import Link from "next/link";
import { Arrow } from "@/components/brand/Leaf";
import { BOOKING_HREF, CONTACT_EMAIL } from "@/content/site";

// The plant returns: this section is a window back onto the 3D scene, now seen
// from beneath the canopy with the light on.
export function FinalCta({ scene = true }: { scene?: boolean }) {
  return (
    <section
      {...(scene ? { "data-scene-window": true, "data-scene-cta": true } : {})}
      className={`relative flex min-h-[92svh] items-center overflow-hidden py-28 ${scene ? "" : "bg-ink-2"}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 50% 55%, rgba(6,18,12,0.72), rgba(6,18,12,0.2) 75%)" }}
        aria-hidden="true"
      />
      <div className="wrap relative text-center">
        <p className="label reveal mb-8 text-lime">Planting season is always now</p>
        <h2 className="display reveal mx-auto max-w-[11ch] text-[clamp(3rem,10.5vw,9.5rem)] text-paper">
          Ready to <em className="text-lime">grow?</em>
        </h2>
        <p className="reveal mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/85">
          Fifteen minutes. You tell us where the business leaks; we tell you
          honestly whether we can fix it.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href={BOOKING_HREF} className="btn btn-lime">
            Book a 15-minute call <Arrow />
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ghost">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
