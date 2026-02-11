"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface IndustriesVoiceAgentsProps {
  label?: string;
  heading?: string;
  description?: string;
}

export function IndustriesVoiceAgents({
  label = "Industry-leading",
  heading = "Voice Agents",
  description = "Kenstera's platform is intelligent. Real-time agents that talk, type, and take action. Resolve customer issues, automate tasks, and deliver accurate answers — all grounded in your data, tailored to your workflows, and ready to deploy at scale.",
}: IndustriesVoiceAgentsProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 mb-2">{label}</p>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 mb-8">
              {heading}
            </h2>
            {/* <button className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
              <Play className="w-4 h-4 fill-current" />
              Watch Video
            </button> */}
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed mb-10">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default IndustriesVoiceAgents;
