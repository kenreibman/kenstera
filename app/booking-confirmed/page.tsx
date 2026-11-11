import Link from "next/link";
import Script from "next/script";
import { Leaf } from "@/components/brand/Leaf";
import { CONTACT_EMAIL } from "@/content/site";

const NEXT = [
  { title: "Check your inbox", body: "A calendar invite with the call link is on its way." },
  { title: "Bring the mess", body: "The more honestly you describe where things leak, the more useful the call." },
  { title: "Leave with a plan", body: "If we can help, you'll get a timeline and a quote before any work begins." },
];

export default function BookingConfirmedPage() {
  return (
    <main id="main" className="relative z-[1] overflow-hidden pb-24 pt-36 md:pt-48">
      <Script
        id="meta-pixel-schedule"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `fbq('track', 'PageView'); fbq('track', 'Schedule');` }}
      />
      <Leaf veins className="pointer-events-none absolute -right-24 top-16 w-[480px] max-w-[70vw] rotate-[16deg] text-moss/70" />
      <div className="wrap relative">
        <p className="label fade-up mb-6 flex items-center gap-3 text-lime">
          <span className="inline-block h-px w-8 bg-lime" />
          Booking confirmed
        </p>
        <h1 className="display max-w-[11ch] text-[clamp(3rem,9vw,7.5rem)]">
          <span className="line-mask"><span>Seed <em className="text-lime">planted.</em></span></span>
        </h1>
        <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-paper/85" style={{ ["--d" as string]: "0.3s" }}>
          Your call is on the calendar. We&apos;re looking forward to it.
        </p>

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {NEXT.map((n, i) => (
            <li key={n.title} className="fade-up rule-dark pt-6" style={{ ["--d" as string]: `${0.4 + i * 0.1}s` }}>
              <p className="label text-lime">0{i + 1}</p>
              <h2 className="display mt-3 text-3xl">{n.title}</h2>
              <p className="mt-3 leading-relaxed text-sage">{n.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link href="/" className="btn btn-ghost">Back to home</Link>
          <p className="text-sage">
            Questions first?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="nav-link text-paper">{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </main>
  );
}
