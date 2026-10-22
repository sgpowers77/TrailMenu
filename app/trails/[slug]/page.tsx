import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facts } from "@/components/facts";
import { Gallery } from "@/components/gallery";
import { MarkRow } from "@/components/marks";
import {
  areaLabel,
  areas,
  difficultyName,
  getTrail,
} from "@/lib/catalog";

export function generateStaticParams() {
  return areas.flatMap((area) =>
    area.trails.map((trail) => ({ slug: trail.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = getTrail(slug);
  if (!match) return {};
  return { title: match.trail.name };
}

export default async function TrailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = getTrail(slug);
  if (!match) notFound();
  const { area, trail } = match;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-white/60">
        <Link href="/#catalog" className="underline underline-offset-4">
          Catalog
        </Link>
        <span className="px-2">/</span>
        <Link
          href={`/areas/${area.slug}/`}
          className="underline underline-offset-4"
        >
          {areaLabel(area)}
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <MarkRow ids={trail.difficulty} size={28} />
        {trail.difficulty.length > 0 ? (
          <p className="text-sm tracking-[0.16em] text-white/60 uppercase">
            {trail.difficulty.map(difficultyName).join(" · ")}
          </p>
        ) : null}
      </div>
      {trail.kicker ? (
        <p className="mt-6 text-xs tracking-[0.2em] text-white/55 uppercase">
          {trail.kicker}
        </p>
      ) : null}
      <h1 className="mt-2 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
        {trail.name}
      </h1>

      <div className="mt-8 max-w-3xl">
        <Facts trail={trail} />
      </div>

      {trail.notes.length > 0 ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
            Notes
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-lg leading-relaxed">
            {trail.notes.map((note, index) => (
              <li key={`${note}-${index}`}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {trail.callouts.length > 0 ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
            Printed on the slide
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-lg">
            {trail.callouts.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
          Slides
        </h2>
        <div className="mt-4">
          <Gallery slides={trail.slides} />
        </div>
      </section>
    </main>
  );
}
