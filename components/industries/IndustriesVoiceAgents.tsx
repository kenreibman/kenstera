import { Section, SectionHeader } from "@/components/el/ui";

interface IndustriesVoiceAgentsProps {
  label?: string;
  heading?: string;
  description?: string;
}

export function IndustriesVoiceAgents({
  label = "Industry-leading",
  heading = "Voice Agents",
  description = "Kenstera's platform is intelligent. Real-time agents that talk, type, and take action. Resolve customer issues, automate tasks, and deliver accurate answers, all grounded in your data, tailored to your workflows, and ready to deploy at scale.",
}: IndustriesVoiceAgentsProps) {
  return (
    <Section>
      <SectionHeader label={label} title={heading} description={<p>{description}</p>} />
    </Section>
  );
}

export default IndustriesVoiceAgents;
