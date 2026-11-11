import Link from "next/link";
import Script from "next/script";
import { CONTACT_EMAIL } from "@/content/site";

const NEXT = [
  { title: "Check your inbox", body: "A calendar invite with the call link is on its way." },
  { title: "Bring the mess", body: "The more honestly you describe where things leak, the more useful the call." },
  { title: "Leave with a plan", body: "If we can help, you'll get a timeline and a quote before any work begins." },
];

export default function BookingConfirmedPage() {
  return (
    <main id="main" className="relative z-[1] pb-28 pt-[clamp(128px,20vh,210px)]">
      <Script
        id="meta-pixel-schedule"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `fbq('track', 'PageView'); fbq('track', 'Schedule');` }}
      />
      <div className="wrap text-center">
        <h1 className="display h1 fade-up">You&apos;re booked.</h1>
        <p className="lede fade-up mx-auto mt-5 max-w-[36ch] text-paper/80" style={{ ["--d" as string]: "0.12s" }}>
          Your call is on the calendar. We&apos;re looking forward to it.
        </p>

        <ul className="mt-16 grid gap-4 text-left md:grid-cols-3 md:gap-5">
          {NEXT.map((n, i) => (
            <li key={n.title} className="fade-up rounded-[28px] bg-white/[0.06] p-8" style={{ ["--d" as string]: `${0.24 + i * 0.08}s` }}>
              <h2 className="text-[21px] font-semibold tracking-[-0.02em]">{n.title}</h2>
              <p className="mt-2.5 leading-relaxed text-sage">{n.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          <Link href="/" className="link text-lime">Back to home</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link text-lime">Email us</a>
        </div>
      </div>
    </main>
  );
}
