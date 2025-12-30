import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <About />
        <CaseStudies />
        <Pricing />
      </main>
  );
}
