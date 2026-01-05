import Link from "next/link";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { CarouselItem } from "@/components/ui/carousel";

type Projects = {
  id: string;
  href: string;
  category: string;
  company: string;
  blurb: string;
  imageSrc: string;
  imageAlt: string;
};

const PROJECTS: Projects[] = [
  {
    id: "theticksuit",
    href: "https://theticksuit.com",
    category: "E-Commerce & Clothing",
    company: "TheTickSuit",
    blurb:
      "TheTickSuit protects you while you garden, walk in the woods, or hike.",
    imageSrc: "/case-studies/theticksuit.webp",
    imageAlt: "Man wearing TheTickSuit in the woods",
  },
  {
    id: "texaslonghorns",
    href: "https://texaslonghorns.com",
    category: "Sports",
    company: "Texas Longhorns",
    blurb:
      "Custom website for the University of Texas Longhorns",
    imageSrc: "/case-studies/texaslonghorns.webp",
    imageAlt: "Coastline aerial with beach and pier",
  },
  {
    id: "thedavidimage",
    href: "https://thedavidimage.com",
    category: "Photography",
    company: "The David Image",
    blurb:
      "Complete rebranding and new website for photographer The David Image.",
    imageSrc: "/case-studies/thedavidimage.webp",
    imageAlt: "The David Image",
  },
  {
    id: "sidearm",
    href: "https://sidearmsports.com",
    category: "Sports & Entertainment",
    company: "SIDEARM Sports",
    blurb:
      "Complete rebranding and new website for a college sports company.",
    imageSrc: "/case-studies/sidearm-sports.webp",
    imageAlt: "SIDEARM Sports",
  },
    {
    id: "learfield",
    href: "https://learfield.com",
    category: "Sports & Entertainment",
    company: "LEARFIELD",
    blurb:
      "Complete rebranding and new website for a LEARFIELD IMG College",
    imageSrc: "/case-studies/learfield.webp",
    imageAlt: "LEARFIELD",
  },
];


export function Projects() {
  return (
    <section className="w-full bg-black px-4 py-12 md:px-20 md:py-20" id="projects">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-left text-5xl sm:text-7xl font-semibold tracking-tight text-white">
          Projects
        </h2>

        <div className="mt-10">
          <ProjectsCarousel>
            {PROJECTS.map((study) => (
              <CarouselItem key={study.id} className="pl-6 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                <Link href={study.href} target="_blank" rel="noopener noreferrer" className="group block"
                  aria-label={`View case study: ${study.company}`}
                >
                  <article className="relative h-[520px] w-full overflow-hidden bg-neutral-200">
                    <div className="absolute inset-0">
                      <Image
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={study.imageSrc}
                        alt={study.imageAlt}
                        width={370}
                        height={520}
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 88vw"
                      />
                      <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/25" />
                      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black/75 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                    </div>

                    <div className="absolute left-6 top-6 flex items-center gap-2">
                      <span className="h-2 w-2 bg-white transition-colors duration-300 group-hover:bg-blue-600" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        {study.category}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-20 px-6">
                      <h3 className="text-3xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-blue-50">
                        {study.company}
                      </h3>
                      <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-white">
                        {study.blurb}
                      </p>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between bg-blue-600 px-6 transition-colors duration-300 group-hover:bg-black">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        See work
                      </span>
                      <DotsIcon className="h-5 w-5 fill-white" />
                    </div>
                  </article>
                </Link>
              </CarouselItem>
            ))}
          </ProjectsCarousel>

          <div className="mt-6 md:hidden">
            <Link
              href="/case-studies"
              className="inline-flex w-full items-center justify-center bg-blue-600 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white"
            >
              View more cases
              <DotsIcon className="ml-3 h-4 w-4 fill-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19" r="1.7" />
    </svg>
  );
}
