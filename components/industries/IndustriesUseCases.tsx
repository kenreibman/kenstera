import Image from "next/image";
import { Container } from "@/components/el/ui";
import { UseCase } from "@/lib/industry-content";

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

const IMAGES = [
  { src: "/images/24-7-coverage.webp", alt: "24/7 AI-powered coverage - instant response conversation" },
  { src: "/images/qualification-booking.webp", alt: "Qualification and instant booking automation" },
];
const PALETTES = ["ember", "dusk", "dawn"];

interface IndustriesUseCasesProps {
  useCases?: UseCase[];
}

export function IndustriesUseCases({ useCases = defaultUseCases }: IndustriesUseCasesProps) {
  return (
    <section className="pb-16 sm:pb-24">
      <Container framed>
        <div className="grid gap-3 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={useCase.title} className="flex flex-col rounded-2xl bg-surface p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-2">
                {IMAGES[index] ? (
                  <Image
                    src={IMAGES[index].src}
                    alt={IMAGES[index].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className={`grad g-${PALETTES[index % PALETTES.length]} absolute inset-0`} aria-hidden="true">
                    
                  </div>
                )}
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
