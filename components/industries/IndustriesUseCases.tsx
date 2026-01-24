"use client";

import { motion } from "framer-motion";
import { UseCase } from "@/lib/industry-content";

const defaultUseCases: UseCase[] = [
  {
    title: "Customer Support",
    description:
      "now powered by always-on, empathetic voice agents that resolve issues instantly, reduce wait times, and boost satisfaction.",
    gradient: "from-gray-100 via-gray-50 to-white",
  },
  {
    title: "Inbound Scheduling",
    description:
      "automated through voice agents that coordinate calendars and handle booking requests with ease.",
    gradient: "from-sky-100 via-blue-50 to-white",
  },
  {
    title: "Learning & Development",
    description:
      "powered by voice-driven roleplay agents that simulate real-world scenarios and build employee skills.",
    gradient: "from-purple-200 via-pink-100 to-blue-100",
  },
];

interface IndustriesUseCasesProps {
  useCases?: UseCase[];
}

export function IndustriesUseCases({ useCases = defaultUseCases }: IndustriesUseCasesProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              {/* Video placeholder with gradient */}
              <div
                className={`aspect-[4/5] rounded-2xl bg-gradient-to-br ${useCase.gradient || "from-gray-100 via-gray-50 to-white"} mb-6`}
              />

              {/* Text content */}
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">{useCase.title}</span>
                {", "}
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustriesUseCases;
