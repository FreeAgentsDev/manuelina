import Link from "next/link";

import { CartBar, CartProvider } from "@/components/cart";
import { Wordmark } from "@/components/brand-mark";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Carta" },
  { href: "/lista", label: "Avisame" },
  { href: "/maps", label: "Maps" },
  { href: "/qr", label: "QR" },
];

export function Header() {
  return (
    <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="leading-tight" aria-label="Manuelina">
        <Wordmark className="block text-2xl text-paper" />
        <span className="text-[10px] font-light tracking-[0.22em] text-mist uppercase">
          Pasta Fresca
        </span>
      </Link>
      <nav className="flex flex-wrap gap-3 text-xs font-medium tracking-wide text-mist uppercase">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-paper">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/15 pt-6 text-center text-xs text-mist/80">
      <p className="tracking-[0.18em] uppercase">{SITE.city}</p>
      <p className="mt-2">
        {SITE.instagramHandle} · {SITE.whatsappDisplay}
      </p>
      <p className="mt-2 text-mist/50">
        Cortesía Nos Mueve ·{" "}
        <a href="https://feria.freeagentsdev.com" className="hover:text-paper">
          FreeAgents
        </a>
      </p>
    </footer>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="mx-auto min-h-dvh max-w-lg px-5 py-8 pb-28">
        <Header />
        {children}
        <Footer />
      </div>
      <CartBar />
    </CartProvider>
  );
}
