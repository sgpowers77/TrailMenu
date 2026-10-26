import { areas, type Trail } from "@/lib/catalog";

const OUNCES_PER_LITER = 33.814;

export type HourSpan = {
  min: number;
  max: number;
};

export function trailHours(value: string | null): HourSpan | null {
  if (!value) return null;
  const text = value.trim().toLowerCase().replace(/^short:\s*/, "");
  if (!text || text === "??") return null;

  const less = text.match(/^<\s*(\d+(?:\.\d+)?)\s*(min|h)$/);
  if (less) {
    const amount = Number(less[1]);
    const hours = less[2] === "min" ? amount / 60 : amount;
    return { min: 0, max: hours };
  }

  const range = text.match(
    /^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(min|h)$/,
  );
  if (range) {
    const unit = range[3] === "min" ? 1 / 60 : 1;
    return { min: Number(range[1]) * unit, max: Number(range[2]) * unit };
  }

  const point = text.match(/^(\d+(?:\.\d+)?)\s*(min|h)$/);
  if (point) {
    const amount = Number(point[1]);
    const hours = point[2] === "min" ? amount / 60 : amount;
    return { min: hours, max: hours };
  }

  return null;
}

function literText(hours: number) {
  const rounded = Math.round(hours * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function ounceText(hours: number) {
  return String(Math.round(hours * OUNCES_PER_LITER));
}

export function waterRecommendation(time: string | null) {
  const span = trailHours(time);
  if (!span || span.max <= 0) return null;
  if (span.min === 0) {
    return `Up to ${literText(span.max)} L (${ounceText(span.max)} oz)`;
  }
  if (span.min === span.max) {
    return `${literText(span.min)} L (${ounceText(span.min)} oz)`;
  }
  return `${literText(span.min)}–${literText(span.max)} L (${ounceText(span.min)}–${ounceText(span.max)} oz)`;
}

function driveMinutes(drive: string | null) {
  const span = trailHours(drive);
  if (!span) return null;
  return Math.ceil((span.max * 60) / 15) * 15;
}

function driveLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return hours === 1 ? "1 hour" : `${hours} hours`;
}

const timeBands = [
  { id: "under-1", label: "Under 1 hour", min: 0, max: 1 },
  { id: "1", label: "1 hour", min: 1, max: 2 },
  { id: "2", label: "2 hours", min: 2, max: 3 },
  { id: "3", label: "3 hours", min: 3, max: 4 },
  { id: "4", label: "4 hours", min: 4, max: 5 },
  { id: "5", label: "5 hours", min: 5, max: 6 },
  { id: "6", label: "6 hours", min: 6, max: 7 },
  { id: "8", label: "8 hours", min: 8, max: 9 },
  { id: "9", label: "9 hours", min: 9, max: 10 },
];

function timeBandIds(time: string | null) {
  if (time?.trim() === "??") return ["unknown"];
  const span = trailHours(time);
  if (!span) return [];
  return timeBands
    .filter((band) => span.min < band.max && span.max >= band.min)
    .map((band) => band.id);
}

function vehicleId(vehicle: string | null) {
  if (!vehicle) return null;
  const value = vehicle.toLowerCase();
  if (value.includes("4x4")) return "4x4";
  if (value.includes("high clearance")) return "high-clearance";
  if (/gravel|dirt|rough|washout/.test(value)) return "gravel";
  return "any";
}

function feeId(fee: string | null) {
  if (!fee) return null;
  const value = fee.toLowerCase();
  if (value === "n/a" || value === "free") return "none";
  return "fee";
}

export type DetailSelection = {
  drive: string[];
  time: string[];
  vehicle: string[];
  fee: string[];
};

export const emptyDetails: DetailSelection = {
  drive: [],
  time: [],
  vehicle: [],
  fee: [],
};

export type FilterGroup = {
  id: keyof DetailSelection;
  label: string;
  options: Array<{ id: string; label: string }>;
};

const vehicleOptions = [
  { id: "any", label: "Any vehicle" },
  { id: "gravel", label: "Gravel or dirt" },
  { id: "high-clearance", label: "High clearance" },
  { id: "4x4", label: "4x4" },
];

const feeOptions = [
  { id: "none", label: "No fee" },
  { id: "fee", label: "Fee" },
];

export function detailFilterGroups(): FilterGroup[] {
  const drives = new Set<number>();
  const times = new Set<string>();
  const vehicles = new Set<string>();
  const fees = new Set<string>();

  for (const area of areas) {
    for (const trail of area.trails) {
      const drive = driveMinutes(trail.drive);
      if (drive) drives.add(drive);
      for (const band of timeBandIds(trail.time)) times.add(band);
      const vehicle = vehicleId(trail.vehicle);
      if (vehicle) vehicles.add(vehicle);
      const fee = feeId(trail.fee);
      if (fee) fees.add(fee);
    }
  }

  const timeOptions = [
    ...timeBands.filter((band) => times.has(band.id)),
    ...(times.has("unknown") ? [{ id: "unknown", label: "Unknown" }] : []),
  ];

  return [
    {
      id: "drive",
      label: "Driving distance from town",
      options: [...drives]
        .sort((a, b) => a - b)
        .map((minutes) => ({ id: String(minutes), label: driveLabel(minutes) })),
    },
    {
      id: "time",
      label: "Time on trail",
      options: timeOptions,
    },
    {
      id: "vehicle",
      label: "Vehicle access",
      options: vehicleOptions.filter((option) => vehicles.has(option.id)),
    },
    {
      id: "fee",
      label: "Fee",
      options: feeOptions.filter((option) => fees.has(option.id)),
    },
  ];
}

function selected(ids: string[], value: string | null) {
  return ids.length === 0 || (value !== null && ids.includes(value));
}

export function trailMatchesDetails(trail: Trail, selection: DetailSelection) {
  const drive = driveMinutes(trail.drive);
  if (!selected(selection.drive, drive === null ? null : String(drive))) {
    return false;
  }
  const bands = timeBandIds(trail.time);
  if (
    selection.time.length > 0 &&
    !bands.some((band) => selection.time.includes(band))
  ) {
    return false;
  }
  if (!selected(selection.vehicle, vehicleId(trail.vehicle))) return false;
  if (!selected(selection.fee, feeId(trail.fee))) return false;
  return true;
}

export function detailSelectionCount(selection: DetailSelection) {
  return (
    selection.drive.length +
    selection.time.length +
    selection.vehicle.length +
    selection.fee.length
  );
}
