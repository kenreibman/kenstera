import { FAQS } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" className="on-paper section scroll-mt-10 !pt-0">
      <div className="wrap max-w-[820px]">
        <h2 className="display h2 reveal mb-12 text-center">Questions, answered.</h2>

        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.question} className="faq tile px-6 sm:px-8" name="faq">
              <summary className="flex items-center justify-between gap-6 py-6">
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.02em] sm:text-[21px]">{f.question}</h3>
                <svg viewBox="0 0 14 14" className="plus h-3.5 w-3.5 flex-none text-stone" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M7 1v12M1 7h12" />
                </svg>
              </summary>
              <p className="pb-7 text-[17px] leading-relaxed text-stone">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
