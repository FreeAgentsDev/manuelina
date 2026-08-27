"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { formatCop, parseCop, whatsappHref } from "@/lib/site";

export type CartLine = {
  id: string;
  name: string;
  group: string;
  price?: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number | null;
  add: (line: Omit<CartLine, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  whatsappUrl: string;
};

const STORAGE_KEY = "manuelina-cart";
const CartContext = createContext<CartContextValue | null>(null);

function orderText(lines: CartLine[], total: number | null) {
  const body = lines
    .map((line) => {
      const price = line.price ? ` — ${line.price}` : "";
      return `• ${line.qty}× ${line.name}${price}`;
    })
    .join("\n");
  const totalLine =
    total !== null ? `\n\nTotal: ${formatCop(total)}` : "";
  return `Hola Manuelina, quiero pedir:\n\n${body}${totalLine}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l.qty > 0));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((line: Omit<CartLine, "qty">) => {
    setLines((prev) => {
      const found = prev.find((item) => item.id === line.id);
      if (found) {
        return prev.map((item) =>
          item.id === line.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...line, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) => (item.id === id ? { ...item, qty } : item));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const total = useMemo(() => {
    let sum = 0;
    let priced = false;
    for (const line of lines) {
      const value = parseCop(line.price);
      if (value === null) continue;
      priced = true;
      sum += value * line.qty;
    }
    return priced ? sum : null;
  }, [lines]);

  const whatsappUrl = useMemo(
    () => whatsappHref(orderText(lines, total)),
    [lines, total],
  );

  const value = useMemo(
    () => ({ lines, count, total, add, setQty, clear, whatsappUrl }),
    [lines, count, total, add, setQty, clear, whatsappUrl],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function AddToCart({
  id,
  name,
  group,
  price,
}: {
  id: string;
  name: string;
  group: string;
  price?: string;
}) {
  const { lines, add, setQty } = useCart();
  const qty = lines.find((line) => line.id === id)?.qty ?? 0;

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add({ id, name, group, price })}
        className="shrink-0 rounded-full border border-white/35 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-paper hover:text-navy"
      >
        Agregar
      </button>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/35 px-1.5 py-0.5">
      <button
        type="button"
        aria-label={`Quitar ${name}`}
        onClick={() => setQty(id, qty - 1)}
        className="grid size-7 place-items-center text-lg leading-none"
      >
        −
      </button>
      <span className="min-w-4 text-center text-sm font-semibold tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Agregar ${name}`}
        onClick={() => setQty(id, qty + 1)}
        className="grid size-7 place-items-center text-lg leading-none"
      >
        +
      </button>
    </div>
  );
}

export function CartBar() {
  const { lines, count, total, setQty, clear, whatsappUrl } = useCart();
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-auto max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-navy shadow-[0_-8px_40px_rgba(0,0,0,0.35)]">
        {open ? (
          <div className="max-h-[50vh] overflow-y-auto px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">
                Tu pedido
              </p>
              <button
                type="button"
                onClick={clear}
                className="text-[11px] tracking-wide text-mist uppercase hover:text-paper"
              >
                Vaciar
              </button>
            </div>
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold uppercase">
                      {line.name}
                    </span>
                    {line.price ? (
                      <span className="text-xs text-mist">{line.price}</span>
                    ) : (
                      <span className="text-xs text-mist">A confirmar</span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      className="grid size-7 place-items-center rounded-full border border-white/25"
                    >
                      −
                    </button>
                    <span className="w-5 text-center tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      className="grid size-7 place-items-center rounded-full border border-white/25"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex items-center gap-3 px-3 py-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="min-w-0 flex-1 text-left"
          >
            <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase">
              {count} {count === 1 ? "ítem" : "ítems"}
              {open ? " · Cerrar" : " · Ver"}
            </span>
            <span className="text-sm text-mist">
              {total !== null ? `Total ${formatCop(total)}` : "Total a confirmar"}
            </span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-paper px-4 text-xs font-semibold tracking-wide text-navy"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

