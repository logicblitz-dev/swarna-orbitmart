import { ChevronDown } from "lucide-react";
import HeroGlobe from "./HeroGlobe";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="starfield" />
      <div className="absolute inset-0 opacity-70">
        <HeroGlobe />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--background)]" />

      <div className="relative z-10 text-center px-6">
        <h1
          className="font-display text-6xl md:text-8xl font-black tracking-widest"
          style={{ animation: "logoIn 1.2s ease-out both, glowPulse 3s ease-in-out 1.2s infinite" }}
        >
          <span className="text-gradient">ORBITMART</span>
        </h1>
        <div className="mt-6 flex justify-center">
          <p className="typewriter font-body text-lg md:text-2xl text-[color:var(--foreground)]/90">
            The Future, Delivered.
          </p>
        </div>
        <div className="mt-10" style={{ animation: "ctaUp 0.8s ease-out 1.5s both" }}>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-10 py-4 rounded-full font-display tracking-widest text-sm uppercase glass-strong glow-cyan hover:glow-violet transition-all duration-500"
          >
            <span className="text-gradient font-bold">Explore the Catalog</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[color:var(--cyan-accent)]"
        style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
