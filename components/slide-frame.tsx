import Image from "next/image";
import { cn } from "cn";

export function SlideFrame({
  src,
  alt,
  className,
  width,
  height,
  fit,
}: {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fit?: "window" | "dialog";
}) {
  if (src) {
    const natural = Boolean(width && height);
    return (
      <Image
        src={src}
        alt={alt}
        width={natural ? width : 596}
        height={natural ? height : 335}
        className={cn(
          "bg-background object-contain",
          fit === "window" &&
            "mx-auto h-auto w-auto max-h-[calc(100svh-5.5rem)] max-w-full",
          fit === "dialog" &&
            "mx-auto h-auto w-auto max-h-[calc(100svh-7.5rem)] max-w-[calc(100vw-3rem)]",
          fit ? undefined : "h-auto w-full",
          natural || fit ? undefined : "aspect-video",
          className,
        )}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || "Photo later."}
      className={cn(
        "relative aspect-video overflow-hidden bg-background text-white",
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
        <p className="text-sm tracking-[0.16em] text-white/45 uppercase">
          Photo later
        </p>
      </div>
    </div>
  );
}
