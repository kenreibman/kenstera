import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <Testimonials />
        <Services />
        <Process />
        <CaseStudies />
      </main>
  );
}
