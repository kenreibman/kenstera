import type { Metadata } from "next";
import { Check, Clock, Headset, MessageSquare, PhoneMissed, Star, Wrench, X } from "lucide-react";
import { Button, Container, Section, SectionHeader, type Palette } from "@/components/el/ui";
import { Reveal, ScrollText } from "@/components/el/motion";
import { HvacHeroCard } from "@/components/hvac/live";
import { HowItWorks } from "@/components/hvac/HowItWorks";
import { HvacFaq, type HvacFaqItem } from "@/components/hvac/HvacFaq";
import { StickyCta } from "@/components/hvac/StickyCta";
import { SubNav } from "@/components/hvac/SubNav";
import { HVAC_BOOK_HREF, HVAC_BOOK_LABEL } from "@/components/hvac/links";
import { OG_IMAGE, jsonLdString } from "@/lib/seo";

const TITLE = "Missed-call text-back and review requests for HVAC shops";
const DESCRIPTION =
  "When you miss a call, Kenstera texts the customer back from your business number so they book with you. Every finished job gets a review request. An optional voice receptionist can answer instead. No new software for your techs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://kenstera.com/hvac" },
  openGraph: {
    title: `${TITLE} | Kenstera`,
    description: DESCRIPTION,
    url: "https://kenstera.com/hvac",
    type: "website",
    images: [...OG_IMAGE],
  },
};

const CHIPS = [
  { icon: PhoneMissed, label: "Missed-call text-back" },
  { icon: Star, label: "Review requests" },
  { icon: Headset, label: "Voice receptionist, optional" },
  { icon: MessageSquare, label: "Quote follow-up, later" },
  { icon: Wrench, label: "Nothing new for your techs" },
];

const AUDIENCE: { title: string; body: string; palette: Palette; icon: typeof Clock }[] = [
  {
    title: "Small crews with a busy phone",
    body: "A few trucks, maybe someone in the office, and a phone that rings while everyone's out on jobs.",
    palette: "dusk",
    icon: PhoneMissed,
  },
  {
    title: "Shops that want more Google reviews",
    body: "Happy customers rarely think to leave one. A text at the right moment does the asking for you.",
    palette: "ember",
    icon: Star,
  },
  {
    title: "Owners who don't want new software",
    body: "It runs in the background. Nothing new for your techs to learn.",
    palette: "moss",
    icon: Wrench,
  },
];

const COMPARE = [
  { moment: "A call goes to voicemail", before: "The customer tries the next shop", after: "They get a text from your business number" },
  { moment: "The job wraps up", before: "You hope they remember to review", after: "A review request goes out" },
  { moment: "Your techs", before: "Keep doing their jobs", after: "Keep doing their jobs, nothing new" },
  { moment: "Follow-up", before: "Whenever someone remembers", after: "Handled in the background" },
  { moment: "Prefer a voice to answer?", before: "Voicemail", after: "An optional voice receptionist picks up" },
];

const FAQS: HvacFaqItem[] = [
  {
    question: "Do my techs have to do anything?",
    answer: "No. It runs in the background, and your techs keep doing what they already do.",
  },
  {
    question: "How fast can it be live?",
    answer:
      "Within about 2 weeks. Texting needs carrier approval, so we start that first.",
  },
  {
    question: "What's the optional voice receptionist?",
    answer:
      "If you'd rather a voice picks up the call than a text, a voice receptionist answers, asks what's going on, and gets the details to you. It's an add-on we can talk through on the intro call.",
  },
  {
    question: "Does it work with Housecall Pro, Jobber, or ServiceTitan?",
    answer:
      "Maybe. We'd check on the call. We don't want to promise a connection before we've looked at how your shop runs.",
  },
  {
    question: "What does it cost?",
    answer:
      "We'll go over it on the 15-minute call so you get a number that fits your shop. There are no contracts, and you can cancel anytime.",
  },
  {
    question: "What happens on the intro call?",
    answer:
      "Fifteen minutes to talk through how calls and reviews work at your shop today, and whether we're a fit. Nothing to prepare.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HvacPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <SubNav href={HVAC_BOOK_HREF} label={HVAC_BOOK_LABEL} />
      <main className="bg-page">
        {/* Hero */}
        <section>
          <Container framed>
            <div className="grid gap-8 pb-12 pt-14 sm:pt-24 md:grid-cols-2 md:gap-12">
              <div className="fade-in-up">
                <h1 className="text-[40px] leading-[1.06] text-black sm:text-[56px]">
                  Don&rsquo;t let the next shop on Google get your 7pm call.
                </h1>
                <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                  <Button href={HVAC_BOOK_HREF} className="w-full sm:w-auto">
                    {HVAC_BOOK_LABEL}
                  </Button>
                  <Button href="/hvac/example" variant="secondary" className="w-full sm:w-auto">
                    See a 2-minute example
                  </Button>
                </div>
              </div>
              <div
                className="fade-in-up max-w-[520px] space-y-4 text-[17px] leading-[1.5] text-black md:pt-3"
                style={{ animationDelay: "120ms" }}
              >
                <p>A homeowner&rsquo;s AC quits at 7pm. They call down the Google list until somebody answers.</p>
                <p>
                  Kenstera texts back every call you miss, from your business number, so they book with you instead.
                  Then it asks your happy customers for the reviews that help you show up higher in local search.
                  Prefer a voice to answer? There&rsquo;s an optional voice receptionist.
                </p>
              </div>
            </div>

            <div className="fade-in-up mb-16 sm:mb-24" style={{ animationDelay: "240ms" }}>
              <HvacHeroCard />
            </div>
          </Container>
        </section>

        {/* Statement with scroll-filled words and feature chips */}
        <section className="border-t border-hairline">
          <Container framed>
            <div className="mx-auto max-w-[860px] py-24 text-center sm:py-36">
              <ScrollText
                className="text-[30px] leading-[1.2] tracking-[-0.012em] sm:text-[48px]"
                text="Every missed call is a customer dialing the next shop on the list. Kenstera gets back to them first."
              />
              <Reveal delay={120} className="mt-12 flex flex-wrap justify-center gap-2.5">
                {CHIPS.map((c) => (
                  <span
                    key={c.label}
                    className="ring-hairline inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px]"
                  >
                    <c.icon className="h-4 w-4" strokeWidth={1.6} />
                    {c.label}
                  </span>
                ))}
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Sticky feature rows */}
        <Section id="how">
          <Reveal>
            <SectionHeader
              label="How it works"
              title="You miss the call. They get a text. You get the job."
              description={<p>It runs in the background. Nothing new for your techs to learn.</p>}
            />
          </Reveal>
          <div className="mt-10 sm:mt-16">
            <HowItWorks />
          </div>
        </Section>

        {/* Who it's for: gradient cards */}
        <Section id="what">
          <Reveal>
            <SectionHeader
              label="Who it's for"
              title="Small shops where the owner still answers the phone"
              action={
                <Button href={HVAC_BOOK_HREF}>
                  {HVAC_BOOK_LABEL}
                </Button>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.title} delay={i * 90}>
                <div className="group">
                  <div className={`grad g-${a.palette} flex aspect-[4/3] items-center justify-center rounded-2xl`}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-500 group-hover:scale-110">
                      <a.icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                  </div>
                  <p className="mt-5 text-[19px] leading-[1.25] text-black">{a.title}</p>
                  <p className="mt-2 text-[15px] leading-[1.5] text-subtle">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-3 grid gap-3 md:grid-cols-2">
            {[
              { t: "Quote follow-up", b: "A nudge to customers who got a quote and went quiet." },
              { t: "Google Business Profile tune-up", b: "A tidy-up of your listing so it's ready for the calls and reviews coming in." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-surface p-6 sm:p-7">
                <p className="mb-3 text-[13px] text-subtle">Later, if you want it</p>
                <p className="text-[19px] text-black">{x.t}</p>
                <p className="mt-1 text-[15px] leading-[1.5] text-subtle">{x.b}</p>
              </div>
            ))}
          </Reveal>
        </Section>

        {/* Before and after table */}
        <Section id="compare">
          <Reveal>
            <SectionHeader label="Before and after" title="What changes at your shop" />
          </Reveal>
          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-2xl bg-surface">
              <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 px-5 py-4 text-[14px] text-subtle sm:px-8">
                <span />
                <span>Today</span>
                <span className="text-black">With Kenstera</span>
              </div>
              {COMPARE.map((r) => (
                <div
                  key={r.moment}
                  className="dotted-row grid grid-cols-[1.1fr_1fr_1fr] items-start gap-4 px-5 py-5 pb-[22px] sm:px-8"
                >
                  <span className="text-[15px] text-black sm:text-[16px]">{r.moment}</span>
                  <span className="flex gap-2 text-[14px] leading-[1.4] text-subtle sm:text-[15px]">
                    <X className="mt-0.5 hidden h-4 w-4 flex-none sm:block" strokeWidth={1.5} />
                    {r.before}
                  </span>
                  <span className="flex gap-2 text-[14px] leading-[1.4] text-black sm:text-[15px]">
                    <Check className="mt-0.5 hidden h-4 w-4 flex-none sm:block" strokeWidth={1.8} />
                    {r.after}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section id="faq">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:sticky md:top-36 md:col-span-5 md:self-start">
              <h2 className="text-[34px] leading-[1.12] text-black sm:text-[44px]">Frequently asked questions</h2>
            </div>
            <div className="md:col-span-7">
              <HvacFaq items={FAQS} />
            </div>
          </div>
        </Section>

        {/* Closing */}
        <section id="book" className="scroll-mt-32 border-t border-hairline">
          <Container framed>
            <div className="py-16 sm:py-28">
              <Reveal>
                <div className="grad g-ember flex min-h-[380px] flex-col justify-end rounded-2xl p-7 sm:p-12">
                  <h2 className="max-w-xl text-[34px] leading-[1.1] text-white sm:text-[52px]">
                    Ready to stop losing the 7pm call?
                  </h2>
                  <p className="mt-3 max-w-md text-[17px] leading-[1.45] text-white/90">
                    Fifteen minutes. We&rsquo;ll talk through your shop and tell you honestly if we can help.
                  </p>
                  <div className="mt-8">
                    <Button href={HVAC_BOOK_HREF} variant="light" className="w-full sm:w-auto">
                      {HVAC_BOOK_LABEL}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <StickyCta href={HVAC_BOOK_HREF} label={HVAC_BOOK_LABEL} />
    </>
  );
}
