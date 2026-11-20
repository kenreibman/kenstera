import { Feature } from "@/lib/industry-content";
import { FeatureTabs } from "./FeatureTabs";

const defaultFeatures: Feature[] = [
  {
    title: "Conversational agents that speak, read, and see",
    description:
      "Multimodal by design, Kenstera Agents understand spoken or written inputs, retrieve the right answers, and respond naturally in real time. Agents listen, read, and interact just like a human would, across voice and chat.",
  },
  {
    title: "Take action with external tool calls",
    description:
      "Connect your agents to external APIs and tools. Schedule appointments, look up information, process payments, and more, all within the conversation flow.",
  },
  {
    title: "Deploy anywhere your customers are",
    description:
      "Embed agents on your website, mobile app, phone system, or messaging platforms. Meet customers where they are with consistent, intelligent support.",
  },
];

interface IndustriesMultimodalProps {
  heading?: string;
  features?: Feature[];
}

export function IndustriesMultimodal({
  heading = "Kenstera Agents resolve issues, deliver answers, and take action - anytime, anywhere",
  features = defaultFeatures,
}: IndustriesMultimodalProps) {
  return <FeatureTabs label="Capabilities" heading={heading} features={features} palette="dusk" />;
}

export default IndustriesMultimodal;
