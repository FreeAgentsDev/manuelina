import { BrandMark } from "@/components/brand-mark";
import { FeaturedList } from "@/components/featured-list";
import { Gallery } from "@/components/gallery";
import { MenuFeriaImage } from "@/components/menu-feria";
import { Shell } from "@/components/shell";
import { FEATURED, SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <Shell>
      <div className="text-center">
        <BrandMark size="lg" />
        <p className="mt-2 text-[11px] font-medium tracking-[0.32em] text-mist uppercase">
          {SITE.city}
        </p>
      </div>
      <p className="mt-6 text-center text-sm font-light leading-relaxed text-paper/90">
        Pasta fresca hecha a mano. Hoy en la feria: sánduche de birria, pizza,
        choripán y bebidas. Arma el pedido y envíalo por WhatsApp.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href="/carta"
          className="inline-flex h-12 items-center justify-center rounded-full bg-paper text-sm font-semibold tracking-wide text-navy"
        >
          Armar pedido
        </a>
        <a
          href="/lista"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 text-sm font-semibold tracking-wide text-paper"
        >
          Quiero que me avisen
        </a>
      </div>

      <section className="mt-12">
        <h2 className="text-center text-[11px] font-medium tracking-[0.22em] text-mist uppercase">
          Hoy en la feria
        </h2>
        <a href="/carta" className="mt-4 block">
          <MenuFeriaImage />
        </a>
        <FeaturedList items={FEATURED} />
        <a
          href="/carta"
          className="mt-4 block text-center text-xs font-medium tracking-[0.16em] text-mist uppercase hover:text-paper"
        >
          Pedir lo de hoy
        </a>
      </section>

      <Gallery />
    </Shell>
  );
}
