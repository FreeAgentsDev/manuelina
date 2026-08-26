import { BrandMark } from "@/components/brand-mark";
import { Shell } from "@/components/shell";
import { SITE, qrImageUrl } from "@/lib/site";

export default function QrPage() {
  const url = SITE.publicUrl;
  return (
    <Shell>
      <h1 className="text-center text-3xl font-bold tracking-[0.18em] uppercase">
        QR del stand
      </h1>
      <p className="mt-3 text-center text-sm font-light leading-relaxed text-mist">
        Imprime esta página o muéstrala en el celular. Quien escanea abre la
        ficha de Manuelina.
      </p>
      <div className="mt-8 rounded-3xl border border-white/20 px-6 py-8 text-center">
        <BrandMark size="lg" />
        <img
          src={qrImageUrl(url, 280)}
          alt={`QR a ${url}`}
          width={280}
          height={280}
          className="mx-auto mt-6 size-[220px] rounded-2xl"
        />
        <p className="mt-4 text-[11px] font-medium tracking-[0.22em] uppercase">
          {SITE.tagline}
        </p>
        <p className="mt-2 break-all text-xs text-mist">{url}</p>
      </div>
    </Shell>
  );
}
