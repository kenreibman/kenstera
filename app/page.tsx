import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <Testimonials />
        <Services />
        <Process />
      </main>
  );
}
