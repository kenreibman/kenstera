import Link from "next/link";
import { Leaf } from "@/components/brand/Leaf";

export default function NotFound() {
  return (
    <main id="main" className="relative z-[1] grid min-h-[92svh] place-items-center overflow-hidden px-6 pt-24 text-center">
      <div>
        <p className="display flex items-center justify-center text-[clamp(7rem,30vw,20rem)] leading-none text-paper">
          4
          <Leaf veins title="0" className="mx-[0.02em] h-[0.74em] w-auto rotate-12 text-lime" />
          4
        </p>
        <h1 className="display mt-2 text-3xl sm:text-5xl">
          Nothing grows <em className="text-lime">here.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sage">
          The page you&apos;re looking for was pruned, moved, or never planted.
        </p>
        <Link href="/" className="btn btn-lime mt-9">Back to the garden</Link>
      </div>
    </main>
  );
}
