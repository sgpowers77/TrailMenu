import Link from "next/link";
import { MarkRow } from "@/components/marks";
import { difficultyOrder } from "@/lib/catalog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/15 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <MarkRow ids={difficultyOrder} size={14} />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">
            Trail Menu
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/#catalog" className="hover:underline">
            Catalog
          </Link>
          <Link href="/info/" className="hover:underline">
            Info
          </Link>
          <Link href="/whaling/" className="hover:underline">
            Whaling list
          </Link>
        </nav>
      </div>
    </header>
  );
}
