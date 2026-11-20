import { BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact";

interface IndustriesVoiceAgentsProps {
  label?: string;
  heading?: string;
  description?: string;
}

export function IndustriesVoiceAgents({
  label = "What we build",
  heading = "Voice Agents",
  description = "Kenstera's platform is intelligent. Real-time agents that talk, type, and take action. Resolve customer issues, automate tasks, and deliver accurate answers, all grounded in your data, tailored to your workflows, and ready to deploy at scale.",
}: IndustriesVoiceAgentsProps) {
  return (
    <BlockSection className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-[120px]">
      <TitleBlock eyebrow={label}>
        <h2 className={TITLE_CLASS}>{heading}</h2>
      </TitleBlock>
      <p className="el-trim mx-auto mt-5 max-w-[640px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
        {description}
      </p>
    </BlockSection>
  );
}

export default IndustriesVoiceAgents;
