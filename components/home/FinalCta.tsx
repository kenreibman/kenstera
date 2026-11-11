import Link from "next/link";
import { BOOKING_HREF, CONTACT_EMAIL } from "@/content/site";
import { Plant } from "./Plant";

// The plant returns beneath the closing invitation.
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[clamp(96px,14vw,180px)]">
      <div className="wrap relative z-[1] text-center">
        <h2 className="display h1 reveal mx-auto max-w-[12ch] text-paper">Ready to grow?</h2>
        <p className="lede reveal mx-auto mt-6 max-w-[36ch] text-paper/80">
          Fifteen minutes. Tell us where the business leaks, and we&apos;ll
          tell you honestly whether we can fix it.
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          <Link href={BOOKING_HREF} className="btn btn-lime">
            Book a call
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link text-lime">
            Email us
          </a>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <Plant className="h-auto w-[120%] max-w-none md:h-[min(58svh,640px)] md:w-auto" />
      </div>
    </section>
  );
}
