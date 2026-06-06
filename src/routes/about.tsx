import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — OrbitMart" },
      { name: "description", content: "Meet the OrbitMart crew — engineering tomorrow's gear today, shipping to 42 countries with 10K+ happy customers." },
      { property: "og:title", content: "About — OrbitMart" },
      { property: "og:description", content: "Our mission, our crew, our orbit." },
    ],
  }),
  component: AboutPage,
});

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1600;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const stats = [
  { v: 10000, suffix: "+", label: "Customers" },
  { v: 500, suffix: "+", label: "Products" },
  { v: 42, suffix: "", label: "Countries" },
  { v: 4.9, suffix: "★", label: "Rating", decimal: true },
];

const team = [
  { name: "Aria Vance", role: "Founder & CEO", bio: "Ex-aerospace engineer turning launchpads into shopping carts.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Kai Rhodes", role: "Head of Product", bio: "Obsessed with the line between sci-fi and ship-ready.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Nova Patel", role: "Lead Designer", bio: "Designs interfaces that feel like cockpit dashboards.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-6">
        <div className="starfield" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--background)]" />
        <div className="relative text-center z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-black tracking-widest">
            <span className="text-gradient">We Are OrbitMart</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-2xl mx-auto text-white/70">
            Bringing the edge of tomorrow to your doorstep — one capsule at a time.
          </motion.p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-3xl text-gradient mb-6">Our Mission</h2>
        <p className="text-lg text-white/75 leading-relaxed">
          OrbitMart was founded on a simple belief: the gear that defines the future shouldn't take a decade to reach you. We curate, engineer and ship space-grade tech, sci-fi collectibles and tomorrow's daily-carry essentials — directly from the launchpad to your hands. Every product is hand-picked, stress-tested and built to outlast trends.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-gradient text-center mb-12">Our Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center border border-[color:var(--cyan-accent)]/15 hover:glow-cyan transition">
              <div className="font-display text-4xl md:text-5xl font-black text-gradient">
                {s.decimal ? <>{(4.9).toFixed(1)}{s.suffix}</> : <CountUp to={s.v} suffix={s.suffix} />}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-white/60 font-display">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-gradient text-center mb-12">The Crew</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-[color:var(--cyan-accent)]/40 hover:glow-cyan transition">
              <img src={m.img} alt={m.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[color:var(--cyan-accent)]/40" />
              <h3 className="font-display text-lg mt-4">{m.name}</h3>
              <div className="text-xs uppercase tracking-widest text-[color:var(--cyan-accent)] font-display">{m.role}</div>
              <p className="mt-3 text-sm text-white/65">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-gradient mb-4">Join Our Mission</h2>
        <p className="text-white/70 mb-8">Get launch alerts, early access and crew-only drops.</p>
        <Link
          to="/"
          hash="newsletter"
          className="inline-block px-10 py-4 rounded-full font-display tracking-widest text-sm uppercase bg-gradient-to-r from-[color:var(--cyan-accent)] to-[color:var(--violet-accent)] text-black font-bold glow-cyan hover:glow-violet transition"
        >
          Subscribe Now
        </Link>
      </section>
    </div>
  );
}
