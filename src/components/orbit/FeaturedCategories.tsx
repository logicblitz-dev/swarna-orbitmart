import { Rocket, Watch, Gamepad2, Atom } from "lucide-react";

const cats = [
  { icon: Rocket, name: "Space Gadgets", count: 24 },
  { icon: Watch, name: "Smart Wearables", count: 18 },
  { icon: Gamepad2, name: "Retro Sci-Fi Collectibles", count: 12 },
  { icon: Atom, name: "Quantum Accessories", count: 9 },
];

export default function FeaturedCategories() {
  return (
    <section id="categories" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 text-gradient">Featured Categories</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {cats.map(({ icon: Icon, name, count }) => (
            <div
              key={name}
              className="snap-start shrink-0 w-64 md:w-72 p-6 rounded-2xl glass hover:glow-cyan transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-[color:var(--cyan-accent)]/10 hover:border-[color:var(--cyan-accent)]/60"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-[color:var(--cyan-accent)]/20 to-[color:var(--violet-accent)]/20 mb-4 group-hover:scale-110 transition">
                <Icon className="w-7 h-7 text-[color:var(--cyan-accent)]" style={{ animation: "iconGlow 3s ease-in-out infinite" }} />
              </div>
              <h3 className="font-display text-lg mb-1">{name}</h3>
              <p className="text-sm text-[color:var(--foreground)]/60">{count} items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
