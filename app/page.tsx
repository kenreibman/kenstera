import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Pricing } from "@/components/sections/Pricing";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <About />
        <Projects />
        <Services />
        <BlogSection />
        <Pricing />
      </main>
  );
}
