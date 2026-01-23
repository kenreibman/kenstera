import { Hero } from "@/components/sections/Hero";
import { Flow } from "@/components/sections/Flow";
import { Testimonials } from "@/components/sections/Testimonials";
import { Platforms } from "@/components/sections/Platforms";
import { About } from "@/components/sections/About";
import { BlogSection } from "@/components/sections/BlogSection";
import { Leads } from "@/components/sections/Leads";

export default function Home() {
  return (
      <main className="">
        <Hero />
        <Flow />
        <Testimonials />
        <Platforms />
        <About />
        <Leads />
        <BlogSection />
      </main>
  );
}
