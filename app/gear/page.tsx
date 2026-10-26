import type { Metadata } from "next";
import { Compass, Droplets, Footprints, Shirt, Sun } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gear",
};

const kits = [
  {
    icon: Droplets,
    title: "Water",
    body: "Carry 1 liter, about 34 oz, for each hour printed on the trail. Juniper Saddle and Organ Needle print 8–9 hours, so that rate is 8–9 L. A city path printed as 1–4 hours is 1–4 L. The figure is on each trail’s detail table.",
  },
  {
    icon: Sun,
    title: "Sun",
    body: "Most of this menu is open country around Doña Ana county: the Organs, Dona Ana, Picacho, Aden, and the desert approaches. A brimmed hat, sunglasses, and a sun shirt cover those days.",
  },
  {
    icon: Footprints,
    title: "Footwear",
    body: "Trail shoes for the gravel lots, rocky approaches, and the routes noted as having no defined trail, including High Point and Dona Ana Peak. The Las Cruces paths, including La Llorona, are fully paved, so road shoes are enough there.",
  },
  {
    icon: Compass,
    title: "Navigation",
    body: "Achenbach Canyon is marked Unknown. Bar Mountain, South Ridge, and Radio Hill say no trail. High Point and Dona Ana Peak say no defined trail. Baylor Pass notes uncertain trails. A downloaded map and a GPS app matter on those.",
  },
  {
    icon: Shirt,
    title: "A warmer layer",
    body: "Cloudcroft and Alamogordo sit above the desert floor: Aquatic Dwellings, Osha Trail, Boundary Trail, Horse Ridge, and Ortega Peak. Pack a light insulating layer for those, and for a long day on the Organs.",
  },
];

export default function GearPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-white/60 underline underline-offset-4">
        Trail Menu
      </Link>
      <p className="mt-8 text-xs tracking-[0.2em] text-white/55 uppercase">
        Starting kit
      </p>
      <h1 className="mt-2 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
        Gear
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
        A packing list drawn from the trails in this menu: short paved paths,
        desert approaches, and the long days in the Organs and Dona Ana
        Mountains.
      </p>
      <ul className="mt-10 max-w-3xl divide-y divide-white/15 border-y border-white/15">
        {kits.map((kit) => (
          <li key={kit.title} className="flex gap-4 py-6">
            <kit.icon className="mt-1 size-5 shrink-0 text-white/70" aria-hidden />
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{kit.title}</h2>
              <p className="mt-2 leading-relaxed text-white/80">{kit.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
