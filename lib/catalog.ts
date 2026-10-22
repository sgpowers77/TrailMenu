import data from "@/data/catalog.json";

export type Difficulty = "easy" | "moderate" | "hard" | "expert";

export type SlideImage = {
  slide: number;
  src: string;
  alt: string;
  caption: string | null;
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
