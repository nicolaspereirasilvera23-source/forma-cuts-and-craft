import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/demo";

type Line = { product: Product; qty: number };
type Ctx = {
  lines: Line[];
  count: number;
  total: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

/** Carrito local en memoria (sin cobro, sin backend). */
export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQtyMap] = useState<Record<string, number>>({});
  const value = useMemo<Ctx>(() => {
    const lines = products.filter((p) => qty[p.id]).map((p) => ({ product: p, qty: qty[p.id] ?? 0 }));
    return {
      lines,
      count: lines.reduce((a, l) => a + l.qty, 0),
      total: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
      add: (id) => setQtyMap((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 })),
      setQty: (id, n) =>
        setQtyMap((q) => {
          const next = { ...q };
          if (n <= 0) delete next[id];
          else next[id] = n;
          return next;
        }),
      clear: () => setQtyMap({}),
    };
  }, [qty]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart fuera de CartProvider");
  return c;
}
