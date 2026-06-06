import { useEffect, useRef } from "react";
import { ShoppingCart, Heart, Search, X } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useFilters } from "@/context/FilterContext";

export default function Navbar() {
  const { count, open } = useCart();
  const { count: wCount, open: openWishlist } = useWishlist();
  const { searchOpen, openSearch, closeSearch, query, setQuery } = useFilters();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    if (pathname !== "/") {
      navigate({ to: "/" });
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    const onClick = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) closeSearch();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => window.addEventListener("mousedown", onClick), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [searchOpen, closeSearch]);

  const openSearchAndGo = () => {
    openSearch();
    if (pathname !== "/") navigate({ to: "/" });
    setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 glass-strong">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl tracking-widest text-gradient">
          ORBITMART
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
          <li><button onClick={() => scrollTo("hero")} className="nav-link">Home</button></li>
          <li><button onClick={() => scrollTo("products")} className="nav-link">Products</button></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><button onClick={open} className="nav-link">Cart</button></li>
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={openSearchAndGo} aria-label="Search" className="p-2 rounded-full glass hover:glow-cyan transition">
            <Search className="w-5 h-5 text-[color:var(--cyan-accent)]" />
          </button>
          <button onClick={openWishlist} aria-label="Wishlist" className="relative p-2 rounded-full glass hover:glow-cyan transition">
            <Heart className="w-5 h-5 text-[color:var(--cyan-accent)]" />
            {wCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center bg-[#ff3b8b] text-white">
                {wCount}
              </span>
            )}
          </button>
          <button onClick={open} className="relative p-2 rounded-full glass hover:glow-cyan transition" aria-label="Open cart">
            <ShoppingCart className="w-5 h-5 text-[color:var(--cyan-accent)]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center bg-[color:var(--violet-accent)] text-white animate-pulse">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchBoxRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-[color:var(--cyan-accent)]/20 glass-strong"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-[color:var(--cyan-accent)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the galaxy..."
                className="flex-1 bg-transparent outline-none font-display tracking-widest text-sm placeholder:text-white/30"
              />
              <button onClick={closeSearch} aria-label="Close search" className="p-1 hover:text-[color:var(--cyan-accent)]">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
