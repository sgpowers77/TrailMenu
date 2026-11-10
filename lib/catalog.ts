import data from "@/data/catalog.json";

export type Difficulty = "easy" | "moderate" | "hard" | "expert";

export type SlideImage = {
  slide: number;
  src: string;
  alt: string;
  caption: string | null;
  width?: number;
  height?: number;
};

export type Trail = {
  slug: string;
  name: string;
  nameLines: string[];
  kicker: string;
  kickerLines: string[];
  difficulty: Difficulty[];
  drive: string | null;
  vehicle: string | null;
  fee: string | null;
  time: string | null;
  notes: string[];
  callouts: string[];
  slides: SlideImage[];
};

export type Area = {
  slug: string;
  region: string;
  name: string;
  regionLines: string[];
  nameLines: string[];
  slides: SlideImage[];
  trails: Trail[];
};

export type Field = {
  id: "drive" | "vehicle" | "fee" | "time";
  label: string;
};

export const catalog = data;
export const areas = data.areas as Area[];
export const legend = data.legend;
export const whaling = data.whaling;
export const fields = data.legend.fields as Field[];
export const difficultyOrder: Difficulty[] = [
  "easy",
  "moderate",
  "hard",
  "expert",
];

export function difficultyName(id: Difficulty) {
  return legend.levels.find((level) => level.id === id)?.name ?? id;
}

export function areaHeading(area: Area) {
  if (area.name) {
    return {
      kicker: area.region,
      titleLines: area.nameLines.length > 0 ? area.nameLines : [area.name],
    };
  }
  return {
    kicker: "",
    titleLines:
      area.regionLines.length > 0 ? area.regionLines : [area.region],
  };
}

export function areaLabel(area: Area) {
  const heading = areaHeading(area);
  return [heading.kicker, ...heading.titleLines].filter(Boolean).join(" ");
}

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug) ?? null;
}

export function getTrail(slug: string) {
  for (const area of areas) {
    const trail = area.trails.find((item) => item.slug === slug);
    if (trail) return { area, trail };
  }
  return null;
}

export function trailCount() {
  return areas.reduce((sum, area) => sum + area.trails.length, 0);
}

const durationNote =
  /^(short|long|medium|medium-long)(\s*[-–(].*)?$|^\d+(\.\d+)?\s*(-\s*\d+(\.\d+)?)?\s*-?\s*(h|hr|hrs|hours)\b.*$|^\d+\s*-\s*\d+\s*hours?$/i;

function accessDetail(note: string) {
  if (/multi\s*-?\s*use/i.test(note)) return null;
  const match = note.match(
    /^(?:paved(?:\s+access)?|fully paved(?:\s+path)?)\s*(?:[-–:]\s*)?(.*)$/i,
  );
  if (!match) return null;
  const rest = match[1].trim();
  if (!rest) return "";
  const paren = rest.match(/^\(([^)]*)\)$/);
  return paren ? paren[1] : null;
}

function vehicleAlreadyStates(vehicle: string, detail: string) {
  const stated = vehicle.toLowerCase();
  if (!detail) return /\b(paved|asphalt)\b/.test(stated);
  const tokens = ["asphalt", "paved", "gravel", "dirt"].filter((token) =>
    detail.toLowerCase().includes(token),
  );
  if (tokens.length === 0) return false;
  return tokens.every((token) =>
    token === "paved" || token === "asphalt"
      ? /\b(paved|asphalt)\b/.test(stated)
      : stated.includes(token),
  );
}

export function displayNotes(trail: Trail) {
  return trail.notes.filter((note) => {
    const line = note.trim();
    if (trail.fee && /^(free|fee area)$/i.test(line)) return false;
    if (trail.time && durationNote.test(line)) return false;
    if (trail.vehicle) {
      const detail = accessDetail(line);
      if (detail !== null && vehicleAlreadyStates(trail.vehicle, detail)) {
        return false;
      }
    }
    return true;
  });
}
