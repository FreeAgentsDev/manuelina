import Image from "next/image";

type Props = {
  size?: "sm" | "lg";
};

export function BrandMark({ size = "lg" }: Props) {
  const px = size === "lg" ? 825 : 96;
  return (
    <Image
      src="/logo.png"
      alt="Manuelina Pasta Fresca · Manizales"
      width={px}
      height={size === "lg" ? 817 : 95}
      quality={100}
      unoptimized
      priority
      className={
        size === "lg" ? "mx-auto h-auto w-full max-w-[420px]" : "size-24"
      }
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-[family-name:var(--font-script)] ${className}`}>
      Manuelina
    </span>
  );
}
