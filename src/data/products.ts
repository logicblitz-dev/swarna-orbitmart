export type Category = "Gadgets" | "Wearables" | "Collectibles" | "Accessories";

export type Product = {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  sale?: boolean;
  category: Category;
  variants: string[];
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Nebula Earbuds",
    desc: "Noise-cancelling with cosmic bass",
    longDesc:
      "Engineered for deep space silence. Nebula Earbuds use adaptive ANC and dual-driver bass tuning to deliver studio-grade sound anywhere in the galaxy. Up to 36 hours of playback with the magnetic charging case, and feather-light ergonomic tips that vanish in your ears.",
    price: 5000, rating: 5, reviewCount: 1284, sale: true,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=900&q=80",
    category: "Gadgets",
    variants: ["Black", "Silver", "Cosmic Blue"],
  },
  {
    id: "p2",
    name: "Astro Smart Watch",
    desc: "Track time across time zones",
    longDesc:
      "A precision titanium wearable built to sync with Earth, Mars and lunar time. Always-on AMOLED display, 14-day battery, biometric health array, and a sapphire crystal face engineered to survive re-entry.",
    price: 2000, rating: 4, reviewCount: 842,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
    category: "Wearables",
    variants: ["Graphite", "Lunar White", "Plasma Red"],
  },
  {
    id: "p3",
    name: "Zero-G Desk Lamp",
    desc: "Levitating magnetic lamp",
    longDesc:
      "Defy gravity at your desk. The Zero-G Lamp floats above its magnetic base and rotates silently, casting warm tunable light from 2700K to 6500K. Touch controls, USB-C pass-through, and an aerospace-grade aluminum body.",
    price: 500, rating: 5, reviewCount: 432,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80",
    category: "Accessories",
    variants: ["Matte Black", "Chrome", "Brushed Gold"],
  },
  {
    id: "p4",
    name: "Pulsar Mechanical Keyboard",
    desc: "RGB tactile switches",
    longDesc:
      "Built for hyperspace inputs. Pulsar features hot-swappable mechanical switches, per-key RGB, gasket-mounted aluminum chassis, and a custom orbital keycap profile that feels native under your fingers.",
    price: 200, rating: 5, reviewCount: 967,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80",
    category: "Gadgets",
    variants: ["Tactile", "Linear", "Clicky"],
  },
  {
    id: "p5",
    name: "StarMap AR Glasses",
    desc: "See constellations in real life",
    longDesc:
      "Look up and the universe responds. StarMap AR Glasses overlay real-time constellation data, satellite tracks and planet positions onto the night sky. 8-hour battery, prescription lens ready, and weatherproofed for any campsite.",
    price: 3000, rating: 4, reviewCount: 528,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=900&q=80",
    category: "Wearables",
    variants: ["Onyx", "Nebula", "Solar Flare"],
  },
  {
    id: "p6",
    name: "Ion Power Bank",
    desc: "20000mAh solar charging",
    longDesc:
      "Never go dark. 20,000mAh of high-density lithium plus integrated solar harvesting keeps your gear powered through any expedition. Two USB-C PD ports at 100W each, IP67 dust and water resistance, and a built-in survival lantern.",
    price: 500, rating: 4, reviewCount: 615, sale: true,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=80",
    category: "Accessories",
    variants: ["Black", "Mars Red", "Ice"],
  },
  {
    id: "p7",
    name: "Lunar Mouse Pad",
    desc: "XL extended with star chart",
    longDesc:
      "An extra-large desk surface printed with a high-resolution map of the lunar surface. Stitched edges, micro-textured cloth top for sniper-precision tracking, and a non-slip base that grips like gravity.",
    price: 300, rating: 5, reviewCount: 1840,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80",
    category: "Accessories",
    variants: ["Far Side", "Near Side", "Eclipse"],
  },
  {
    id: "p8",
    name: "Photon LED Strip Kit",
    desc: "Reactive ambient lighting",
    longDesc:
      "Turn any room into a control deck. Photon strips offer 16.7M colors, music reactivity, scene presets and full smart-home integration. Includes 10m of strip, controller, power supply and mounting clips.",
    price: 200, rating: 4, reviewCount: 2310,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=80",
    category: "Gadgets",
    variants: ["RGB", "RGBW", "Pro IC"],
  },
  {
    id: "p9",
    name: "Galactic Helmet Replica",
    desc: "Limited edition collector helmet",
    longDesc:
      "A 1:1 wearable replica of the iconic Galactic Pilot helmet. Hand-finished fiberglass shell, magnetic visor with anti-glare coating, and individually numbered authenticity plate. Strictly limited run.",
    price: 7500, rating: 5, reviewCount: 142,
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=900&q=80",
    category: "Collectibles",
    variants: ["White", "Black", "Battle Worn"],
  },
  {
    id: "p10",
    name: "Mini Rocket Figurine",
    desc: "Die-cast 1:48 scale rocket",
    longDesc:
      "A meticulously detailed die-cast rocket figurine on a magnetic launch pad base. Removable stage modules, real metal finish, and a clear acrylic display dome included.",
    price: 800, rating: 5, reviewCount: 376,
    image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?w=900&q=80",
    category: "Collectibles",
    variants: ["Standard", "Heavy Lift", "Crewed"],
  },
  {
    id: "p11",
    name: "Quantum VR Headset",
    desc: "8K per-eye immersion",
    longDesc:
      "Step inside any world. Quantum VR delivers 8K per-eye micro-OLED, 120Hz refresh, inside-out tracking and pancake optics in a 280g chassis. PC and standalone compatible.",
    price: 4500, rating: 5, reviewCount: 489,
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=900&q=80",
    category: "Wearables",
    variants: ["Standard", "Pro", "Enterprise"],
  },
  {
    id: "p12",
    name: "Orbit Backpack",
    desc: "Anti-theft modular pack",
    longDesc:
      "A futurist's daily carry. Cut-proof composite shell, RFID-blocking pockets, modular interior, and a TSA lay-flat laptop compartment. Reflective accents and integrated USB charging port.",
    price: 1200, rating: 4, reviewCount: 728,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
    category: "Accessories",
    variants: ["Black", "Carbon", "Stealth Grey"],
  },
];

export const categories = ["All", "Gadgets", "Wearables", "Collectibles", "Accessories"] as const;
export type CategoryFilter = (typeof categories)[number];

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
] as const;
export type SortId = (typeof sortOptions)[number]["id"];
