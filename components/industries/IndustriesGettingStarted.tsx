import { Button, Section, SectionHeader } from "@/components/el/ui";

interface IndustriesGettingStartedProps {
  heading?: string;
  description?: string;
}

export function IndustriesGettingStarted({
  heading = "Hands-on setup, then we manage it",
  description = "Get started with hands-on setup and support from our team.",
}: IndustriesGettingStartedProps) {
  return (
    <Section>
      <SectionHeader label="Getting started" title={heading} description={<p>{description}</p>} />

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-10 rounded-2xl bg-surface p-8 sm:p-10">
          <div>
            <h3 className="text-[20px] text-black">Custom pricing based on your needs</h3>
            <p className="mt-2 max-w-md text-[15px] leading-[1.5] text-subtle">
              Every business is different, so we scope the work with you and quote it to fit. No contracts, and you can
              cancel anytime.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="/contact">Contact Us</Button>
            <Button href="/pricing" variant="secondary">
              View Pricing
            </Button>
          </div>
        </div>

        <div className="ring-hairline flex flex-col justify-between gap-10 rounded-2xl bg-white p-8 sm:p-10">
          <div>
            <h3 className="text-[20px] text-black">Dedicated onboarding and support</h3>
            <p className="mt-2 max-w-md text-[15px] leading-[1.5] text-subtle">
              Our team guides you through setup, integration, and ongoing optimization, so you are never left
              figuring it out alone.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="/contact">Contact Us</Button>
            <Button href="/contact" variant="secondary">
              Book a call
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default IndustriesGettingStarted;
