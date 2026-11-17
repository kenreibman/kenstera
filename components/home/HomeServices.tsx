import { Star, Megaphone, MapPin } from "lucide-react";
import { Button, Card, CardCaption, GradientCard, Section, SectionHeader } from "@/components/el/ui";
import { THETICKSUIT } from "@/content/clients";
import { TextBackMock, WebsiteMock } from "./mocks";

const SMALL = [
  {
    icon: Star,
    label: "Review Funnel",
    text: "Automatic review requests that build genuine social proof for your business.",
  },
  {
    icon: Megaphone,
    label: "Marketing Campaigns",
    text: "Targeted paid and email campaigns that drive qualified demand.",
  },
  {
    icon: MapPin,
    label: "Local SEO",
    text: "Organic lead acquisition through local search visibility.",
  },
];

/** The elevenlabs.io product bento: header, two feature cards, a row of three, then a client row. */
export function HomeServices() {
  return (
    <Section id="services">
      <SectionHeader
        label="What we do"
        title="We help businesses grow"
        action={<Button href="/contact-sales">Contact us</Button>}
        description={
          <p>
            Websites, automations, and marketing systems that turn stagnant brands into thriving ones.
            Five systems that work together, built and managed for you.
          </p>
        }
      />

      <div className="mt-14 grid gap-3 lg:grid-cols-2">
        <GradientCard
          palette="dawn"
          label="Custom Websites"
          caption="Conversion-optimized, high-performance websites."
          className="min-h-[520px]"
        >
          <WebsiteMock className="max-w-[460px]" />
        </GradientCard>

        <Card className="flex min-h-[520px] flex-col p-6 sm:p-8">
          <div className="flex flex-1 items-center justify-center py-6">
            <TextBackMock />
          </div>
          <CardCaption
            label="Missed Call Text Back"
            text="24/7 intake that instantly texts back missed calls, so no lead is ever lost."
          />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {SMALL.map((s) => (
          <Card key={s.label} className="flex min-h-[240px] flex-col justify-between p-6 sm:p-7">
            <span className="ring-hairline flex h-10 w-10 items-center justify-center rounded-lg bg-white/70">
              <s.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <CardCaption label={s.label} text={s.text} />
          </Card>
        ))}
      </div>

      {/* Client row */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl px-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grad g-moss flex h-11 w-11 flex-none items-center justify-center rounded-xl text-[15px] font-semibold text-white">
            T
          </span>
          <div>
            <p className="text-[16px] text-black">{THETICKSUIT.name}</p>
            <p className="text-[15px] text-subtle">{THETICKSUIT.summary}</p>
          </div>
        </div>
        <Button href={THETICKSUIT.caseStudyHref} variant="secondary">
          Read the case study
        </Button>
      </div>
    </Section>
  );
}

export default HomeServices;
