import { SectionHeader } from "@/components/SectionHeader";
import { ServiceBlock } from "../ServiceBlock";
import {
  LayoutDashboard,
  Rocket,
  Smartphone,
  Server,
  Search,
  GaugeCircle,
} from "lucide-react";

export function Services() {
  return (
    <section className="relative w-full bg-black px-4 py-20 md:py-28">
      {/* Inner wrapper */}
      <div className="mx-auto max-w-[1000px]">
        <SectionHeader
          eyebrow="Our Services"
          title={
            <>
              Digital Solutions
              <br />
              that Drive Growth
            </>
          }
          subtitle={
            <>
              We build high-performing websites and marketing systems that attract clients and drive measurable growth.
            </>
          }
          align="center"
        />
        {/* Web Design and Development Block */}
        <ServiceBlock
          label="Website Design & Development"
          title="Transform your online presence with websites built for results."
          body="Striking Visuals. Strong storytelling. Quality leads. Let us build you a website that finally does what it's supposed to."
          items={[
            { label: "UX-focused layouts", icon: <LayoutDashboard size={14} /> },
            { label: "High-converting landing pages", icon: <Rocket size={14} /> },
            {
              label: "Mobile-first responsive design",
              icon: <Smartphone size={14} />,
            },
            {
              label: "Custom back-end functionality",
              icon: <Server size={14} />,
            },
            {
              label: "Search Engine Optimizations",
              icon: <Search size={14} />,
            },
            {
              label: "Blazing fast performance",
              icon: <GaugeCircle size={14} />,
            },
          ]}
        />
      </div>
    </section>
  );
}
