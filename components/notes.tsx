import Link from "next/link";
import { areas } from "@/lib/catalog";

const mentions = areas
  .flatMap((area) =>
    area.trails.map((trail) => ({
      slug: trail.slug,
      label: trail.name.replace(/[“”"]/g, "").trim(),
    })),
  )
  .concat([
    { slug: "robledo-ridgeline", label: "Robledo Ridge" },
    { slug: "la-mesilla-del-norte", label: "Del Norte" },
    { slug: "university-trail", label: "University Path" },
  ])
  .sort((a, b) => b.label.length - a.label.length);

export function NoteText({
  text,
  current,
}: {
  text: string;
  current: string;
}) {
  const pieces: Array<{ key: string; href?: string; value: string }> = [];
  let cursor = 0;
  const lower = text.toLowerCase();
  const hits: Array<{ start: number; end: number; slug: string }> = [];

  for (const mention of mentions) {
    if (mention.slug === current || mention.label.length < 4) continue;
    const needle = mention.label.toLowerCase();
    let from = 0;
    while (from < lower.length) {
      const start = lower.indexOf(needle, from);
      if (start < 0) break;
      const end = start + needle.length;
      const before = start === 0 || !/[a-z0-9]/i.test(text[start - 1]);
      const after = end === text.length || !/[a-z0-9]/i.test(text[end]);
      const overlaps = hits.some((hit) => start < hit.end && end > hit.start);
      if (before && after && !overlaps) {
        hits.push({ start, end, slug: mention.slug });
      }
      from = end;
    }
  }

  hits.sort((a, b) => a.start - b.start);
  hits.forEach((hit, index) => {
    if (hit.start > cursor) {
      pieces.push({ key: `t-${index}`, value: text.slice(cursor, hit.start) });
    }
    pieces.push({
      key: `l-${index}`,
      href: `/trails/${hit.slug}/`,
      value: text.slice(hit.start, hit.end),
    });
    cursor = hit.end;
  });
  if (cursor < text.length) {
    pieces.push({ key: "tail", value: text.slice(cursor) });
  }

  return (
    <>
      {pieces.map((piece) =>
        piece.href ? (
          <Link
            key={piece.key}
            href={piece.href}
            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {piece.value}
          </Link>
        ) : (
          <span key={piece.key}>{piece.value}</span>
        ),
      )}
    </>
  );
}
