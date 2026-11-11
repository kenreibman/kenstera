import { METHOD } from "@/content/site";

// The same seedling, one stage further along in each column.
const STEM_TOP = [0, 78, 58, 38];
const PAIRS = [[], [72], [80, 54], [84, 58, 32]];

function Stage({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 text-leaf" fill="none" aria-hidden="true">
      <path d="M24 108H96" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.25" />
      {stage === 0 ? (
        <ellipse cx="60" cy="96" rx="11" ry="7" fill="currentColor" />
      ) : (
        <path d={`M60 108V${STEM_TOP[stage]}`} stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      )}
      <g fill="currentColor">
        {PAIRS[stage].map((y) => (
          <g key={y}>
            <ellipse cx="43" cy={y} rx="18" ry="8.5" transform={`rotate(28 43 ${y})`} />
            <ellipse cx="77" cy={y} rx="18" ry="8.5" transform={`rotate(-28 77 ${y})`} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Method() {
  return (
    <section id="method" className="on-paper section scroll-mt-10 !pt-0">
      <div className="wrap">
        <header className="reveal mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <h2 className="display h2">From first call to running itself.</h2>
        </header>

        <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((m, i) => (
            <li key={m.name} className="reveal">
              <Stage stage={i} />
              <h3 className="mt-5 text-[21px] font-semibold leading-tight tracking-[-0.02em]">{m.title}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-stone">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
