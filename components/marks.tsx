import { difficultyName, type Difficulty } from "@/lib/catalog";

const stroke = {
  fill: "#000000",
  stroke: "#ffffff",
  strokeWidth: 3,
} as const;

export function Mark({
  id,
  size = 18,
}: {
  id: Difficulty;
  size?: number;
}) {
  const label = difficultyName(id);
  return (
    <span
      className="inline-flex shrink-0"
      role="img"
      aria-label={label}
      title={label}
    >
      {id === "easy" && (
        <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
          <circle cx="32" cy="32" r="30" fill="#3bbc21" />
        </svg>
      )}
      {id === "moderate" && (
        <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
          <rect x="2" y="2" width="60" height="60" fill="#004aad" />
        </svg>
      )}
      {id === "hard" && (
        <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
          <polygon points="32,3 61,32 32,61 3,32" {...stroke} />
        </svg>
      )}
      {id === "expert" && (
        <svg width={size * 1.35} height={size} viewBox="0 0 86 64" aria-hidden>
          <polygon points="24,3 46,32 24,61 2,32" {...stroke} />
          <polygon points="50,3 72,32 50,61 28,32" {...stroke} />
        </svg>
      )}
    </span>
  );
}

export function MarkRow({
  ids,
  size = 16,
}: {
  ids: Difficulty[];
  size?: number;
}) {
  if (ids.length === 0) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      {ids.map((id) => (
        <Mark key={id} id={id} size={size} />
      ))}
    </span>
  );
}
