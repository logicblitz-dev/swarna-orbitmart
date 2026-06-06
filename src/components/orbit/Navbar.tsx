import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { count, open } = useCart();
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="fixed top-0 inset-x-0 z-40 glass-strong">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => scroll("hero")} className="font-display text-xl tracking-widest text-gradient">
          ORBITMART
        </button>
        <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wider">
          <li><button onClick={() => scroll("hero")} className="nav-link">Home</button></li>
          <li><button onClick={() => scroll("products")} className="nav-link">Products</button></li>
          <li><button onClick={() => scroll("about")} className="nav-link">About</button></li>
          <li><button onClick={open} className="nav-link">Cart</button></li>
        </ul>
        <button
          onClick={open}
          className="relative p-2 rounded-full glass hover:glow-cyan transition"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-5 h-5 text-[color:var(--cyan-accent)]" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center bg-[color:var(--violet-accent)] text-white animate-pulse">
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
