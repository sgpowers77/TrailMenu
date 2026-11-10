import Link from "next/link";
import { CoverPhoto } from "@/components/cover-photo";
import { MarkRow } from "@/components/marks";
import { SlideFrame } from "@/components/slide-frame";
import {
  areaHeading,
  difficultyName,
  fields,
  trailSlugForTitle,
  type Area,
} from "@/lib/catalog";

export function AreaSection({ area }: { area: Area }) {
  const heading = areaHeading(area);
  const hero = area.slides[0];
  const onlyTrail = area.trails.length === 1 ? area.trails[0] : null;
  const titleHref =
    onlyTrail &&
    trailSlugForTitle(area.name || area.region) === onlyTrail.slug
      ? `/trails/${onlyTrail.slug}/`
      : null;
  return (
    <section id={area.slug} className="scroll-mt-24 border-t border-white/15 py-12">
      <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        {hero ? (
          <CoverPhoto slide={hero} />
        ) : (
          <div className="hidden md:block" />
        )}
        <div>
          {heading.kicker ? (
            <p className="text-xs tracking-[0.2em] text-white/55 uppercase">
              {heading.kicker}
            </p>
          ) : null}
          <h2 className="mt-2 text-4xl leading-[0.95] font-semibold tracking-tight sm:text-5xl">
            {titleHref ? (
              <Link
                href={titleHref}
                className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                {heading.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Link>
            ) : (
              heading.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))
            )}
          </h2>
          <p className="mt-3 text-sm text-white/55">
            {area.trails.length}{" "}
            {area.trails.length === 1 ? "trail" : "trails"}
          </p>
        </div>
      </div>
      <ul className="mt-8">
        {area.trails.map((trail) => (
          <li
            key={trail.slug}
            id={trail.slug}
            className="grid scroll-mt-24 gap-4 border-t border-white/15 py-5 sm:grid-cols-[220px_minmax(0,1fr)]"
          >
              {trail.slides[0] ? (
                <Link href={`/trails/${trail.slug}/`} className="block">
                  <SlideFrame
                    src={trail.slides[0].src}
                    alt=""
                    width={trail.slides[0].width}
                    height={trail.slides[0].height}
                    className="w-full border border-white/15"
                  />
                </Link>
              ) : (
                <div className="aspect-video border border-white/15" />
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <MarkRow ids={trail.difficulty} />
                  {trail.difficulty.length > 0 ? (
                    <span className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
                      {trail.difficulty.map(difficultyName).join(" · ")}
                    </span>
                  ) : null}
                </div>
                {trail.kicker ? (
                  <p className="mt-3 text-xs tracking-[0.16em] text-white/55 uppercase">
                    {trail.kicker}
                  </p>
                ) : null}
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                  <Link
                    href={`/trails/${trail.slug}/`}
                    className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  >
                    {trail.name}
                  </Link>
                </h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {fields.flatMap((field) => {
                    const value = trail[field.id];
                    if (!value) return [];
                    return [
                      <div key={field.id}>
                        <dt className="text-[10px] tracking-[0.14em] text-white/45 uppercase">
                          {field.label}
                        </dt>
                        <dd className="text-sm">{value}</dd>
                      </div>,
                    ];
                  })}
                </dl>
              </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
