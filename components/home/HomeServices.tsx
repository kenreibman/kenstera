import { Globe, Headset, MapPin, Megaphone, MessageSquare, Star } from "lucide-react";
import { Button, Container, Section, SectionHeader } from "@/components/el/ui";
import { Reveal, ScrollText } from "@/components/el/motion";
import { THETICKSUIT } from "@/content/clients";
import { HomeFeatures } from "./HomeFeatures";

const CHIPS = [
  { icon: Globe, label: "Websites" },
  { icon: MessageSquare, label: "Text back" },
  { icon: Headset, label: "Voice receptionist" },
  { icon: Star, label: "Reviews" },
  { icon: Megaphone, label: "Campaigns" },
  { icon: MapPin, label: "Local SEO" },
];

/**
 * The elevenlabs.io /studio rhythm: a scroll-filled statement with feature
 * chips, then feature rows whose product panel stays pinned and swaps as the
 * copy scrolls.
 */
export function HomeServices() {
  return (
    <>
      <section className="border-t border-hairline">
        <Container framed>
          <div className="mx-auto max-w-[880px] py-24 text-center sm:py-36">
            <ScrollText
              className="text-[30px] leading-[1.2] tracking-[-0.012em] sm:text-[48px]"
              text="Websites, automations, and marketing systems that turn stagnant brands into thriving ones."
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

      <Section id="services">
        <Reveal>
          <SectionHeader
            label="What we do"
            title="Six systems that work together"
            action={<Button href="/contact">Contact us</Button>}
            description={<p>Built and managed for you, so you can get back to running the business.</p>}
          />
        </Reveal>
        <div className="mt-10 sm:mt-16">
          <HomeFeatures />
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        </Reveal>
      </Section>
    </>
  );
}

export default HomeServices;
