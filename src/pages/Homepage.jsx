import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Aos from "aos";
import "aos/dist/aos.css";
import CategoriesSection from "../components/categoriesSection";
import BestSelling from "../components/bestSellingProducts";
import LatestArrivalsGridWithModal from "../components/LatestArrivals";
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


const Homepage = () => {
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  const BASE_URL = "/furniture_database_50_products.json";
  const [latestArrivals, setLatestArrivals] = useState([]);
  const [offers, setOffers] = useState([]);

  // Fetch offers + data together
  useEffect(() => {
    const loadAll = async () => {
      try {
        const offerRes = await axios.get("/limited_offers.json");
        setOffers(offerRes.data);

        const latestRes = await axios.get("/latestArrivals.json");
        setLatestArrivals(latestRes.data);
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

  const fetchCategoriesAndProducts = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const data = response.data;

      const categories = data.categories;
      const products = data.products;

      // Get Bedroom category ID
      const bedroomCategoryId = categories.find(
        (cat) => cat.name === "Bedroom"
      )?.id;

      // Filter Bedroom products
      const bedroomProducts = products.filter(
        (product) => product.categoryId === bedroomCategoryId
      );

      console.log("Bedroom Products:", bedroomProducts);

      const LivingRoomCategoryId = categories.find(
        (cat) => cat.name === "Living Room"
      )?.id;

      // Filter Bedroom products
      const LivingRoomProducts = products.filter(
        (product) => product.categoryId === LivingRoomCategoryId
      );

      console.log("LivingRoom Products:", LivingRoomProducts);


      // Extract unique filters
      const bedroomBrands = [...new Set(bedroomProducts.map((p) => p.brand))];
      const bedroomTypes = [...new Set(bedroomProducts.map((p) => p.type))];
      const bedroomColors = [...new Set(bedroomProducts.map((p) => p.color))];
      const bedroomSizes = [...new Set(bedroomProducts.map((p) => p.size))];
      const bedroomMaterials = [
        ...new Set(bedroomProducts.map((p) => p.material)),
      ];
      const bedroomMaterialTypes = [
        ...new Set(bedroomProducts.map((p) => p.materialType)),
      ];
      const livingroomBrands = [...new Set(LivingRoomProducts.map((p) => p.brand))];

      // Log filters
      console.log("Bedroom Brands:", bedroomBrands);
      console.log("LivingRoom Brands:", livingroomBrands);
      console.log("Bedroom Types:", bedroomTypes);
      console.log("Bedroom Colors:", bedroomColors);
      console.log("Bedroom Sizes:", bedroomSizes);
      console.log("Bedroom Materials:", bedroomMaterials);
      console.log("Bedroom Material Types:", bedroomMaterialTypes);
      console.log("Categories:", categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
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
      <LatestArrivalsGridWithModal products={latestArrivals} theme={theme} />
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
