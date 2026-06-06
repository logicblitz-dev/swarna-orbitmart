import ProductCard from "./ProductCard";
import type { Product } from "@/context/CartContext";

const products: Product[] = [
  { id: "p1", name: "Nebula Earbuds", desc: "Noise-cancelling with cosmic bass", price: 5000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80" },
  { id: "p2", name: "Astro Smart Watch", desc: "Track time across time zones", price: 2000, rating: 4, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id: "p3", name: "Zero-G Desk Lamp", desc: "Levitating magnetic lamp", price: 500, rating: 5, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" },
  { id: "p4", name: "Pulsar Mechanical Keyboard", desc: "RGB tactile switches", price: 200, rating: 5, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80" },
  { id: "p5", name: "StarMap AR Glasses", desc: "See constellations in real life", price: 3000, rating: 4, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80" },
  { id: "p6", name: "Ion Power Bank", desc: "20000mAh solar charging", price: 500, rating: 4, sale: true, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80" },
  { id: "p7", name: "Lunar Mouse Pad", desc: "XL extended with star chart", price: 300, rating: 5, image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80" },
  { id: "p8", name: "Photon LED Strip Kit", desc: "Reactive ambient lighting", price: 200, rating: 4, image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80" },
];

export default function ProductGrid() {
  return (
    <section id="products" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gradient">Launchpad Catalog</h2>
        <p className="text-[color:var(--foreground)]/60 mb-12">Curated gear from the edge of tomorrow.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
