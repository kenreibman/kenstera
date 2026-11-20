"use client";

import { BlockSection, StickyContent, TITLE_CLASS, TitleBlock } from "@/components/exact";
import { UseCaseVisual } from "@/components/industries/UseCaseVisuals";

interface Feature {
  title: string;
  description: string;
}

/** A title block followed by sticky rows; each row's square panel plays a law-firm intake demo. */
function IntakeGroup({
  eyebrow,
  heading,
  features,
  offset,
}: {
  eyebrow: string;
  heading: string;
  features: Feature[];
  offset: number;
}) {
  return (
    <>
      <BlockSection className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-[120px]">
        <TitleBlock eyebrow={eyebrow}>
          <h2 className={TITLE_CLASS}>{heading}</h2>
        </TitleBlock>
      </BlockSection>
      <BlockSection className="p-0">
        <StickyContent
          items={features.map((f, i) => ({
            title: f.title,
            body: f.description,
            media: () => (
              <div className="h-full min-h-[440px] w-full lg:min-h-0">
                <UseCaseVisual index={(offset + i) % 3} variant="law" />
              </div>
            ),
          }))}
        />
      </BlockSection>
    </>
  );
}

export function IntakeCall() {
  return (
    <IntakeGroup
      eyebrow="Turn every call into a client"
      heading="Never lose a case because the phone wasn't answered"
      offset={0}
      features={[
        {
          title: "More signed cases, fewer missed calls",
          description:
            "AI intake specialists answer every inbound call, qualify leads, and route high-value cases to your team in real time, so no potential client slips away.",
        },
        {
          title: "Conversations that build client trust",
          description:
            "Natural, empathetic responses that make callers feel heard. Your AI handles sensitive conversations with the care your firm is known for.",
        },
        {
          title: "Free up your intake staff",
          description:
            "Let your team focus on high-touch client work while AI handles the initial screening, qualification, and appointment booking.",
        },
      ]}
    />
  );
}

export function IntakeBooking() {
  return (
    <IntakeGroup
      eyebrow="Appointments locked in on the first try"
      heading="No back-and-forth, no no-shows"
      offset={2}
      features={[
        {
          title: "Instant consultation booking",
          description:
            "Calls convert directly into confirmed appointments with seamless calendar and booking system integration. No manual follow-up required.",
        },
        {
          title: "Fewer no-shows",
          description:
            "Automated confirmations and reminders via text and email help reduce no-shows, so your attorneys spend less time waiting.",
        },
        {
          title: "Scale without extra headcount",
          description:
            "Handle more calls without hiring additional intake staff. Your AI works nights, weekends, and holidays.",
        },
      ]}
    />
  );
}

export function IntakeSetup() {
  return (
    <IntakeGroup
      eyebrow="Immediate impact for your firm"
      heading="Easy to launch, built to pay off"
      offset={1}
      features={[
        {
          title: "Simple setup",
          description:
            "Connect your phone line and calendar and we set up your AI intake specialist for you. No IT support required.",
        },
        {
          title: "Grow without the overhead",
          description:
            "Add intake capacity without adding intake staff, so growth doesn't mean growing your overhead.",
        },
        {
          title: "Recovered leads",
          description:
            "Calls that would have gone to voicemail get answered and followed up, so more inquiries turn into consultations.",
        },
      ]}
    />
  );
}
