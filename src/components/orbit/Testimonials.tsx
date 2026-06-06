import { Star } from "lucide-react";

const reviews = [
  { name: "Aria Chen", quote: "The Nebula Earbuds are absurdly good. It's like the future jumped into my ears." },
  { name: "Kai Patel", quote: "Astro Smart Watch is a daily flex. Build quality feels years ahead of anything else." },
  { name: "Lena Voss", quote: "Orbit fast shipping, packaging looked like a NASA mission. 11/10 experience." },
  { name: "Mateo Reyes", quote: "Bought the AR Glasses on a whim — now I can't sleep without star-gazing first." },
  { name: "Sora Kim", quote: "Zero-G lamp is pure magic. Guests literally gasp when they walk in." },
  { name: "Dax Müller", quote: "OrbitMart is the only tech store I trust for genuine sci-fi vibes." },
];

function Card({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="shrink-0 w-80 mx-3 glass rounded-2xl p-6 border border-[color:var(--cyan-accent)]/15">
      <div className="flex items-center gap-3 mb-4">
        <img src={`https://picsum.photos/seed/${encodeURIComponent(name)}/60/60`} alt={name} className="w-12 h-12 rounded-full border border-[color:var(--cyan-accent)]/40" />
        <div>
          <div className="font-display text-sm">{name}</div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[color:var(--cyan-accent)] text-[color:var(--cyan-accent)]" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-[color:var(--foreground)]/80 leading-relaxed">"{quote}"</p>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient">From Across the Galaxy</h2>
        <p className="text-[color:var(--foreground)]/60 mt-2">Real signals from real customers.</p>
      </div>
      <div className="relative">
        <div className="flex scroll-track w-max">
          {loop.map((r, i) => <Card key={i} {...r} />)}
        </div>
      </div>
    </section>
  );
}
