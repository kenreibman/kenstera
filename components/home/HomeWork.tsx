import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WORK } from "@/content/work";

export function HomeWork() {
  return (
    <section id="work" className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-4">
          Selected Projects
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900">
            Latest Work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORK.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              aria-label={`View project: ${project.title}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-[1.04]`}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-900">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeWork;
