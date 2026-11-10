"use client";

import { useState } from "react";
import { SlideFrame } from "@/components/slide-frame";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SlideImage } from "@/lib/catalog";

export function CoverPhoto({ slide }: { slide: SlideImage }) {
  const [open, setOpen] = useState(false);
  const label = slide.caption || slide.alt;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full"
        aria-label={`Preview ${label}`}
      >
        <SlideFrame
          src={slide.src}
          alt={label}
          width={slide.width}
          height={slide.height}
          className="w-full border border-white/15"
        />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[calc(100svh-1.5rem)] w-full max-w-[calc(100vw-1.5rem)] flex-col gap-3 overflow-hidden bg-background p-3 text-white ring-white/20 sm:max-w-[calc(100vw-1.5rem)]">
          <DialogTitle className="shrink-0 pr-10 text-base text-white">
            {label}
          </DialogTitle>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <SlideFrame
              src={slide.src}
              alt={label}
              width={slide.width}
              height={slide.height}
              fit="dialog"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
