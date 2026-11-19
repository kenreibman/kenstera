import { Button, Section, SectionHeader } from "@/components/el/ui";

interface IndustriesGettingStartedProps {
  heading?: string;
  description?: string;
}

export function IndustriesGettingStarted({
  heading = "Start in days, not months",
  description = "Get started easily with minimal setup and hands-on support to explore what Conversational Agents can unlock for your business.",
}: IndustriesGettingStartedProps) {
  return (
    <Section>
      <SectionHeader label="Getting started" title={heading} description={<p>{description}</p>} />

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-10 rounded-2xl bg-surface p-8 sm:p-10">
          <div>
            <h3 className="text-[20px] text-black">Custom pricing based on your needs</h3>
            <p className="mt-2 max-w-md text-[15px] leading-[1.5] text-subtle">
              Get started with Kenstera Agents featuring enterprise-grade FDE deployment, global language readiness, and
              rapid integration support.
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
              Our team will guide you through setup, integration, and optimization to ensure your Conversational Agent
              delivers maximum value from day one.
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
