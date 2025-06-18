import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import theme from "../context/Theme";

const StarRating = ({ rating = 0, max = 5 }) => {
  return (
    <div aria-label={`Rating: ${rating} out of ${max}`} role="img">
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= rating;
        return (
          <Star
            key={i}
            size={16}
            strokeWidth={1.5}
            className="inline-block mr-0.5"
            color={
              filled ? theme.colors.accent.DEFAULT : theme.colors.ui.border
            }
            fill={filled ? theme.colors.accent.DEFAULT : "none"}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};

const BestSelling = ({ sectionIndex = 2 }) => {
  const [products, setProducts] = useState([]);
  const BASE_URL = "/products.json";
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts = products.filter(
    (product) => product.price > 3000 && product.price < 5000
  );

  return (
    <section
      className="w-full px-4 sm:px-8 md:px-16 py-14"
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
        >
          Best Selling Products
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {filteredProducts.slice(0, 4).map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg shadow-md duration-300 ease transition overflow-hidden relative group"
           data-aos="zoom-in"
            data-aos-delay={index * 100}
            style={{
              backgroundColor: theme.colors.ui.base,
              borderColor: theme.colors.ui.border,
            }}
          >
            <Link to={`/product/${product.id}`} className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 " />
            </Link>
            <div className="absolute inset-0 flex flex-col items-end p-3 space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                className="p-2 rounded-md shadow-lg pointer-events-auto"
                style={{
                  background: theme.colors.accent.DEFAULT,
                  color: theme.colors.primary.contrast,
                }}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 rounded-md shadow-lg pointer-events-auto"
                style={{
                  background: theme.colors.accent.DEFAULT,
                  color: theme.colors.primary.contrast,
                }}
                aria-label={`Add ${product.name} to wishlist`}
              >
                <Heart className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col flex-1 justify-between p-6">
              <div>
                <h3
                  className="text-md font-semibold leading-tight line-clamp-2"
                  style={{
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-base mt-1 mb-1 capitalize"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {product.brand || "Unbranded"}
                </p>
                <StarRating rating={product.rating || 4} />
              </div>

              <div
                className="mt-4 text-sm space-y-1"
                style={{ color: theme.colors.text.primary }}
              >
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    Category:
                  </span>{" "}
                  {product.category}
                </p>
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    Type:
                  </span>{" "}
                  {product.type}
                </p>
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    Price:
                  </span>{" "}
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
