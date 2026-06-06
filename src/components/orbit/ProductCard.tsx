import { useRef, useState, type MouseEvent } from "react";
import { Star } from "lucide-react";
import { useCart, type Product } from "@/context/CartContext";

function isTouch() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
}

export default function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const { add } = useCart();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 12, ry: px * 14 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 700);
    add(product);
  };

  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="product-card relative rounded-2xl glass p-5 hover:glow-cyan border border-[color:var(--cyan-accent)]/10 hover:border-[color:var(--cyan-accent)]/50"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div className="holo-shimmer rounded-2xl" />
        <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[color:var(--cyan-accent)]/15 to-[color:var(--violet-accent)]/15">
          {product.sale && (
            <div className="absolute top-3 right-3 z-10 [perspective:400px]">
              <div className="sale-badge w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-[10px] bg-gradient-to-br from-[color:var(--violet-accent)] to-[color:var(--cyan-accent)] text-white shadow-[0_0_20px_rgba(157,0,255,0.7)]">
                SALE
              </div>
            </div>
          )}
          <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90" loading="lazy" />
        </div>
        <h3 className="font-display text-base mb-1">{product.name}</h3>
        <p className="text-xs text-[color:var(--foreground)]/60 mb-3 line-clamp-1">{product.desc}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-lg text-[color:var(--cyan-accent)]">Rs {product.price.toLocaleString()}</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "fill-[color:var(--cyan-accent)] text-[color:var(--cyan-accent)]" : "text-white/20"}`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={onAdd}
          className="relative w-full overflow-hidden py-2.5 rounded-lg font-display text-xs uppercase tracking-widest bg-gradient-to-r from-[color:var(--cyan-accent)]/20 to-[color:var(--violet-accent)]/20 border border-[color:var(--cyan-accent)]/40 hover:from-[color:var(--cyan-accent)]/40 hover:to-[color:var(--violet-accent)]/40 transition"
        >
          Add to Cart
          {ripples.map((r) => (
            <span
              key={r.id}
              className="ripple-dot"
              style={{ left: r.x, top: r.y, width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
            />
          ))}
        </button>
      </div>
    </div>
  );
}
