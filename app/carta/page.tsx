import { CartaMenu } from "@/components/carta-menu";
import { Shell } from "@/components/shell";
import { MENU } from "@/lib/site";

export default function CartaPage() {
  return (
    <Shell>
      <p className="text-center text-[11px] font-medium tracking-[0.32em] text-mist uppercase">
        Pasta Fresca
      </p>
      <h1 className="mt-2 text-center text-4xl font-bold tracking-[0.22em] uppercase">
        Menú
      </h1>
      <p className="mt-4 text-center text-sm font-light leading-relaxed text-mist">
        Agrega lo que quieras. El pedido se arma abajo y se envía por WhatsApp.
      </p>
      <div className="mt-12">
        <CartaMenu sections={MENU} />
      </div>
    </Shell>
  );
}
