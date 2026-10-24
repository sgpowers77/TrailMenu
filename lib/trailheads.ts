export type Trailhead = {
  name: string;
  query: string;
};

// Coordinate queries are published pins or pins supplied for this catalog.
// Named queries are trailheads whose parking pin is still a place search.
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
  "ruby-mine": {
    name: "Mine House Rabbit Ears Trailhead",
    query: "32.3647661,-106.6145198",
  },
  "achenbach-canyon": {
    name: "Achenbach Canyon",
    query: "32.2877522,-106.6019126",
  },
  "slot-canyon": {
    name: "Cave",
    query: "32.4452689,-106.8964438",
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
  "high-point": {
    name: "Dona Ana Mountains",
    query: "32.458765,-106.789952",
  },
  "dona-ana-peak": {
    name: "Dona Ana Mountains",
    query: "32.458765,-106.789952",
  },
  arches: {
    name: "Doña Ana Arch Trail",
    query: "32.4399953,-106.8455192",
  },
  "radio-hill": {
    name: "Doña Ana Trailhead",
    query: "32.4097427,-106.771259",
  },
  "frog-mountain": {
    name: "Bishop Cap Shortcut Trailhead",
    query: "32.1869555,-106.6101773",
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
  "la-mesilla-del-norte": {
    name: "Calle del Norte Trailhead",
    query: "32.2643598,-106.8223366",
  },
  "triviz-trail": {
    name: "Triviz Trail",
    query: "32.343975,-106.767470",
  },
  "university-trail": {
    name: "University Trail",
    query: "32.285168,-106.748579",
  },
  "aden-crater": {
    name: "Aden Crater",
    query: "Aden Crater trailhead, Doña Ana County, NM",
  },
  "b-36-wreck": {
    name: "Thousand Steps Trailhead",
    query: "31.8077772,-106.5000008",
  },
  "aquatic-dwellings": {
    name: "Tunnel Vista",
    query: "32.9461723,-105.8602633",
  },
  "osha-trail": {
    name: "Osha Trail",
    query: "Osha Trail trailhead, Cloudcroft, NM",
  },
  "horse-ridge": {
    name: "Dry Canyon Trailhead",
    query: "32.9484329,-105.8853066",
  },
  "ortega-peak": {
    name: "Dry Canyon Trailhead",
    query: "32.9484329,-105.8853066",
  },
};

export function trailheadFor(slug: string) {
  return trailheads[slug] ?? null;
}

export function trailheadHref(trailhead: Trailhead) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trailhead.query)}`;
}
