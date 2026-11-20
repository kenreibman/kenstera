import { Button } from "@/components/el/ui";
import { CtaBand } from "@/components/exact";

/** Closing band: full-width hairlines, headline left, buttons right. */
export function HomeCta() {
  return (
    <CtaBand id="contact" title="Let&rsquo;s grow your business">
      <Button href="/contact">Contact us</Button>
      <a
        href="mailto:contact@kenstera.com"
        className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[16px] text-black shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)] transition-[background-color] duration-150 hover:bg-surface"
      >
        contact@kenstera.com
      </a>
    </CtaBand>
  );
}

export default HomeCta;
