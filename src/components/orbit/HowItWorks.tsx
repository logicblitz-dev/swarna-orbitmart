import { useEffect, useRef } from "react";
import { Search, ShoppingBag, Rocket } from "lucide-react";

const steps = [
  { icon: Search, title: "Browse the Cosmos", desc: "Scan our orbital catalog of next-gen tech and collectibles." },
  { icon: ShoppingBag, title: "Add to Cart", desc: "Load your manifest with everything you need for liftoff." },
  { icon: Rocket, title: "Launch to You", desc: "Express delivery — your package arrives at warp speed." },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-up") ?? [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gradient">How It Works</h2>
        <p className="text-[color:var(--foreground)]/60 mb-14">Three steps from idea to interstellar delivery.</p>
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="fade-up glass rounded-2xl p-8 border border-[color:var(--cyan-accent)]/10" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="text-[color:var(--violet-accent)] font-display text-5xl font-black opacity-30 mb-2">0{i + 1}</div>
              <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-[color:var(--cyan-accent)]/20 to-[color:var(--violet-accent)]/20 mb-4">
                <Icon className="w-7 h-7 text-[color:var(--cyan-accent)]" style={{ animation: "iconGlow 3s ease-in-out infinite" }} />
              </div>
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-sm text-[color:var(--foreground)]/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
