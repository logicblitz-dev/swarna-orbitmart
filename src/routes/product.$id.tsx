import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/orbit/ProductCard";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — OrbitMart` : "Product — OrbitMart" },
        { name: "description", content: p?.longDesc.slice(0, 150) ?? "Discover futuristic gear at OrbitMart." },
        { property: "og:title", content: p ? `${p.name} — OrbitMart` : "Product — OrbitMart" },
        { property: "og:description", content: p?.desc ?? "" },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center pt-24 text-center">
      <div>
        <p className="font-display text-2xl text-gradient mb-3">Product not found</p>
        <Link to="/" className="text-[color:var(--cyan-accent)] underline">Back to Store</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const liked = has(product.id);
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [bounce, setBounce] = useState(false);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    add(product, qty);
    setBounce(true);
    setTimeout(() => setBounce(false), 450);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative">
      <div className="starfield opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-display tracking-widest text-[color:var(--cyan-accent)] hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden glass border border-[color:var(--cyan-accent)]/20 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--cyan-accent)]/10 to-[color:var(--violet-accent)]/10" />
            <img src={product.image} alt={product.name} className="relative w-full h-full object-cover" />
            {product.sale && (
              <div className="absolute top-5 right-5 [perspective:400px]">
                <div className="sale-badge w-16 h-16 rounded-full flex items-center justify-center font-display font-black text-xs bg-gradient-to-br from-[color:var(--violet-accent)] to-[color:var(--cyan-accent)] text-white shadow-[0_0_25px_rgba(157,0,255,0.7)]">SALE</div>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[color:var(--cyan-accent)] font-display mb-2">{product.category}</div>
              <h1 className="font-display text-4xl md:text-5xl font-black text-gradient">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-[color:var(--cyan-accent)] text-[color:var(--cyan-accent)]" : "text-white/20"}`} />
                  ))}
                </div>
                <span className="text-xs text-white/60">{product.rating.toFixed(1)} · {product.reviewCount.toLocaleString()} reviews</span>
              </div>
            </div>

            <p className="text-white/75 leading-relaxed">{product.longDesc}</p>

            <div className="font-display text-3xl text-[color:var(--cyan-accent)]">Rs {product.price.toLocaleString()}</div>

            <div>
              <div className="text-xs uppercase tracking-widest text-white/60 font-display mb-2">Color: {variant}</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-widest border transition ${
                      variant === v
                        ? "bg-[color:var(--cyan-accent)]/20 border-[color:var(--cyan-accent)] text-[color:var(--cyan-accent)] glow-cyan"
                        : "border-white/15 text-white/70 hover:border-[color:var(--cyan-accent)]/50"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs uppercase tracking-widest text-white/60 font-display">Qty</div>
              <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center hover:glow-cyan"><Minus className="w-3 h-3" /></button>
                <span className="w-8 text-center font-display">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:glow-cyan"><Plus className="w-3 h-3" /></button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <motion.button
                onClick={handleAdd}
                animate={bounce ? { scale: [1, 0.92, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.45 }}
                className="px-8 py-3 rounded-full font-display tracking-widest text-sm uppercase bg-gradient-to-r from-[color:var(--cyan-accent)] to-[color:var(--violet-accent)] text-black font-bold glow-cyan hover:glow-violet transition"
              >
                Add to Cart
              </motion.button>
              <button
                onClick={() => toggle(product)}
                className={`px-5 py-3 rounded-full font-display tracking-widest text-sm uppercase glass border ${
                  liked ? "border-[#ff3b8b] text-[#ff3b8b]" : "border-white/15 text-white/80 hover:border-[color:var(--cyan-accent)]/50"
                } inline-flex items-center gap-2`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-[#ff3b8b]" : ""}`} />
                {liked ? "Saved" : "Wishlist"}
              </button>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-gradient">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
