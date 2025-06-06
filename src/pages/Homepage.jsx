import axios from "axios";

const Homepage = () => {
  const BASE_URL = "/furniture_database_50_products.json";

  // Fetch categories and products
  const fetchCategoriesAndProducts = async () => {
    try {
      const response = await axios.get(BASE_URL);
      const data = response.data;

      const categories = data.categories;
      const products = data.products;

      console.log("Categories:", categories);
      console.log("Products:", products);

      // Example: filter products by category
      const bedroomCategoryId = categories.find(
        (cat) => cat.name === "Bedroom"
      )?.id;
      const bedroomProducts = products.filter(
        (product) => product.categoryId === bedroomCategoryId
      );

      console.log("Bedroom Products:", bedroomProducts);

      return { categories, products };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchCategoriesAndProducts();

  return <div></div>;
};

export default Homepage;
