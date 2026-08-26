import { ListaForm } from "@/components/lista-form";
import { Shell } from "@/components/shell";

export default function ListaPage() {
  return (
    <Shell>
      <h1 className="text-center text-3xl font-bold tracking-[0.18em] uppercase">
        Te avisamos
      </h1>
      <p className="mt-3 text-center text-sm font-light leading-relaxed text-mist">
        Déjanos tu WhatsApp. Te escribimos el menú del stand, un kit para casa o
        cuando Manuelina vuelva a tener mesa. La lista es de Manuelina, no de
        FreeAgents.
      </p>
      <ListaForm />
    </Shell>
  );
}
