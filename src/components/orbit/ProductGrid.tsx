import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products, categories, sortOptions, type CategoryFilter, type SortId } from "@/data/products";
import { useFilters } from "@/context/FilterContext";

function CardSkeleton() {
  return (
    <div className="rounded-2xl glass p-5 border border-white/5">
      <div className="aspect-square rounded-xl mb-4 skeleton-shimmer" />
      <div className="h-4 w-3/4 rounded skeleton-shimmer mb-2" />
      <div className="h-3 w-1/2 rounded skeleton-shimmer mb-4" />
      <div className="h-9 rounded-lg skeleton-shimmer" />
    </div>
  );
}

export default function ProductGrid() {
  const { query, category, setCategory, sort, setSort } = useFilters();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.desc.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  return (
    <section id="products" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gradient">Launchpad Catalog</h2>
        <p className="text-[color:var(--foreground)]/60 mb-8">Curated gear from the edge of tomorrow.</p>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 glass rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c as CategoryFilter)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-display border transition ${
                  category === c
                    ? "bg-[color:var(--cyan-accent)]/20 border-[color:var(--cyan-accent)] text-[color:var(--cyan-accent)] glow-cyan"
                    : "border-white/10 text-white/70 hover:border-[color:var(--cyan-accent)]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs uppercase tracking-widest font-display text-white/50">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="bg-[color:var(--background)] border border-[color:var(--cyan-accent)]/30 rounded-full px-4 py-2 text-xs font-display uppercase tracking-widest text-white focus:outline-none focus:border-[color:var(--cyan-accent)]"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id} className="bg-[color:var(--background)]">{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center font-display tracking-widest text-lg text-[color:var(--foreground)]/70">
            No products found in this galaxy 🌌
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
