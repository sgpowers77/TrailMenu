"use client";

import { useEffect, useState } from "react";
import { SlideFrame } from "@/components/slide-frame";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SlideImage } from "@/lib/catalog";

export function Gallery({ slides }: { slides: SlideImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : slides[index];

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setIndex((value) =>
          value === null ? value : (value + 1) % slides.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setIndex((value) =>
          value === null
            ? value
            : (value - 1 + slides.length) % slides.length,
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, slides.length]);

  function step(direction: -1 | 1) {
    setIndex((value) => {
      if (value === null) return value;
      return (value + direction + slides.length) % slides.length;
    });
  }

  return (
    <>
      <ul className="grid gap-8">
        {slides.map((slide, slideIndex) => (
          <li key={slide.slide}>
            <figure>
              <button
                type="button"
                onClick={() => setIndex(slideIndex)}
                className="block w-full border border-white/15"
              >
                <SlideFrame
                  src={slide.src}
                  alt={slide.alt}
                  className="aspect-video h-auto w-full bg-black object-contain"
                />
              </button>
              <figcaption className="mt-2 flex items-baseline justify-between gap-4 text-sm text-white/60">
                <span className="whitespace-pre-line">
                  {slide.caption ?? slide.alt}
                </span>
                <span className="shrink-0 tabular-nums">
                  Slide {slide.slide}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Dialog
        open={index !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null);
        }}
      >
        <DialogContent className="max-h-[92vh] overflow-auto bg-black p-3 text-white ring-white/20 sm:max-w-5xl">
          {current ? (
            <>
              <DialogTitle className="pr-10 text-base text-white">
                {current.caption || current.alt} · Slide {current.slide}
              </DialogTitle>
              <SlideFrame
                src={current.src}
                alt={current.alt}
                className="h-auto w-full bg-black"
              />
              {slides.length > 1 ? (
                <div className="flex justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none"
                    onClick={() => step(-1)}
                  >
                    Previous slide
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none"
                    onClick={() => step(1)}
                  >
                    Next slide
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
