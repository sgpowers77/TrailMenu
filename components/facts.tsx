import { fields, type Trail } from "@/lib/catalog";

export function Facts({ trail }: { trail: Trail }) {
  const rows = fields.flatMap((field) => {
    const value = trail[field.id];
    return value ? [{ ...field, value }] : [];
  });
  if (rows.length === 0) return null;
  return (
    <dl className="grid border border-white/15 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.id} className="border-b border-white/15 p-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:odd:border-r">
          <dt className="text-[11px] tracking-[0.16em] text-white/55 uppercase">
            {row.label}
          </dt>
          <dd className="mt-1 text-lg leading-snug">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
