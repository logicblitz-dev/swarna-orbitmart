import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/orbit/Hero";
import FeaturedCategories from "@/components/orbit/FeaturedCategories";
import ProductGrid from "@/components/orbit/ProductGrid";
import HowItWorks from "@/components/orbit/HowItWorks";
import Testimonials from "@/components/orbit/Testimonials";
import Newsletter from "@/components/orbit/Newsletter";
import Footer from "@/components/orbit/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrbitMart — The Future, Delivered." },
      { name: "description", content: "OrbitMart: futuristic space-tech, sci-fi collectibles, and quantum-grade gadgets. The future, delivered." },
      { property: "og:title", content: "OrbitMart — The Future, Delivered." },
      { property: "og:description", content: "Cutting-edge consumer electronics and sci-fi collectibles from across the galaxy." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <ProductGrid />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
