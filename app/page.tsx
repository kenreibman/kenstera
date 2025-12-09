import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <Testimonials />
        <Services />
      </main>
  );
}
