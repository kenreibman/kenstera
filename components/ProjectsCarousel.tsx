"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ProjectsCarousel({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="relative">
      <CarouselContent className="-ml-6">{children}</CarouselContent>
      <CarouselPrevious className="hidden md:flex h-10 w-10 border border-black/20 bg-white text-black shadow-none" />
      <CarouselNext className="hidden md:flex h-10 w-10 border border-black/20 bg-white text-black shadow-none" />
    </Carousel>
  );
}
