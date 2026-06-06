import { createContext, useContext, useState, type ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  rating: number;
  image: string;
  sale?: boolean;
};

export type CartItem = Product & { quantity: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = (p: Product) =>
    setItems((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex) return prev.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...p, quantity: 1 }];
    });
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id: string, q: number) =>
    setItems((p) => (q <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, quantity: q } : i))));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
    <Ctx.Provider
      value={{ items, count, subtotal, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), add, remove, setQty, clear }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
