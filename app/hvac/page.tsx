import type { Metadata } from "next";
import { Check, Clock, Headset, MessageSquare, PhoneMissed, Star, Wrench, X } from "lucide-react";
import { Button, type Palette } from "@/components/el/ui";
import { Reveal, ScrollText } from "@/components/el/motion";
import { HvacHeroCard } from "@/components/hvac/live";
import { HowItWorks } from "@/components/hvac/HowItWorks";
import { AudienceSlider, BlockSection, CtaBand, ElFaq, TITLE_CLASS, TitleBlock } from "@/components/exact";
import { StickyCta } from "@/components/hvac/StickyCta";
import { SubNav } from "@/components/hvac/SubNav";
import { HVAC_BOOK_HREF, HVAC_BOOK_LABEL } from "@/components/hvac/links";
import { OG_IMAGE, jsonLdString } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Missed-Call Text Back and Reviews for HVAC Shops";
const DESCRIPTION =
  "Texts back every call your HVAC shop misses so customers book with you, then asks for Google reviews. Optional voice receptionist. No new software.";

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

const FAQS: { question: string; answer: string }[] = [
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

const DOTS =
  "repeating-radial-gradient(circle, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 6px)";

export default function HvacPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <JsonLd
        data={[
          serviceSchema({ name: "Missed-call text back and review requests for HVAC shops", description: DESCRIPTION, path: "/hvac", serviceType: "Missed-call text back" }),
          breadcrumbSchema([{ name: "HVAC shops", path: "/hvac" }]),
        ]}
      />
      <SubNav href={HVAC_BOOK_HREF} label={HVAC_BOOK_LABEL} />
      <main className="bg-page">
        {/* Hero: borderless block, headline and buttons left, paragraphs from column 7 */}
        <BlockSection bare className="pb-6 pt-16 lg:pb-10 lg:pt-24">
          <div className="grid grid-cols-12 gap-x-3">
            <div className="contents lg:col-span-6 lg:block lg:pr-5">
              <h1 className="el-trim col-span-12 text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:col-span-10 lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
                Don&rsquo;t let the next shop on Google get your 7pm call.
              </h1>
              <div className="order-last col-span-12 mt-8 flex flex-col gap-2 sm:flex-row">
                <Button href={HVAC_BOOK_HREF} className="w-full sm:w-auto">
                  {HVAC_BOOK_LABEL}
                </Button>
                <Button href="/hvac/example" variant="secondary" className="w-full sm:w-auto">
                  See a 2-minute example
                </Button>
              </div>
            </div>
            <div className="col-span-12 mt-8 flex flex-col gap-4 lg:col-span-6 lg:mt-0 lg:pl-5">
              <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
                A homeowner&rsquo;s AC quits at 7pm. They call down the Google list until somebody answers.
              </p>
              <p className="el-trim text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
                Kenstera texts back every call you miss, from your business number, so they book with you instead.
                Then it asks your happy customers for the reviews that help you show up higher in local search.
                Prefer a voice to answer? There&rsquo;s an optional voice receptionist.
              </p>
            </div>
          </div>
        </BlockSection>

        <BlockSection className="p-0" containerClassName="mt-[52px]">
          <HvacHeroCard />
        </BlockSection>

        {/* Statement (words fill as you scroll) and feature chips */}
        <BlockSection>
          <TitleBlock>
            <ScrollText
              as="h2"
              className={TITLE_CLASS}
              text="Every missed call is a customer dialing the next shop on the list. Kenstera gets back to them first."
            />
          </TitleBlock>
          <Reveal delay={120} className="mt-12 flex flex-wrap justify-center gap-2.5">
            {CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[15px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)]"
              >
                <c.icon className="h-4 w-4" strokeWidth={1.6} />
                {c.label}
              </span>
            ))}
          </Reveal>
        </BlockSection>

        {/* How it works: title block, then sticky rows */}
        <BlockSection id="how" className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-[120px]">
          <TitleBlock eyebrow="How it works">
            <h2 className={TITLE_CLASS}>You miss the call. They get a text. You get the job.</h2>
          </TitleBlock>
          <p className="el-trim mx-auto mt-5 max-w-[560px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
            It runs in the background. Nothing new for your techs to learn.
          </p>
        </BlockSection>
        <BlockSection className="p-0">
          <HowItWorks />
        </BlockSection>

        {/* Who it's for: tile slider */}
        <BlockSection id="what" className="px-6 pb-10 pt-20 lg:px-8 lg:pb-10 lg:pt-[120px]">
          <TitleBlock eyebrow="Who it's for">
            <h2 className={TITLE_CLASS}>Small shops where the owner still answers the phone</h2>
          </TitleBlock>
        </BlockSection>
        <BlockSection className="px-3 pb-20 pt-10 lg:pb-[120px]">
          <AudienceSlider
            items={AUDIENCE.map((a) => ({
              title: a.title,
              description: a.body,
              media: (
                <div className={`grad g-${a.palette} flex h-full w-full items-center justify-center`}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <a.icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                </div>
              ),
            }))}
          />
          <div className="mt-12 grid gap-2 sm:grid-cols-2 sm:gap-3">
            {[
              { t: "Quote follow-up", b: "A nudge to customers who got a quote and went quiet." },
              { t: "Google Business Profile tune-up", b: "A tidy-up of your listing so it's ready for the calls and reviews coming in." },
            ].map((x) => (
              <div key={x.t} className="relative overflow-hidden rounded-2xl bg-surface px-5 py-7">
                <p className="mb-2 text-[14px] leading-[19.6px] text-subtle">Later, if you want it</p>
                <h3 className="mb-[18px] text-[24px] font-normal leading-[31.2px] tracking-[-0.24px] text-black">{x.t}</h3>
                <p className="text-[16px] leading-[22.4px] tracking-[0.16px] text-[#6e6e6e]">{x.b}</p>
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.075)]" />
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href={HVAC_BOOK_HREF}>{HVAC_BOOK_LABEL}</Button>
          </div>
        </BlockSection>

        {/* Before and after: comparison grid */}
        <BlockSection id="compare" className="px-6 pb-10 pt-20 lg:px-8 lg:pb-10 lg:pt-[120px]">
          <TitleBlock eyebrow="Before and after">
            <h2 className={TITLE_CLASS}>What changes at your shop</h2>
          </TitleBlock>
        </BlockSection>
        <BlockSection className="pt-10 pb-20 lg:pb-[120px]" containerClassName="">
          <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1.5fr_1fr_1fr]">
            <div className="hidden border-y border-black/5 bg-page lg:block" />
            <div className="flex flex-col border-y border-black/5 bg-page px-4 py-4 lg:border-l lg:py-6">
              <p className="el-trim text-[17px] leading-[25px] tracking-[0.17px] text-black">Today</p>
            </div>
            <div className="flex flex-col border-y border-l border-black/5 bg-page px-4 py-4 lg:py-6">
              <p className="el-trim text-[17px] leading-[25px] tracking-[0.17px] text-black">With Kenstera</p>
            </div>
            {COMPARE.map((r) => (
              <div key={r.moment} className="contents">
                <div className="relative col-span-2 px-4 pb-2 pt-6 lg:col-span-1 lg:py-6">
                  <p className="el-trim text-[17px] leading-[25px] tracking-[0.17px] text-black">{r.moment}</p>
                </div>
                <div className="relative flex gap-2 px-4 pb-6 text-[15px] leading-[21px] text-subtle lg:border-l lg:border-black/5 lg:py-6">
                  <X className="mt-0.5 h-4 w-4 flex-none text-[#a59f97]" strokeWidth={1.5} />
                  {r.before}
                </div>
                <div className="relative flex gap-2 border-l border-black/5 px-4 pb-6 text-[15px] leading-[21px] text-black lg:py-6">
                  <Check className="mt-0.5 h-4 w-4 flex-none" strokeWidth={1.8} />
                  {r.after}
                </div>
                <div
                  aria-hidden
                  className="col-span-2 h-[2px] w-full lg:col-span-3"
                  style={{ backgroundImage: DOTS, backgroundSize: "6px 100%" }}
                />
              </div>
            ))}
          </div>
        </BlockSection>

        {/* FAQ */}
        <BlockSection id="faq">
          <ElFaq items={FAQS.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))} />
        </BlockSection>

        {/* Closing band */}
        <CtaBand id="book" title="Ready to stop losing the 7pm call? Fifteen minutes, and we'll tell you honestly if we can help.">
          <Button href={HVAC_BOOK_HREF}>{HVAC_BOOK_LABEL}</Button>
        </CtaBand>
      </main>
      <StickyCta href={HVAC_BOOK_HREF} label={HVAC_BOOK_LABEL} />
    </>
  );
}
