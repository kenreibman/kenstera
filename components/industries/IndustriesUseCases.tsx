import { AudienceSlider, BlockSection } from "@/components/exact";
import { UseCase } from "@/lib/industry-content";
import { UseCaseVisual, type UseCaseVariant } from "./UseCaseVisuals";

const defaultUseCases: UseCase[] = [
  {
    title: "Customer Support",
    description:
      "now powered by always-on, empathetic voice agents that resolve issues instantly, reduce wait times, and boost satisfaction.",
  },
  {
    title: "Inbound Scheduling",
    description:
      "automated through voice agents that coordinate calendars and handle booking requests with ease.",
  },
  {
    title: "Learning & Development",
    description:
      "powered by voice-driven roleplay agents that simulate real-world scenarios and build employee skills.",
  },
];

interface IndustriesUseCasesProps {
  useCases?: UseCase[];
  /** `law` shows personal-injury intake demos; anything else gets neutral ones. */
  variant?: UseCaseVariant;
}

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** The tile slider block: square animated demos with a title and a short line under each. */
export function IndustriesUseCases({ useCases = defaultUseCases, variant = "general" }: IndustriesUseCasesProps) {
  return (
    <BlockSection className="px-3 pb-20 pt-10 lg:pb-[120px]">
      <AudienceSlider
        items={useCases.map((u, i) => ({
          title: u.title,
          description: sentence(u.description),
          media: <UseCaseVisual index={i} variant={variant} />,
        }))}
      />
    </BlockSection>
  );
}

export default IndustriesUseCases;
