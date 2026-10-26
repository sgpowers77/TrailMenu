"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { areaLabel, type Area } from "@/lib/catalog";

export function AreaPager({ areas }: { areas: Area[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const update = () => {
      setEdges({
        prev: el.scrollLeft > 1,
        next: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [areas]);

  function page(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const chips = [...el.querySelectorAll<HTMLElement>("[data-area-chip]")];
    if (direction > 0) {
      const viewRight = el.scrollLeft + el.clientWidth;
      const next = chips.find(
        (chip) => chip.offsetLeft + chip.offsetWidth > viewRight + 2,
      );
      if (next) el.scrollTo({ left: next.offsetLeft, behavior: "smooth" });
      return;
    }
    const previous = [...chips]
      .reverse()
      .find((chip) => chip.offsetLeft < el.scrollLeft - 2);
    const left = previous
      ? Math.max(0, previous.offsetLeft + previous.offsetWidth - el.clientWidth)
      : 0;
    el.scrollTo({ left, behavior: "smooth" });
  }

  return (
    <nav className="mt-6 flex items-center gap-2" aria-label="Areas">
      <button
        type="button"
        aria-label="Previous areas"
        disabled={!edges.prev}
        onClick={() => page(-1)}
        className="inline-flex size-9 shrink-0 items-center justify-center border border-white/15 disabled:opacity-30"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>
      <div
        ref={scroller}
        className="relative flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {areas.map((area) => (
          <a
            key={area.slug}
            data-area-chip
            href={`#${area.slug}`}
            className="shrink-0 border border-white/15 px-3 py-2 text-xs tracking-wide hover:bg-white hover:text-black"
          >
            {areaLabel(area)}
          </a>
        ))}
      </div>
      <button
        type="button"
        aria-label="Next areas"
        disabled={!edges.next}
        onClick={() => page(1)}
        className="inline-flex size-9 shrink-0 items-center justify-center border border-white/15 disabled:opacity-30"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}
