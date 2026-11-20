import { Feature } from "@/lib/industry-content";
import { FeatureTabs } from "./FeatureTabs";

const defaultFeatures: Feature[] = [
  {
    title: "Build multi-agent workflows",
    description:
      "Design rich conversational flows using intuitive visual tools. Combine scripted steps with dynamic agents, customize behavior at each stage, and define exactly how your AI responds, across both voice and chat.",
  },
  {
    title: "Test guardrails",
    description:
      "Set up automated testing to ensure your agents stay on track. Define boundaries, test edge cases, and validate responses before going live.",
  },
  {
    title: "Monitor performance",
    description:
      "Track key metrics, analyze conversation outcomes, and continuously improve your agents with detailed analytics and insights.",
  },
];

interface IndustriesWorkflowsProps {
  heading?: string;
  features?: Feature[];
}

export function IndustriesWorkflows({
  heading = "Create multi-agent workflows with strict guardrails and track results with in depth testing and analytics",
  features = defaultFeatures,
}: IndustriesWorkflowsProps) {
  return <FeatureTabs label="Workflows" heading={heading} features={features} palette="iris" />;
}

export default IndustriesWorkflows;
