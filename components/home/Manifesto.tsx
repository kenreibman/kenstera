// The brand story, scrubbed against the camera flight: as the visitor scrolls,
// the camera passes through a hole in the hero leaf while these lines change.
// Without WebGL (or with reduced motion) it's a plain stacked statement.

const LINES: { a: number; b: number; text: React.ReactNode }[] = [
  {
    a: -0.2,
    b: 0.24,
    text: (
      <>
        A monstera leaf grows holes <em className="text-lime">on purpose.</em>
      </>
    ),
  },
  {
    a: 0.24,
    b: 0.5,
    text: (
      <>
        The gaps let light fall through to the leaves below, so the{" "}
        <em className="text-lime">whole plant</em> thrives.
      </>
    ),
  },
  {
    a: 0.5,
    b: 0.76,
    text: (
      <>
        Most businesses grow the other way. Calls ring out. Leads wait days.
        Good work never becomes a review.
      </>
    ),
  },
  {
    a: 0.76,
    b: 1.6,
    text: (
      <>
        Kenstera builds the systems that{" "}
        <em className="text-lime">let the light through.</em>
      </>
    ),
  },
];

export function Manifesto() {
  return (
    <section
      id="story"
      data-scene-window
      data-flight-end
      aria-label="Why Kenstera"
      className="manifesto relative"
    >
      <div className="manifesto-stage wrap">
        {LINES.map((l, i) => (
          <p
            key={i}
            className="manifesto-line display text-[clamp(2.1rem,6.4vw,5.6rem)] text-paper"
            style={{ ["--a" as string]: l.a, ["--b" as string]: l.b }}
          >
            {l.text}
          </p>
        ))}
      </div>
    </section>
  );
}
