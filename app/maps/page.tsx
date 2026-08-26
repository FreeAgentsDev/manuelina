import { Shell } from "@/components/shell";
import { SITE } from "@/lib/site";

export default function MapsPage() {
  const hasMaps = Boolean(SITE.mapsUrl);

  return (
    <Shell>
      <h1 className="text-center text-3xl font-bold tracking-[0.18em] uppercase">
        Google Maps
      </h1>
      <p className="mt-3 text-center text-sm font-light leading-relaxed text-mist">
        La ficha anterior de Google quedó cerrada. Cuando Manuela tenga el
        enlace nuevo, este botón abre Maps para dejar la reseña desde el stand.
      </p>
      {hasMaps ? (
        <a
          href={SITE.mapsUrl}
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-paper text-sm font-semibold tracking-wide text-navy"
        >
          Abrir Google Maps
        </a>
      ) : (
        <p className="mt-8 rounded-2xl border border-white/20 px-4 py-4 text-center text-sm text-mist">
          Enlace de Maps pendiente. Mientras tanto, síguenos en{" "}
          <a href={SITE.instagram} className="text-paper underline">
            {SITE.instagramHandle}
          </a>{" "}
          o déjanos WhatsApp en{" "}
          <a href="/lista" className="text-paper underline">
            la lista
          </a>
          .
        </p>
      )}
    </Shell>
  );
}
