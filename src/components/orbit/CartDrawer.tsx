import { useState } from "react";
import { X, Plus, Minus, Trash2, Rocket } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, clear } = useCart();
  const [success, setSuccess] = useState(false);

  const checkout = () => {
    if (!items.length) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      clear();
      close();
    }, 3500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] glass-strong border-l border-[color:var(--cyan-accent)]/30 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h3 className="font-display tracking-widest text-gradient">YOUR ORBIT</h3>
                <button onClick={close} className="p-2 hover:text-[color:var(--cyan-accent)]"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 && (
                  <p className="text-center text-[color:var(--foreground)]/50 py-20 font-display tracking-wider text-sm">Your cart is empty</p>
                )}
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 glass rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm truncate">{item.name}</div>
                      <div className="text-xs text-[color:var(--cyan-accent)] mb-2">Rs {item.price.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(item.id, item.quantity - 1)} className="w-7 h-7 rounded glass flex items-center justify-center hover:glow-cyan"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => setQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded glass flex items-center justify-center hover:glow-cyan"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => remove(item.id)} className="ml-auto p-1 text-[color:var(--foreground)]/50 hover:text-[color:var(--violet-accent)]"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-white/10">
                <div className="flex justify-between mb-4">
                  <span className="font-display text-sm tracking-widest">SUBTOTAL</span>
                  <span className="font-display text-lg text-[color:var(--cyan-accent)]">Rs {subtotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={!items.length}
                  className="w-full py-3 rounded-full font-display tracking-widest text-sm uppercase bg-gradient-to-r from-[color:var(--cyan-accent)] to-[color:var(--violet-accent)] text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition glow-cyan"
                >
                  Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[color:var(--background)]/95 backdrop-blur-lg flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="starfield opacity-50" />
            <Rocket
              className="absolute left-1/2 -translate-x-1/2 w-16 h-16 text-[color:var(--cyan-accent)]"
              style={{ animation: "rocketRise 3s ease-out forwards", filter: "drop-shadow(0 0 30px #00F5FF)" }}
            />
            <div className="relative text-center px-6" style={{ animation: "successZoom 0.8s ease-out both" }}>
              <h2 className="font-display text-5xl md:text-6xl font-black text-gradient mb-4">ORBITMART</h2>
              <p className="font-display text-xl tracking-widest">Order Placed!</p>
              <p className="mt-2 text-[color:var(--foreground)]/80">Your package is launching soon 🚀</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
