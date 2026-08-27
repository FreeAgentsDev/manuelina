import { Shell } from "@/components/shell";
import { SITE } from "@/lib/site";

export default function ListaPage() {
  return (
    <Shell>
      <h1 className="text-center text-3xl font-bold tracking-[0.18em] uppercase">
        Te avisamos
      </h1>
      <p className="mt-3 text-center text-sm font-light leading-relaxed text-mist">
        Nombre y WhatsApp. Manuela te escribe el menú del stand, un kit para
        casa o cuando haya mesa. La lista queda en su Drive, no en FreeAgents.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl bg-paper">
        <iframe
          title="Te avisamos · Manuelina"
          src={SITE.listaFormEmbed}
          className="h-[980px] w-full border-0"
        >
          Cargando…
        </iframe>
      </div>
      <p className="mt-4 text-center text-xs text-mist">
        <a
          href={SITE.listaFormUrl}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Abrir el formulario
        </a>
      </p>
    </Shell>
  );
}
