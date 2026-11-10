"use client";

import { useEffect, useState } from "react";
import { SlideFrame } from "@/components/slide-frame";
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
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      setIndex((value) =>
        value === null
          ? value
          : (value + direction + slides.length) % slides.length,
      );
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [index, slides.length]);

  function step(direction: -1 | 1) {
    setIndex((value) => {
      if (value === null) return value;
      return (value + direction + slides.length) % slides.length;
    });
  }

  return (
    <>
      <ul className="relative left-1/2 grid w-screen max-w-[100vw] -translate-x-1/2 gap-8 px-4">
        {slides.map((slide, slideIndex) => (
          <li key={slide.slide}>
            <figure>
              <button
                type="button"
                onClick={() => setIndex(slideIndex)}
                className="mx-auto block max-w-full"
              >
                <SlideFrame
                  src={slide.src}
                  alt={slide.caption ?? slide.alt}
                  width={slide.width}
                  height={slide.height}
                  fit="window"
                />
              </button>
              {slide.caption ? (
                <figcaption className="mt-2 text-sm whitespace-pre-line text-white/60">
                  {slide.caption}
                </figcaption>
              ) : null}
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
        <DialogContent className="flex max-h-[calc(100svh-1.5rem)] w-full max-w-[calc(100vw-1.5rem)] flex-col gap-3 overflow-hidden bg-background p-3 text-white ring-white/20 sm:max-w-[calc(100vw-1.5rem)]">
          {current ? (
            <>
              <DialogTitle className="shrink-0 pr-10 text-base text-white">
                {current.caption || current.alt}
              </DialogTitle>
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <SlideFrame
                  src={current.src}
                  alt={current.caption ?? current.alt}
                  width={current.width}
                  height={current.height}
                  fit="dialog"
                />
              </div>
              {slides.length > 1 ? (
                <div className="flex shrink-0 justify-between">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="inline-flex h-8 items-center justify-center px-2.5 text-sm text-white hover:underline focus-visible:underline"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="inline-flex h-8 items-center justify-center px-2.5 text-sm text-white hover:underline focus-visible:underline"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
