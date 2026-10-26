"use client";

import { useMemo, useState } from "react";
import { AreaPager } from "@/components/area-pager";
import { AreaSection } from "@/components/area-section";
import { DetailFilters } from "@/components/detail-filters";
import { Mark } from "@/components/marks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  areas,
  difficultyName,
  difficultyOrder,
  type Difficulty,
} from "@/lib/catalog";
import {
  emptyDetails,
  trailMatchesDetails,
  type DetailSelection,
} from "@/lib/trail-stats";

export function CatalogBrowser() {
  const [query, setQuery] = useState("");
  const [marks, setMarks] = useState<Difficulty[]>([]);
  const [details, setDetails] = useState<DetailSelection>(emptyDetails);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return areas
      .map((area) => {
        const trails = area.trails.filter((trail) => {
          if (
            marks.length > 0 &&
            !trail.difficulty.some((mark) => marks.includes(mark))
          ) {
            return false;
          }
          if (!trailMatchesDetails(trail, details)) return false;
          if (!needle) return true;
          const haystack = [
            area.region,
            area.name,
            trail.name,
            trail.kicker,
            trail.drive,
            trail.vehicle,
            trail.fee,
            trail.time,
            ...trail.notes,
            ...trail.callouts,
            ...trail.difficulty.map(difficultyName),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(needle);
        });
        return { ...area, trails };
      })
      .filter((area) => area.trails.length > 0);
  }, [details, marks, query]);

  const count = filtered.reduce((sum, area) => sum + area.trails.length, 0);

  function toggle(mark: Difficulty) {
    setMarks((current) =>
      current.includes(mark)
        ? current.filter((item) => item !== mark)
        : [...current, mark],
    );
  }

  return (
    <div id="catalog" className="scroll-mt-24">
      <div className="flex flex-col gap-4 border border-white/15 p-4">
        <label className="block">
          <span className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
            Search the deck
          </span>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Trail, area, vehicle, note"
            className="mt-2 h-11 rounded-none border-white/20 bg-background text-base text-white placeholder:text-white/35"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={marks.length === 0 ? "default" : "outline"}
            className="rounded-none"
            onClick={() => setMarks([])}
          >
            All marks
          </Button>
          {difficultyOrder.map((mark) => {
            const active = marks.includes(mark);
            return (
              <Button
                key={mark}
                type="button"
                variant={active ? "default" : "outline"}
                className="rounded-none"
                aria-pressed={active}
                onClick={() => toggle(mark)}
              >
                <Mark id={mark} size={14} />
                {difficultyName(mark)}
              </Button>
            );
          })}
          <DetailFilters value={details} onChange={setDetails} />
        </div>
        <p className="text-sm text-white/55">
          {count} {count === 1 ? "trail" : "trails"}
        </p>
      </div>

      {filtered.length > 0 ? (
        <AreaPager areas={filtered} />
      ) : (
        <p className="mt-8 text-lg">No trails in the deck match.</p>
      )}

      {filtered.map((area) => (
        <AreaSection key={area.slug} area={area} />
      ))}
    </div>
  );
}
