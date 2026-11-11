import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="relative z-[1] grid min-h-[86svh] place-items-center px-6 pt-20 text-center">
      <div>
        <h1 className="display h1">Nothing grows here.</h1>
        <p className="lede mx-auto mt-5 max-w-[32ch] text-sage">
          The page you&apos;re looking for was moved or never existed.
        </p>
        <Link href="/" className="btn btn-lime mt-8">Back to home</Link>
      </div>
    </main>
  );
}
