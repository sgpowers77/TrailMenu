import {
  Car,
  CircleDollarSign,
  Clock,
  Droplets,
  ExternalLink,
  MapPin,
  Truck,
} from "lucide-react";
import { fields, type Field, type Trail } from "@/lib/catalog";
import { trailheadFor, trailheadHref } from "@/lib/trailheads";
import { waterRecommendation } from "@/lib/trail-stats";

const cellClass =
  "flex gap-3 border-b border-white/15 p-4 last:border-b-0 sm:border-r-0 sm:odd:border-r sm:last:border-r-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0";

const fieldIcons: Record<Field["id"], typeof Car> = {
  drive: Car,
  vehicle: Truck,
  fee: CircleDollarSign,
  time: Clock,
};

export function Facts({ trail }: { trail: Trail }) {
  const rows = fields.flatMap((field) => {
    const value = trail[field.id];
    return value ? [{ ...field, value }] : [];
  });
  const trailhead = trailheadFor(trail.slug);
  const water = waterRecommendation(trail.time);
  if (rows.length === 0 && !trailhead && !water) return null;

  return (
    <dl className="grid border border-white/15 sm:grid-cols-2">
      {rows.map((row) => {
        const Icon = fieldIcons[row.id];
        return (
          <div
            key={row.id}
            className={cellClass}
          >
            <Icon className="mt-0.5 size-5 shrink-0 text-white/70" aria-hidden />
            <div>
              <dt className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
                {row.label}
              </dt>
              <dd className="mt-1 text-lg leading-snug">{row.value}</dd>
            </div>
          </div>
        );
      })}
      {water ? (
        <div className={cellClass}>
          <Droplets className="mt-0.5 size-5 shrink-0 text-white/70" aria-hidden />
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
              Water
            </dt>
            <dd className="mt-1 text-lg leading-snug">{water}</dd>
          </div>
        </div>
      ) : null}
      {trailhead ? (
        <div className={cellClass}>
          <MapPin className="mt-0.5 size-5 shrink-0 text-white/70" aria-hidden />
          <div>
            <dt className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
              Trailhead
            </dt>
            <dd className="mt-1 text-lg leading-snug">
              <a
                href={trailheadHref(trailhead)}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                {trailhead.name}
                <ExternalLink className="ml-1.5 inline size-4 align-[-2px] text-white/70" aria-hidden />
              </a>
            </dd>
          </div>
        </div>
      ) : null}
    </dl>
  );
}
