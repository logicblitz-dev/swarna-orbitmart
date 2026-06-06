import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

type WishlistCtx = {
  items: Product[];
  count: number;
  isOpen: boolean;
  has: (id: string) => boolean;
  toggle: (p: Product) => void;
  remove: (id: string) => void;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const has = (id: string) => items.some((i) => i.id === id);
  const toggle = (p: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === p.id)) return prev.filter((i) => i.id !== p.id);
      toast.success("Added to Wishlist ♥", {
        description: p.name,
        icon: <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />,
      });
      return [...prev, p];
    });
  };
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <Ctx.Provider value={{ items, count: items.length, isOpen, has, toggle, remove, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
}
