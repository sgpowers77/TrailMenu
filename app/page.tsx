import { CatalogBrowser } from "@/components/catalog-browser";
import { Mark } from "@/components/marks";
import { SlideFrame } from "@/components/slide-frame";
import { legend, trailCount, type Difficulty } from "@/lib/catalog";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs tracking-[0.22em] text-white/55 uppercase">
        Las Cruces and the Organ Mountains
      </p>
      <h1 className="mt-3 max-w-4xl text-6xl leading-[0.9] font-semibold tracking-tight sm:text-8xl">
        Trail Menu
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
        {trailCount()} trails, grouped the way the deck groups them. Each card
        keeps the drive time, vehicle access, fee, time on trail, and notes
        printed on its slide.
      </p>

      <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="text-xs tracking-[0.2em] text-white/55 uppercase">
            {legend.label}
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight">
            {legend.title}
          </h2>
          <div className="mt-4 space-y-3 text-white/80">
            {legend.intro.map((line) => (
              <p key={line} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
          <ul className="mt-6 space-y-5">
            {legend.levels.map((level) => (
              <li key={level.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <Mark id={level.id as Difficulty} size={28} />
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85">
                  {level.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <SlideFrame
          slide={legend.slides[0].slide}
          label={legend.slides[0].caption ?? legend.slides[0].alt}
          className="w-full border border-white/15"
        />
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <SlideFrame
          slide={legend.slides[1].slide}
          label={legend.slides[1].caption ?? legend.slides[1].alt}
          className="w-full border border-white/15"
        />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            What a card records
          </h2>
          <ol className="mt-4 space-y-2">
            {legend.fields.map((field, index) => (
              <li key={field.id} className="text-lg">
                <span className="mr-3 text-white/40 tabular-nums">
                  0{index + 1}
                </span>
                {field.label}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mt-16">
        <CatalogBrowser />
      </div>
    </main>
  );
}
