import Link from "next/link";
import { SYSTEMS } from "@/content/site";
import { Anatomy } from "./Anatomy";

// Four calm tiles, two by two. Each says one thing.
export function Systems() {
  return (
    <section id="systems" className="on-paper section scroll-mt-10">
      <div className="wrap">
        <header className="reveal mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <h2 className="display h2">Four systems. One living business.</h2>
          <p className="lede mx-auto mt-5 max-w-[46ch] text-stone">
            Each part feeds the next, so we build them to work together from
            the roots up.
          </p>
        </header>

        <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
          {SYSTEMS.map((s) => (
            <li key={s.id} className="tile reveal relative overflow-hidden p-8 sm:p-10 md:min-h-[420px]">
              <Anatomy active={s.id} className="absolute right-6 top-6 h-28 w-auto text-bark sm:h-36" />
              <div className="flex h-full flex-col justify-end pt-32 sm:pt-40">
                <p className="text-[15px] font-medium text-leaf">{s.part}</p>
                <h3 className="h3 mt-1.5 max-w-[16ch]">{s.title}</h3>
                <p className="mt-3 max-w-[38ch] text-[17px] leading-relaxed text-stone">
                  {s.items.map((it) => it.name).join(". ")}.
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <Link href="/services" className="link text-leaf">
            Explore every service
          </Link>
        </p>
      </div>
    </section>
  );
}
