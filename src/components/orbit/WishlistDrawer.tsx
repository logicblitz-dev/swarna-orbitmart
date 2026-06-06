import { X, Heart, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistDrawer() {
  const { items, isOpen, close, remove } = useWishlist();
  const { add } = useCart();

  return (
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
              <h3 className="font-display tracking-widest text-gradient flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#ff3b8b] fill-[#ff3b8b]" /> WISHLIST
              </h3>
              <button onClick={close} className="p-2 hover:text-[color:var(--cyan-accent)]"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 && (
                <p className="text-center text-[color:var(--foreground)]/50 py-20 font-display tracking-wider text-sm">Your wishlist is empty</p>
              )}
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 glass rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm truncate">{item.name}</div>
                    <div className="text-xs text-[color:var(--cyan-accent)] mb-2">Rs {item.price.toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => add(item)}
                        className="text-[10px] uppercase tracking-widest font-display px-3 py-1.5 rounded-full bg-gradient-to-r from-[color:var(--cyan-accent)]/20 to-[color:var(--violet-accent)]/20 border border-[color:var(--cyan-accent)]/40 hover:from-[color:var(--cyan-accent)]/40 hover:to-[color:var(--violet-accent)]/40 inline-flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" /> Add to Cart
                      </button>
                      <button onClick={() => remove(item.id)} className="ml-auto text-[10px] uppercase text-white/50 hover:text-[#ff3b8b]">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
