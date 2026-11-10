import type { Metadata } from "next";
import Link from "next/link";
import { WhaleIcon } from "@/components/whale-icon";
import { trailSlugForTitle, whaling } from "@/lib/catalog";

export const metadata: Metadata = {
  title: whaling.name,
};

export default function WhalingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-white/60 underline underline-offset-4">
        Trail Menu
      </Link>
      <h1 className="mt-8 flex items-center gap-4 text-5xl leading-[0.95] font-semibold tracking-tight sm:gap-5 sm:text-7xl">
        <WhaleIcon className="size-12 shrink-0 sm:size-16" />
        {whaling.name}
      </h1>
      <ul className="mt-10 max-w-xl space-y-3 text-2xl sm:text-3xl">
        {whaling.items.map((item) => {
          const slug = trailSlugForTitle(item);
          return (
            <li key={item} className="border-t border-white/15 py-3">
              {slug ? (
                <Link
                  href={`/trails/${slug}/`}
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
