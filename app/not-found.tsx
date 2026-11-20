import { Button } from "@/components/el/ui";
import { BlockSection } from "@/components/exact";

export default function NotFound() {
  return (
    <main className="bg-page">
      <BlockSection bare className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <p className="el-trim mb-5 text-[14px] leading-[21px] tracking-[0.14px] text-subtle">404</p>
        <h1 className="el-trim text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
          This page doesn&apos;t exist.
        </h1>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button href="/">Go back home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </BlockSection>
    </main>
  );
}
