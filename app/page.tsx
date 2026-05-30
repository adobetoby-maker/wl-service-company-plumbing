import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import HeroSpatial from "@/components/HeroSpatial";
import ServicesNew from "@/components/ServicesNew";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import AffiliateProducts from "@/components/AffiliateProducts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <PromoBanner />
      <main>
        <HeroSpatial />
        <ServicesNew />
        <About />
        <Reviews />
        <AffiliateProducts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
