import { cn } from "cn";

export function SlideFrame({
  slide,
  label,
  className,
}: {
  slide: number;
  label?: string;
  className?: string;
}) {
  const number = String(slide).padStart(3, "0");
  return (
    <div
      role="img"
      aria-label={
        label ? `Slide ${slide}, ${label}. Photo later.` : `Slide ${slide}. Photo later.`
      }
      className={cn(
        "relative aspect-video overflow-hidden bg-black text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "25% 100%, 100% 33.333%",
        }}
      />
      <div aria-hidden className="absolute inset-3 border border-white/25" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <p className="text-[11px] tracking-[0.18em] text-white/55 uppercase">
          Slide {number}
        </p>
        {label ? (
          <p className="line-clamp-3 max-w-[18ch] text-lg leading-tight font-semibold tracking-tight sm:text-2xl">
            {label}
          </p>
        ) : (
          <p className="text-sm tracking-[0.16em] text-white/45 uppercase">
            Photo later
          </p>
        )}
      </div>
    </div>
  );
}
