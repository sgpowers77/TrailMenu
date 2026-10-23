import type { Metadata } from "next";
import Link from "next/link";
import { SlideFrame } from "@/components/slide-frame";
import { whaling } from "@/lib/catalog";

export const metadata: Metadata = {
  title: whaling.name,
};

export default function WhalingPage() {
  const slide = whaling.slides[0];
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-white/60 underline underline-offset-4">
        Trail Menu
      </Link>
      <h1 className="mt-8 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
        {whaling.name}
      </h1>
      <ul className="mt-10 max-w-xl space-y-3 text-2xl sm:text-3xl">
        {whaling.items.map((item) => (
          <li key={item} className="border-t border-white/15 py-3">
            {item}
          </li>
        ))}
      </ul>
      <figure className="mt-12">
        <SlideFrame
          src={slide.src}
          alt={slide.caption ?? slide.alt}
          className="w-full border border-white/15"
        />
      </figure>
    </main>
  );
}
