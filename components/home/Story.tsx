// The brand idea, in one statement. Each word brightens as the visitor
// scrolls (CSS scroll-driven animation; a plain paragraph where unsupported
// or when reduced motion is requested).

const TEXT =
  "A monstera leaf grows holes on purpose, so light reaches every leaf below. Kenstera builds the systems that do the same for your business. No call, lead, or customer left in the shade.";

export function Story() {
  const words = TEXT.split(" ");
  return (
    <section id="story" aria-label="Why Kenstera" className="story relative bg-ink">
      <div className="story-stage">
        <p
          className="display wrap max-w-[900px] text-center text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.14] text-paper"
          style={{ ["--n" as string]: words.length }}
        >
          {words.map((w, i) => (
            <span key={i} className="story-word" style={{ ["--i" as string]: i }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
