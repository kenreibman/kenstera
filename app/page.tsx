import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <Testimonials />
        <Platforms />
        <About />
        <BlogSection />
      </main>
  );
}
