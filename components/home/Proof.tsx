import { FEATURED_CLIENT, PROMISES } from "@/content/site";

/**
 * Proof, without the theatre. One real client, quoted verbatim once they've
 * supplied their words (see FEATURED_CLIENT in content/site.ts), plus the
 * commitments Kenstera actually makes. No invented quotes or metrics.
 */
export function Proof() {
  const { name, quote, person, role } = FEATURED_CLIENT;
  const hasQuote = quote.trim().length > 0;

  return (
    <section id="proof" className="on-paper section scroll-mt-10">
      <div className="wrap">
        {hasQuote ? (
          <figure className="reveal mx-auto max-w-4xl text-center">
            <blockquote className="display h2">&ldquo;{quote}&rdquo;</blockquote>
            <figcaption className="lede mt-7 text-stone">
              {[person, role, name].filter(Boolean).join(", ")}
            </figcaption>
          </figure>
        ) : (
          <header className="reveal mx-auto max-w-3xl text-center">
            <h2 className="display h2">Promises we put in writing.</h2>
            <p className="lede mx-auto mt-5 max-w-[44ch] text-stone">
              No wall of invented five-star quotes. Just the terms we work
              by, with clients like {name}.
            </p>
          </header>
        )}

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4">
          {PROMISES.map((p) => (
            <li key={p.title} className="tile reveal p-7 sm:p-8">
              <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-stone">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
