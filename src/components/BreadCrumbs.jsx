import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);
  const [productName, setProductName] = useState(null);

  // Check if string is a UUID (basic pattern match)
  const isUUID = (str) =>
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      str
    );

  useEffect(() => {
    const fetchProductName = async () => {
      const isProductDetailPage =
        paths.length === 2 && paths[0] === "products" && isUUID(paths[1]);

      if (isProductDetailPage) {
        try {
          const response = await axios.get("/products.json");
          const product = response.data.products.find(
            (p) => p.id === paths[1]
          );

          if (product) {
            setProductName(product.name);
          } else {
            setProductName("Product Details");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setProductName("Product Details");
        }
      } else {
        setProductName(null);
      }
    };

    fetchProductName();
  }, [location.pathname]);

  const routeNames = {
    cart: "Your Cart",
    products: "All Products",
  };

  return (
    <nav className="text-sm text-gray-600 my-4 flex items-center space-x-1">
      {location.pathname !== "/" && (
        <Link
          to="/"
          className="relative inline-block text-gray-400 hover:text-gray-700 transition-colors duration-300 underline-slide"
        >
          Home
        </Link>
      )}

      {paths.map((path, index) => {
        const url = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        const isProductPage =
          paths.length === 2 && paths[0] === "products" && isUUID(paths[1]);

        // Use known route label or capitalize
        let label =
          routeNames[path] || path.charAt(0).toUpperCase() + path.slice(1);

        // Replace product ID with product name
        if (isProductPage && isLast && productName) {
          label = productName;
        }

        // Wait until product name is available before rendering last item
        if (isProductPage && isLast && !productName) return null;

        return (
          <span key={url} className="flex items-center space-x-1 text-gray-400">
            <span className="mx-1 text-gray-400">{">"}</span>
            <Link
              to={url}
              className="relative inline-block text-gray-400 hover:text-gray-700 transition-colors duration-300 underline-slide"
            >
              {label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
