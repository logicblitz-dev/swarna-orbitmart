import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[color:var(--cyan-accent)] to-[color:var(--violet-accent)]"
        style={{ width: `${pct}%`, boxShadow: "0 0 10px #00F5FF, 0 0 18px #9D00FF" }}
      />
    </div>
  );
}
