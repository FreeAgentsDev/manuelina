"use client";

import { useState } from "react";

export function ListaForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/lista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "No se pudo guardar.");
        return;
      }
      setStatus("ok");
      setName("");
      setWhatsapp("");
    } catch {
      setStatus("error");
      setError("Revisa la conexión e intenta de nuevo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium tracking-[0.16em] text-mist uppercase">
          Nombre
        </span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 w-full rounded-xl border border-white/20 bg-white/5 px-3 text-paper outline-none focus:border-paper"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium tracking-[0.16em] text-mist uppercase">
          WhatsApp
        </span>
        <input
          required
          inputMode="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="300 000 0000"
          className="h-12 w-full rounded-xl border border-white/20 bg-white/5 px-3 text-paper outline-none placeholder:text-mist/40 focus:border-paper"
        />
      </label>
      {error ? <p className="text-sm text-paper">{error}</p> : null}
      {status === "ok" ? (
        <p className="text-sm text-mist">Listo. Te escribimos cuando haya novedad.</p>
      ) : null}
      <button
        type="submit"
        className="h-12 w-full rounded-full bg-paper text-sm font-semibold tracking-wide text-navy"
      >
        Quiero que me avisen
      </button>
    </form>
  );
}
