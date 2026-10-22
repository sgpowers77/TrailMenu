import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-xs tracking-[0.2em] text-white/55 uppercase">404</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">
        That page is not in the deck.
      </h1>
      <Link href="/" className="mt-6 inline-block underline underline-offset-4">
        Back to Trail Menu
      </Link>
    </main>
  );
}
