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
        Cómo llegar y reseñas de Manuelina. Desde el stand, abre la ficha y
        déjanos una.
      </p>
      {hasMaps ? (
        <>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/20 bg-paper/5">
            <iframe
              title="Ubicación de Manuelina en Google Maps"
              src={SITE.mapsEmbed}
              className="block h-[280px] w-full border-0 sm:h-[320px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="border-t border-white/15 px-4 py-4">
              <p className="text-sm font-semibold tracking-wide">{SITE.name}</p>
              <p className="mt-1 text-sm font-light text-mist">
                {SITE.mapsAddress} · {SITE.city}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={SITE.mapsDirections}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-paper text-sm font-semibold tracking-wide text-navy"
            >
              Cómo llegar
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/35 text-sm font-semibold tracking-wide text-paper"
            >
              Abrir ficha y reseñas
            </a>
          </div>
        </>
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
