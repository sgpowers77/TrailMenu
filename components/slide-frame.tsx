import Image from "next/image";

export function SlideFrame({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={596}
      height={335}
      priority={priority}
      className={className}
    />
  );
}
