import { Button, Section } from "@/components/el/ui";

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

/** Integration grid drawn with hairlines, like the elevenlabs.io logo wall. */
export function IndustriesIntegrations({
  heading = "Integrate seamlessly with your tech stack and the tools you already use",
  description = "Connect agents to your CRM, support desk, calendar, payment system, or telephony provider. Whether it's Salesforce, Stripe, Zendesk, or Twilio, integrations work out of the box with minimal setup",
  additionalText = "And hundreds more via APIs or MCPs.",
  items = defaultIntegrations,
}: IndustriesIntegrationsProps) {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-2 md:gap-12">
        <div>
          <p className="mb-3 text-[15px] text-subtle">Integrations</p>
          <h2 className="text-[32px] leading-[1.15] text-black sm:text-[40px]">{heading}</h2>
        </div>
        <div className="flex flex-col items-start justify-end gap-5">
          <p className="max-w-[440px] text-[16px] leading-[1.5] text-black/80">{description}</p>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 border-l border-t border-hairline sm:grid-cols-3">
        {items.map((name) => (
          <div
            key={name}
            className="flex h-24 items-center justify-center border-b border-r border-hairline text-[16px] text-black/60"
          >
            {name}
          </div>
        ))}
      </div>
      <p className="mt-6 text-[15px] text-subtle">{additionalText}</p>
    </Section>
  );
}

export default IndustriesIntegrations;
