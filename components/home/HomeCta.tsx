import { Button, Container } from "@/components/el/ui";

/** Closing card: a wide grainy gradient with white type, like elevenlabs.io's story cards. */
export function HomeCta() {
  return (
    <section id="contact" className="border-t border-hairline">
      <Container framed>
        <div className="py-20 sm:py-28">
          <div className="grad g-ember flex min-h-[380px] flex-col justify-end rounded-2xl p-8 sm:p-12">
            <p className="text-[16px] text-white/80">Get in touch</p>
            <h2 className="mt-2 max-w-xl text-[36px] leading-[1.1] text-white sm:text-[48px]">
              Let&rsquo;s grow your business
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button href="/contact-sales" variant="light">
                Contact us
              </Button>
              <a
                href="mailto:info@kenstera.com"
                className="inline-flex h-11 items-center rounded-full px-5 text-[16px] text-white ring-1 ring-white/40 transition-colors hover:bg-white/10"
              >
                info@kenstera.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HomeCta;
