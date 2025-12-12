import { SectionHeader } from "@/components/SectionHeader";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ServiceWebsiteVisual } from "@/components/ServiceWebsiteVisual";

export function Services() {
  return (
    <section className="relative w-full bg-black px-4 py-20">
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
          visual={<ServiceWebsiteVisual />}
        />
      </div>
    </section>
  );
}
