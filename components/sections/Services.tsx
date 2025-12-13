import { SectionHeader } from "@/components/SectionHeader";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ServiceWebsiteVisual } from "@/components/ServiceWebsiteVisual";
import { ServiceGrowthVisual } from "@/components/ServiceGrowthVisual";

export function Services() {
  return (
    <section className="relative w-full bg-black px-4 py-20" id="services">
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
          body="Striking visuals. Strong storytelling. Quality leads. Let us build you a website that finally does what it's supposed to."
          visual={<ServiceWebsiteVisual />}
        />
        {/* Content Marketing Block */}
        <ServiceBlock
          label="Ongoing Growth & Maintenance"
          title="Your site stays fast, secure, and optimized."
          body="Most websites get launched... and forgotten. Your website isn't a one-time project. It's a growth asset. Let us do the hard work so you can focus on your business."
          visual={<ServiceGrowthVisual />}
          reverse
        />
        {/* Branding Block */}
        <ServiceBlock
          label="Search Engine Optimization"
          title="Make your business known. Outshine your competition."
          body="With our SEO and marketing strategies, we accelerate long-term organic traffic that compounds month after month."
          visual={<ServiceWebsiteVisual />}
        />
      </div>
    </section>
  );
}
