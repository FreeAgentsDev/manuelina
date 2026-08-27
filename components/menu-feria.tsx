import Image from "next/image";

import { MENU_FERIA_IMAGE } from "@/lib/site";

export function MenuFeriaImage({ className = "" }: { className?: string }) {
  return (
    <Image
      src={MENU_FERIA_IMAGE.src}
      alt={MENU_FERIA_IMAGE.alt}
      width={MENU_FERIA_IMAGE.width}
      height={MENU_FERIA_IMAGE.height}
      className={`w-full rounded-2xl ${className}`}
      sizes="(max-width: 512px) 100vw, 512px"
      priority
    />
  );
}
