export type Trailhead = {
  name: string;
  query: string;
};

// Pins use published coordinates. Named queries are official trailheads
// whose parking pin was not published on the source page.
const trailheads: Record<string, Trailhead> = {
  "a-mountain": {
    name: "Tortugas Mountain",
    query: "Tortugas Mountain Trailhead, Las Cruces, NM",
  },
  "dripping-springs": {
    name: "Dripping Springs Natural Area",
    query: "32.32256,-106.57388",
  },
  "hermit-cave": {
    name: "Dripping Springs Natural Area",
    query: "32.32256,-106.57388",
  },
  "fillmore-canyon": {
    name: "Dripping Springs Natural Area",
    query: "32.32256,-106.57388",
  },
  "juniper-saddle": {
    name: "Dripping Springs Natural Area",
    query: "32.32256,-106.57388",
  },
  "organ-needle": {
    name: "Dripping Springs Natural Area",
    query: "32.32256,-106.57388",
  },
  soledad: {
    name: "Soledad Canyon Day Use Area",
    query: "Soledad Canyon Day Use Area, Las Cruces, NM",
  },
  "bar-mountain": {
    name: "Soledad Canyon Day Use Area",
    query: "Soledad Canyon Day Use Area, Las Cruces, NM",
  },
  "south-ridge": {
    name: "Soledad Canyon Day Use Area",
    query: "Soledad Canyon Day Use Area, Las Cruces, NM",
  },
  "baylor-pass-west": {
    name: "Baylor Pass West",
    query: "32.39140,-106.61410",
  },
  "baylor-pass-east": {
    name: "Aguirre Spring",
    query: "32.36666667,-106.5567608",
  },
  "pine-tree-trail": {
    name: "Aguirre Spring",
    query: "32.36666667,-106.5567608",
  },
  "picacho-peak": {
    name: "Picacho Peak Recreation Area",
    query: "Picacho Peak Recreation Area trailhead, Las Cruces, NM",
  },
  "discovery-site": {
    name: "Prehistoric Trackways",
    query: "Prehistoric Trackways National Monument trailhead, Las Cruces, NM",
  },
  "robledo-ridgeline": {
    name: "Prehistoric Trackways",
    query: "Prehistoric Trackways National Monument trailhead, Las Cruces, NM",
  },
  "la-llorona-trail": {
    name: "La Llorona Park",
    query: "3440 W Picacho Ave, Las Cruces, NM",
  },
  "outfall-channel-trail": {
    name: "Run Along Road",
    query: "1900 Run Along Rd, Las Cruces, NM",
  },
  "aden-crater": {
    name: "Aden Crater",
    query: "Aden Crater trailhead, Doña Ana County, NM",
  },
  "osha-trail": {
    name: "Osha Trail",
    query: "Osha Trail trailhead, Cloudcroft, NM",
  },
  "horse-ridge": {
    name: "Dry Canyon Trailhead",
    query: "Dry Canyon Trailhead, Alamogordo, NM",
  },
};

export function trailheadFor(slug: string) {
  return trailheads[slug] ?? null;
}

export function trailheadHref(trailhead: Trailhead) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trailhead.query)}`;
}
