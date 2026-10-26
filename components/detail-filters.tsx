"use client";

import { Popover } from "@base-ui/react/popover";
import { SlidersHorizontal } from "lucide-react";
import {
  detailFilterGroups,
  detailSelectionCount,
  emptyDetails,
  type DetailSelection,
} from "@/lib/trail-stats";

const groups = detailFilterGroups();

export function DetailFilters({
  value,
  onChange,
}: {
  value: DetailSelection;
  onChange: (value: DetailSelection) => void;
}) {
  const count = detailSelectionCount(value);

  function toggle(group: keyof DetailSelection, id: string) {
    const current = value[group];
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    onChange({ ...value, [group]: next });
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex h-8 items-center gap-2 border border-white/20 px-3 text-sm hover:bg-white hover:text-black">
        <SlidersHorizontal className="size-4" aria-hidden />
        Details
        {count > 0 ? <span className="tabular-nums">{count}</span> : null}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="start" sideOffset={8} className="z-50">
          <Popover.Popup className="max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-auto border border-white/15 bg-background p-4 text-white outline-none">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
                Trail details
              </p>
              {count > 0 ? (
                <button
                  type="button"
                  className="text-xs underline underline-offset-4"
                  onClick={() => onChange(emptyDetails)}
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="mt-4 space-y-5">
              {groups.map((group) => (
                <fieldset key={group.id}>
                  <legend className="text-sm font-medium">{group.label}</legend>
                  <div className="mt-2 space-y-2">
                    {group.options.map((option) => {
                      const checked = value[group.id].includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(group.id, option.id)}
                            className="size-4 accent-white"
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
