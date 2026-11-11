import Link from "next/link";
import { BOOKING_HREF } from "@/content/site";
import { Plant } from "./Plant";

// One headline, one sentence, two actions. The plant does the rest.
export function Hero() {
  return (
    <section className="hero relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="wrap relative z-[1] pt-[clamp(104px,15vh,170px)] text-center">
        <h1 className="display h1 fade-up mx-auto max-w-[12ch] text-paper">
          Make your business <em className="text-lime">thrive.</em>
        </h1>
        <p className="lede fade-up mx-auto mt-6 max-w-[34ch] text-paper/80" style={{ ["--d" as string]: "0.12s" }}>
          Websites, automations, and follow-up systems that catch every lead
          and take the busywork off your team.
        </p>
        <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2" style={{ ["--d" as string]: "0.24s" }}>
          <Link href={BOOKING_HREF} className="btn btn-lime">
            Book a call
          </Link>
          <a href="#systems" className="link text-lime">
            See what we do
          </a>
        </div>
      </div>

      <div className="plant-rise relative mt-auto flex justify-center pt-6 md:-mt-8 md:pt-0">
        <Plant priority className="h-auto w-[128%] max-w-none md:h-[min(66svh,740px)] md:w-auto" />
      </div>
    </section>
  );
}
