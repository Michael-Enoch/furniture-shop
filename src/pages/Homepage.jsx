import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Aos from "aos";
import "aos/dist/aos.css";
import CategoriesSection from "../components/categoriesSection";
import BestSelling from "../components/bestSellingProducts";
import LatestArrivalsGridWithModal from "../components/LatestOffers";
import theme from "../context/Theme";
import FAQ from "../components/FAQSnippet";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import Newsletter from "../components/NewsLetter";
import InstagramFeed from "../components/InstagramFeed";
import CTASection from "../components/CTA";
import Gallery from "../components/Gallery";
import MiniAboutContact from "../components/MiniAboutContact";
import Features from "../components/Features";
import Brands from "../components/Brands";
import LatestOffersGridWithModal from "../components/LatestOffers";


const Homepage = () => {
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  const BASE_URL = "/products.json";
  const [latestOffers, setLatestOffers] = useState([]);
  const [offers, setOffers] = useState([]);

  // Fetch offers + data together
  useEffect(() => {
    const loadAll = async () => {
      try {
        const offerRes = await axios.get("/limited_offers.json");
        setOffers(offerRes.data);

        const latestRes = await axios.get("/latestArrivals.json");
        setLatestOffers(latestRes.data.offers);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setTimeout(() => {
          Aos.init({ duration: 700, once: true, easing: "ease-out-cubic" });
        }, 1000);
      }
    };

    loadAll();
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, []);

  const fetchFiltersFromProducts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const { products } = response.data;

    if (!products || !Array.isArray(products)) {
      console.warn("No products found in response");
      return;
    }
 const bedroomProducts = products.filter((p) => p.category === "Bedroom");
    const livingRoomProducts = products.filter((p) => p.category === "Living Room");
    const outdoorProducts = products.filter((p) => p.category === "Outdoor");

    const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
    const types = [...new Set(products.map((p) => p.type).filter(Boolean))];
    const materials = [...new Set(products.map((p) => p.material).filter(Boolean))];
    const colors = [...new Set(products.map((p) => p.color).filter(Boolean))];

    console.log("🛏️ Bedroom Products:", bedroomProducts);
    console.log("🛋️ Living Room Products:", livingRoomProducts);
    console.log("🌿 Outdoor Products:", outdoorProducts);
    console.log("📦 Brands:", brands);
    console.log("🪑 Types:", types);
    console.log("🧱 Materials:", materials);
    console.log("🎨 Colors:", colors);
  } catch (error) {
    console.error("❌ Error fetching products.json:", error);
  }
};

  useEffect(() => {
    fetchFiltersFromProducts();
  }, []);

  return (
    <main
      style={{
        background: theme.colors.background.DEFAULT,
        color: theme.colors.text.primary,
        fontFamily: theme.fonts.body,
      }}
    >
      <Hero offers={offers} />
      <Features/>
      <CategoriesSection />
      <Brands/>
      <LatestOffersGridWithModal products={latestOffers} theme={theme} />
      <BestSelling />
      <WhyChooseUs />
      <Gallery />
      <Reviews />
      <MiniAboutContact/>
      <FAQ />
      <Newsletter />
      <InstagramFeed />
      <CTASection />
    </main>
  );
};

export default Homepage;
