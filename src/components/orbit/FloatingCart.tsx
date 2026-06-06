import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { count, open, isOpen } = useCart();
  const [shown, setShown] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 900);
    return () => clearTimeout(t);
  }, [count]);

  const visible = shown && !isOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 200 }}
          onClick={open}
          aria-label="Open cart"
          className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[color:var(--cyan-accent)] to-[color:var(--violet-accent)] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.55)] ${pulse ? "fab-pulse" : ""}`}
        >
          <ShoppingCart className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full text-[11px] font-bold flex items-center justify-center bg-[color:var(--background)] text-[color:var(--cyan-accent)] border border-[color:var(--cyan-accent)]">
              {count}
            </span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
