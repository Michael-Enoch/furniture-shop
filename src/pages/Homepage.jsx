import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Aos from "aos";
import "aos/dist/aos.css";
import CategoriesSection from "./categoriesSection";
import BestSelling from "./bestSellingProducts";
import Ticker from "../components/ScrollingTicker";
import LatestArrivalsGridWithModal from "./LatestArrivals";
import theme from "../context/Theme";


const Homepage = () => {
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
          Aos.init({ duration: 800, once: true, easing: "ease-in-out",  });
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

      // Log filters
      console.log("Bedroom Brands:", bedroomBrands);
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
    <div>
        <>
          <Hero offers={offers} />
          <CategoriesSection />
          <LatestArrivalsGridWithModal
            products={latestArrivals}
            theme={theme}
          />
          <BestSelling />
        </>
    </div>
  );
};

export default Homepage;
