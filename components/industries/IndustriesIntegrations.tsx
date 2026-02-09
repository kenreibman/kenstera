import Link from "next/link";

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

export function IndustriesIntegrations({
  heading = "Integrate seamlessly with your tech stack and the tools you already use",
  description = "Connect agents to your CRM, support desk, calendar, payment system, or telephony provider. Whether it's Salesforce, Stripe, Zendesk, or Twilio, integrations work out of the box with minimal setup",
  additionalText = "And hundreds more via APIs or MCPs.",
  items = defaultIntegrations,
}: IndustriesIntegrationsProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Dotted line */}
        <div className="border-t-2 border-dotted border-gray-300 mb-4" />

        {/* Section label */}
        <p className="text-sm font-medium text-gray-900 mb-16">Integrations</p>

        {/* Centered heading */}
        <h2 className="text-2xl lg:text-4xl font-medium text-gray-900 text-center mb-6 max-w-3xl mx-auto">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
          {description}
        </p>

        {/* Logo grid - 3x3 */}
        <div className="max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden mb-12">
          <div className="grid grid-cols-3">
            {items.map((name, index) => (
              <div
                key={name}
                className={`flex items-center justify-center py-8 px-4 ${
                  index % 3 !== 2 ? "border-r border-gray-200" : ""
                } ${index < 6 ? "border-b border-gray-200" : ""}`}
              >
                <span className="text-gray-400 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional text */}
        <p className="text-gray-900 text-center mb-8">
          {additionalText}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/integrations"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
          >
            View all Integrations
          </Link>
        </div>
      </div>
    </section>
  );
}

export default IndustriesIntegrations;
