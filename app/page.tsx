import { CatalogBrowser } from "@/components/catalog-browser";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs tracking-[0.22em] text-white/55 uppercase">
        Southwest Peaks and Trails
      </p>
      <h1 className="mt-3 max-w-4xl text-6xl leading-[0.9] font-semibold tracking-tight sm:text-8xl">
        Trail Menu
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
        Trails of the Southwest in and around Doña Ana county.
      </p>

      <div className="mt-16">
        <CatalogBrowser />
      </div>
    </main>
  );
}
