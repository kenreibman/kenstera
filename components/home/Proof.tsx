import Link from "next/link";
import { Arrow, Leaf } from "@/components/brand/Leaf";
import { BOOKING_HREF, FEATURED_CLIENT, PROMISES } from "@/content/site";

/**
 * Proof, without the theatre. One real client, quoted verbatim once they've
 * supplied their words (see FEATURED_CLIENT in content/site.ts), plus the
 * commitments Kenstera actually makes. No stock avatars, no invented metrics.
 */
export function Proof() {
  const { name, quote, person, role } = FEATURED_CLIENT;
  const hasQuote = quote.trim().length > 0;

  return (
    <section id="proof" className="on-paper scroll-mt-0 py-24 md:py-36">
      <div className="wrap">
        <header className="reveal mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
          <p className="label text-stone md:col-span-3">Proof</p>
          <div className="md:col-span-9">
            <h2 className="display text-[clamp(2.4rem,6.6vw,5.6rem)]">
              Real clients. <em className="text-clay">Real words.</em> Or nothing.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
              You&apos;ve seen the wall of five-star quotes from people who
              don&apos;t exist. We&apos;d rather show you less and mean all of it.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Featured client */}
          <figure className="reveal relative overflow-hidden rounded-[28px] bg-bark p-8 text-paper sm:p-12 lg:col-span-7">
            <Leaf veins className="pointer-events-none absolute -bottom-16 -right-10 w-64 rotate-[24deg] text-moss sm:w-80" />
            <div className="relative flex h-full flex-col">
              <p className="label mb-10 flex items-center gap-3 text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                Kenstera client
              </p>

              {hasQuote ? (
                <blockquote className="display text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.12]">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ) : (
                <p className="display text-[clamp(2.6rem,6vw,5rem)] leading-none">{name}</p>
              )}

              <figcaption className="mt-auto pt-12">
                {hasQuote ? (
                  <>
                    <p className="text-lg font-semibold">{person || name}</p>
                    <p className="text-sage">{[role, person ? name : ""].filter(Boolean).join(", ")}</p>
                  </>
                ) : (
                  <p className="max-w-sm text-paper/75">
                    Curious what working with us is actually like? Ask us about
                    this project on a call.
                  </p>
                )}
                <Link href={BOOKING_HREF} className="btn btn-ghost mt-8">
                  Ask us about it <Arrow />
                </Link>
              </figcaption>
            </div>
          </figure>

          {/* Commitments */}
          <div className="reveal rounded-[28px] border border-bark/15 bg-paper-2/60 p-8 sm:p-10 lg:col-span-5">
            <p className="label mb-8 text-stone">What you can hold us to</p>
            <ul>
              {PROMISES.map((p, i) => (
                <li key={p.title} className={`flex gap-5 py-5 ${i > 0 ? "rule" : "pt-0"}`}>
                  <span className="label pt-1.5 text-clay">0{i + 1}</span>
                  <div>
                    <p className="display text-2xl">{p.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-stone">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
