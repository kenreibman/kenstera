import { Leaf } from "@/components/brand/Leaf";

export default function Loading() {
  return (
    <main className="relative z-[1] grid min-h-[92svh] place-items-center" aria-busy="true" aria-label="Loading">
      <Leaf className="h-10 w-10 animate-pulse text-lime" />
    </main>
  );
}
