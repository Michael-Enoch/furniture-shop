import axios from "axios";
import { useEffect } from "react";
import Hero from "../components/Hero";
import LatestArrivalsGridWithModal from "./LatestArrivals";
import latestArrivals from "../../public/latestArrivals.json";
import theme from "../context/Theme";

const Homepage = () => {
  const BASE_URL = "/furniture_database_50_products.json";

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
      <Hero />
      <LatestArrivalsGridWithModal products={latestArrivals} theme={theme}/>
    </div>
  )
};

export default Homepage;
