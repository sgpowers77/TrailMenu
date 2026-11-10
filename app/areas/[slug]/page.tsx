import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaSection } from "@/components/area-section";
import { areaLabel, areas, getArea } from "@/lib/catalog";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return { title: areaLabel(area) };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/#catalog" className="text-sm text-white/60 underline underline-offset-4">
        All areas
      </Link>
      <AreaSection area={area} />
    </main>
  );
}
