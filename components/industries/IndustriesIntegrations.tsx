import { Button } from "@/components/el/ui";
import { BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact";

const defaultIntegrations = [
  "Pipedrive",
  "Stripe",
  "Cal.com",
  "Zendesk",
  "Vonage",
  "n8n",
  "HubSpot",
  "Salesforce",
  "Twilio",
];

interface IndustriesIntegrationsProps {
  heading?: string;
  description?: string;
  additionalText?: string;
  items?: string[];
}

/** Title block, then the integrations wall drawn with hairlines inside the frame. */
export function IndustriesIntegrations({
  heading = "Integrate seamlessly with your tech stack and the tools you already use",
  description = "Connect agents to your CRM, support desk, calendar, payment system, or telephony provider. Whether it's Salesforce, Stripe, Zendesk, or Twilio, integrations work out of the box with minimal setup",
  additionalText = "And hundreds more via APIs or MCPs.",
  items = defaultIntegrations,
}: IndustriesIntegrationsProps) {
  return (
    <>
      <BlockSection className="px-6 pb-12 pt-20 lg:px-8 lg:pb-14 lg:pt-[120px]">
        <TitleBlock eyebrow="Integrations">
          <h2 className={TITLE_CLASS}>{heading}</h2>
        </TitleBlock>
        <p className="el-trim mx-auto mt-5 max-w-[560px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
          {description}
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </BlockSection>
      <BlockSection className="p-0">
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {items.map((name) => (
            <div
              key={name}
              className="flex h-24 items-center justify-center border-b border-r border-black/5 text-[16px] text-subtle [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0"
            >
              {name}
            </div>
          ))}
        </div>
        <p className="border-t border-black/5 py-6 text-center text-[14px] leading-[19.6px] text-[#59544f]">
          {additionalText}
        </p>
      </BlockSection>
    </>
  );
}

export default IndustriesIntegrations;
