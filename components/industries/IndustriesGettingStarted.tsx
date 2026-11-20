import { Button } from "@/components/el/ui";
import { BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact";

interface IndustriesGettingStartedProps {
  heading?: string;
  description?: string;
}

function TextCard({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-2xl bg-surface px-5 py-7 lg:min-h-[320px] lg:p-8">
      <div>
        <h3 className="mb-[18px] text-[24px] font-normal leading-[31.2px] tracking-[-0.24px] text-black">{title}</h3>
        <p className="max-w-md text-[16px] leading-[22.4px] tracking-[0.16px] text-[#6e6e6e]">{body}</p>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.075)]" />
    </div>
  );
}

export function IndustriesGettingStarted({
  heading = "Hands-on setup, then we manage it",
  description = "Get started with hands-on setup and support from our team.",
}: IndustriesGettingStartedProps) {
  return (
    <>
      <BlockSection className="px-6 pb-10 pt-20 lg:px-8 lg:pb-10 lg:pt-[120px]">
        <TitleBlock eyebrow="Getting started">
          <h2 className={TITLE_CLASS}>{heading}</h2>
        </TitleBlock>
        <p className="el-trim mx-auto mt-5 max-w-[560px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
          {description}
        </p>
      </BlockSection>
      <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
        <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
          <TextCard
            title="Custom pricing based on your needs"
            body="Every business is different, so we scope the work with you and quote it to fit. No contracts, and you can cancel anytime."
          >
            <Button href="/contact">Contact Us</Button>
            <Button href="/pricing" variant="secondary">
              View Pricing
            </Button>
          </TextCard>
          <TextCard
            title="Dedicated onboarding and support"
            body="Our team guides you through setup, integration, and ongoing optimization, so you are never left figuring it out alone."
          >
            <Button href="/contact">Contact Us</Button>
            <Button href="/contact" variant="secondary">
              Book a call
            </Button>
          </TextCard>
        </div>
      </BlockSection>
    </>
  );
}

export default IndustriesGettingStarted;
