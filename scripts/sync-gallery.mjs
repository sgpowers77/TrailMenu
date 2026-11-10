// Copy quality WebPs from D:\_HikeMenu\web\trails into public/photos
// and point catalog galleries at them. Deck slides stay for trails
// that do not have photos yet, and for the information pages.
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const webRoot = "D:\\_HikeMenu\\web\\trails";
const manifestPath = "D:\\_HikeMenu\\web\\trails-manifest.json";
const catalogPath = path.join(repoRoot, "data", "catalog.json");
const photoRoot = path.join(repoRoot, "public", "photos");
const slidesDir = path.join(repoRoot, "public", "slides");

const folderForSlug = {
  "high-point": "dona-ana-high-point",
};

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const byFolder = new Map(manifest.trails.map((trail) => [trail.slug, trail.images]));

function baseName(file) {
  return path.posix.basename(file, ".webp");
}

function isCameraName(file) {
  const base = baseName(file);
  return /^(img|dsc|pxl)[_-]?\d+$/i.test(base) || /^\d{8}[_-]?\d{4,6}$/.test(base);
}

function isWeakCover(file) {
  return /sign|marker|map|rules|cache|cairn|edit|plaque|kiosk|guard/i.test(baseName(file));
}

function coverScore(img) {
  const base = baseName(img.file);
  let score = Math.min(img.bytes / (1024 * 1024), 2.5);
  if (img.width >= img.height) score += 4;
  if (img.width / img.height >= 1.2) score += 1;
  if (!isCameraName(img.file)) score += 3;
  if (/vista|summit|peak|view|canyon|ridge|wash|overlook|needle|crater|arch|hill/i.test(base)) {
    score += 3;
  }
  if (isWeakCover(img.file)) score -= 6;
  return score;
}

function sortImages(images) {
  const sorted = [...images].sort((a, b) =>
    a.file.localeCompare(b.file, "en", { numeric: true, sensitivity: "base" }),
  );
  const ranked = [...images].sort((a, b) => coverScore(b) - coverScore(a));
  const best = coverScore(ranked[0]);
  let candidates = ranked.filter((img) => best - coverScore(img) < 0.6);
  if (candidates.every((img) => isCameraName(img.file)) && sorted.length >= 6) {
    const later = candidates.filter((img) => sorted.indexOf(img) >= Math.floor(sorted.length * 0.25));
    if (later.length) candidates = later;
  }
  const cover = candidates[0];
  return [cover, ...sorted.filter((img) => img !== cover)];
}

function captionFromFile(rel) {
  const base = path.posix.basename(rel, ".webp");
  if (/^(img|dsc|pxl)[_-]?\d+$/i.test(base)) return null;
  if (/^\d{8}[_-]?\d{4,6}$/.test(base)) return null;
  const words = base
    .replace(/[_-]+/g, " ")
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (!/[a-z]/i.test(words)) return null;
  return words.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function relFor(slug, file) {
  const folder = folderForSlug[slug] ?? slug;
  const prefix = `${folder}/`;
  return file.startsWith(prefix) ? file.slice(prefix.length) : file;
}

const raw = fs.readFileSync(catalogPath, "utf8");
const newline = raw.includes("\r\n") ? "\r\n" : "\n";
const catalog = JSON.parse(raw);
const copies = [];
const updated = [];
const skipped = [];

for (const area of catalog.areas) {
  let areaCover = null;
  for (const trail of area.trails) {
    const folder = folderForSlug[trail.slug] ?? trail.slug;
    const images = byFolder.get(folder);
    if (!images?.length) {
      skipped.push(trail.slug);
      continue;
    }
    const ordered = sortImages(images);
    trail.slides = ordered.map((img) => {
      const rel = relFor(trail.slug, img.file);
      const src = `/photos/${trail.slug}/${rel}`;
      copies.push({
        from: path.join(webRoot, ...img.file.split("/")),
        to: path.join(photoRoot, trail.slug, ...rel.split("/")),
      });
      const caption = captionFromFile(rel);
      return {
        slide: 0,
        src,
        alt: caption ? `${trail.name} — ${caption}` : trail.name,
        caption,
        width: img.width,
        height: img.height,
      };
    });
    updated.push({ slug: trail.slug, count: trail.slides.length });
    if (!areaCover) areaCover = trail.slides[0];
  }
  if (areaCover) {
    const label = [area.region, area.name].filter(Boolean).join(" ");
    area.slides = [
      {
        slide: 0,
        src: areaCover.src,
        alt: label,
        caption: null,
        width: areaCover.width,
        height: areaCover.height,
      },
    ];
  }
}

let slideNumber = 1;
function stamp(slides) {
  for (const slide of slides ?? []) slide.slide = slideNumber++;
}
stamp(catalog.legend.slides);
for (const area of catalog.areas) {
  stamp(area.slides);
  for (const trail of area.trails) stamp(trail.slides);
}
stamp(catalog.whaling.slides);

let text = JSON.stringify(catalog, null, 2) + "\n";
if (newline === "\r\n") text = text.replace(/\n/g, "\r\n");
fs.writeFileSync(catalogPath, text);

fs.rmSync(photoRoot, { recursive: true, force: true });
for (const copy of copies) {
  fs.mkdirSync(path.dirname(copy.to), { recursive: true });
  fs.copyFileSync(copy.from, copy.to);
}

const usedSlides = new Set();
function collect(slides) {
  for (const slide of slides ?? []) {
    if (typeof slide.src === "string" && slide.src.startsWith("/slides/")) {
      usedSlides.add(path.posix.basename(slide.src));
    }
  }
}
collect(catalog.legend.slides);
for (const area of catalog.areas) {
  collect(area.slides);
  for (const trail of area.trails) collect(trail.slides);
}
collect(catalog.whaling.slides);

const removedSlides = [];
for (const file of fs.readdirSync(slidesDir)) {
  if (!usedSlides.has(file)) {
    fs.rmSync(path.join(slidesDir, file));
    removedSlides.push(file);
  }
}

const bytes = copies.reduce((sum, copy) => sum + fs.statSync(copy.to).size, 0);
const unusedFolders = [...byFolder.keys()].filter((folder) => {
  const used = updated.some((trail) => (folderForSlug[trail.slug] ?? trail.slug) === folder);
  return !used;
});

console.log(
  JSON.stringify(
    {
      updated,
      skipped,
      unusedFolders,
      photos: copies.length,
      megabytes: Math.round((bytes / 1024 / 1024) * 10) / 10,
      removedSlides: removedSlides.length,
      keptSlides: [...usedSlides].sort(),
    },
    null,
    2,
  ),
);
