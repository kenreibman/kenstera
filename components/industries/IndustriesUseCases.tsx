import { Container } from "@/components/el/ui";
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

export function IndustriesUseCases({ useCases = defaultUseCases, variant = "general" }: IndustriesUseCasesProps) {
  return (
    <section className="pb-16 sm:pb-24">
      <Container framed>
        <div className="grid gap-3 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={useCase.title} className="flex flex-col rounded-2xl bg-surface p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-2">
                <UseCaseVisual index={index} variant={variant} />
              </div>
              <p className="px-3 pb-3 pt-4 text-[15px] leading-[1.5] text-subtle">
                <span className="text-black">{useCase.title}</span>
                {", "}
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default IndustriesUseCases;
