import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-[color:var(--cyan-accent)]/30" style={{ boxShadow: "0 -1px 20px rgba(0,245,255,0.3)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 items-center">
        <div className="font-display text-2xl tracking-widest text-gradient">ORBITMART</div>
        <ul className="flex justify-center gap-8 text-xs uppercase tracking-widest text-[color:var(--foreground)]/70">
          <li><a href="#hero" className="hover:text-[color:var(--cyan-accent)] transition">Home</a></li>
          <li><a href="#products" className="hover:text-[color:var(--cyan-accent)] transition">Products</a></li>
          <li><a href="#about" className="hover:text-[color:var(--cyan-accent)] transition">About</a></li>
        </ul>
        <div className="flex md:justify-end gap-4">
          {[Twitter, Instagram, Github].map((Icon, i) => (
            <a key={i} href="#" aria-label="social" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-cyan transition">
              <Icon className="w-4 h-4 text-[color:var(--cyan-accent)]" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-[color:var(--foreground)]/50">
        © 2026 OrbitMart. All rights reserved.
      </div>
    </footer>
  );
}
