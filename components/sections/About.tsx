import Link from "next/link";
import { Video } from "@/components/Video";

export function About() {
  return (
    <section className="relative bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="hidden aspect-square lg:block lg:col-span-6">
            <Video
                mp4Src="/video/blob.mp4"
                webmSrc="/video/blob.webm"
                posterSrc="/video/blob.webp"
                className="w-full h-full"
                sizes="(min-width: 1024px) 528px, 1px"
                preload="none"
              />
          </div>

          <div className="lg:col-span-6">

            <h2 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              Why Kenstera?
            </h2>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-6 text-black">
              What if your business could respond to leads in seconds?  Kenstera helps you bridge connections with prospects before they move on to your competitors. <br></br> <br></br> Our AI-powered lead engagement software automates follow-ups, schedules appointments, and nurtures relationships, allowing your team to focus on closing deals and growing your business. Experience the future of lead management with Kenstera.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact-sales"
                className="bg-white border border-black rounded-full px-6 py-3 text-black text-sm font-medium transition hover:bg-black hover:text-white inline-block"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
