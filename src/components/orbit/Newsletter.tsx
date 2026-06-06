import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center glass-strong rounded-3xl p-12 border border-[color:var(--cyan-accent)]/20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[color:var(--violet-accent)]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[color:var(--cyan-accent)]/20 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-3 text-gradient">Join the Orbit</h2>
          <p className="text-[color:var(--foreground)]/70 mb-8">Get launch alerts and exclusive deals.</p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="commander@galaxy.io"
              className="flex-1 px-5 py-3 rounded-full bg-black/50 border border-[color:var(--cyan-accent)]/30 focus:border-[color:var(--cyan-accent)] focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="group relative px-8 py-3 rounded-full font-display text-sm uppercase tracking-widest bg-gradient-to-r from-[color:var(--cyan-accent)] to-[color:var(--violet-accent)] text-black font-bold hover:scale-105 transition glow-cyan"
            >
              Subscribe
              {Array.from({ length: 6 }).map((_, i) => {
                const tx = (Math.random() * 60 - 30).toFixed(0);
                const ty = (Math.random() * -50 - 10).toFixed(0);
                return (
                  <span
                    key={i}
                    className="pointer-events-none absolute w-1 h-1 rounded-full bg-[color:var(--cyan-accent)] opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: "50%",
                      ["--tx" as string]: `${tx}px`,
                      ["--ty" as string]: `${ty}px`,
                      animation: `sparkle 1.2s ease-out ${i * 0.15}s infinite`,
                    }}
                  />
                );
              })}
            </button>
          </form>
          {sent && (
            <p className="mt-5 text-[color:var(--cyan-accent)] font-display tracking-wider animate-pulse">
              You're in orbit! 🚀
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
