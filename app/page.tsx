import { Hero } from "@/components/sections/Hero";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <AboutCTA />
        <CaseStudies />
        <Services />
        <Process />
        <Pricing />
      </main>
  );
}
