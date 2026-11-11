import { FAQS } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" className="on-paper scroll-mt-0 rounded-b-[28px] pb-24 md:rounded-b-[48px] md:pb-36">
      <div className="wrap">
        <div className="rule grid gap-10 pt-20 md:grid-cols-12 md:pt-28">
          <header className="reveal md:col-span-4">
            <p className="label mb-6 text-stone">Straight answers</p>
            <h2 className="display text-[clamp(2.2rem,4.6vw,4rem)]">
              Asked <em className="text-clay">often.</em>
            </h2>
          </header>

          <div className="md:col-span-8">
            {FAQS.map((f, i) => (
              <details key={f.question} className={`faq group ${i > 0 ? "rule" : ""}`} name="faq">
                <summary className="flex items-start justify-between gap-6 py-6">
                  <h3 className="display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-tight">{f.question}</h3>
                  <span className="plus mt-1 grid h-9 w-9 flex-none place-items-center rounded-full border border-bark/25" aria-hidden="true">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-8 text-[17px] leading-relaxed text-stone">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
