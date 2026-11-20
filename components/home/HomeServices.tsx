import { Globe, Headset, MapPin, Megaphone, MessageSquare, Star } from "lucide-react";
import { BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact";
import { Reveal, ScrollText } from "@/components/el/motion";
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
 * The /studio rhythm, measured: a centered title block (the words fill in as you scroll) with
 * feature chips, a title for the services, then sticky rows whose square panel stays pinned and swaps.
 */
export function HomeServices() {
  return (
    <>
      <BlockSection>
        <TitleBlock>
          <ScrollText
            as="h2"
            className={TITLE_CLASS}
            text="Websites, automations, and marketing systems that turn stagnant brands into thriving ones."
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

      <BlockSection id="services" className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-[120px]">
        <TitleBlock eyebrow="What we do">
          <h2 className={TITLE_CLASS}>Six systems that work together</h2>
        </TitleBlock>
        <p className="el-trim mx-auto mt-5 max-w-[560px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
          Built and managed for you, so you can get back to running the business.
        </p>
      </BlockSection>

      <BlockSection className="p-0">
        <HomeFeatures />
      </BlockSection>
    </>
  );
}

export default HomeServices;
