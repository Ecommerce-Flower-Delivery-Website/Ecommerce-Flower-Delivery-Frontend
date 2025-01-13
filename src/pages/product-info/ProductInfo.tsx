import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { ProductDetails } from "./components/product-details";
import { RelatedProducts } from "./components/related-products";

export default function ProductPage() {
  return (
    <div className="min-h-screen grid bg-white text-black grid-rows-[auto_1fr_auto] border border-black">
      <Header />
      <main className="grid grid-rows-[auto_auto] border-t border-black">
        <ProductDetails />
        <RelatedProducts />
      </main>
      <Footer />
    </div>
  );
}
