import Image from "next/image";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  image?: string;
};

const services: Service[] = [
  {
    title: "Web Design & Development",
    description:
      "High-performing with clean code, responsive layouts, and a premium feel. SEO optimizations and more.",
    image: "/services/website.webp"
  },
  {
    title: "Brand Identity",
    description:
      "Brand systems that clarify your message, build trust, and make you instantly recognizable.",
      image: "/services/branding.webp"
  },
  {
    title: "Content Marketing",
    description:
      "Modern, conversion-focused interfaces built to guide visitors and drive action.",
      image: "/services/marketing.webp"
  },
];

function ServiceCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <div className="w-full">
      {/* Image block (placeholder) */}
      
      {image && (
        <Image
          className={"w-full rounded-2xl bg-black object-cover"}
          src={image}
          alt={title}
          width={444}
          height={555}
          loading="lazy"
          sizes="(min-width: 768px) 460px, 100vw"
        />
      )}

      {/* Text */}
      <div className="mt-4">
        <h3 className="text-4xl font-semibold text-black">
          {title}
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-black">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1000px] px-4 md:px-6">
        <h2 className="text-left text-5xl sm:text-7xl font-semibold tracking-tight text-black">
          Our services
        </h2>

        {/* Grid (subtitle is inside grid to create stagger) */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
          {/* LEFT: subtitle + first card */}
          <div className="space-y-10 md:space-y-12">
            <p className="max-w-sm text-lg leading-relaxed text-black">
              From design to development and growth, we build digital experiences
              that look great, perform fast, and convert.
            </p>

            <ServiceCard
              title={services[0].title}
              description={services[0].description}
              image={services[0].image}
            />
          </div>
          <div>
          {/* RIGHT: second card */}
          <div className="md:pt-10 pb-10">
            <ServiceCard
              title={services[1].title}
              description={services[1].description}
              image={services[1].image}
            />
          </div>

          {/* RIGHT: third card */}
          <div className="md:pt-2">
            <ServiceCard
              title={services[2].title}
              description={services[2].description}
              image={services[2].image}
            />
          </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center md:mt-16">
          <Link
            href="https://cal.com/kenstera/30min"
            target="_blank"
            className="rounded-full border border-black bg-white px-5 py-2 text-lg font-medium transition text-black hover:bg-black hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
