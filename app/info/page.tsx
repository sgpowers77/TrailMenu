import type { Metadata } from "next";
import { Mark } from "@/components/marks";
import { SlideFrame } from "@/components/slide-frame";
import { legend, type Difficulty } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Information",
};

export default function InfoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="text-xs tracking-[0.2em] text-white/55 uppercase">
            {legend.label}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
            {legend.title}
          </h1>
          <div className="mt-4 space-y-3 text-white/80">
            {legend.intro.map((line) => (
              <p key={line} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
          <ul className="mt-6 space-y-5">
            {legend.levels.map((level) => (
              <li
                key={level.id}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-3"
              >
                <Mark id={level.id as Difficulty} size={28} />
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85">
                  {level.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <SlideFrame
          src={legend.slides[0].src}
          alt={legend.slides[0].caption ?? legend.slides[0].alt}
          className="w-full border border-white/15"
        />
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <SlideFrame
          src={legend.slides[1].src}
          alt={legend.slides[1].caption ?? legend.slides[1].alt}
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
    </main>
  );
}
