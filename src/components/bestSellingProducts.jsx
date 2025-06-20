import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Star } from "lucide-react";
import theme from "../context/Theme";

const StarRating = ({ rating = 0, max = 5 }) => (
  <div aria-label={`Rating: ${rating} out of ${max}`} role="img">
    {Array.from({ length: max }, (_, i) => {
      const filled = i + 1 <= rating;
      return (
        <Star
          key={i}
          size={16}
          strokeWidth={1.5}
          className="inline-block mr-0.5"
          color={filled ? theme.colors.accent.DEFAULT : theme.colors.ui.border}
          fill={filled ? theme.colors.accent.DEFAULT : "none"}
          aria-hidden="true"
        />
      );
    })}
  </div>
);

const BestSelling = ({ sectionIndex = 4 }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      className="py-16 px-4 sm:px-8 md:px-16 w-full max-w-screen-2xl mx-auto"
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight"
          data-aos="zoom-out-up"
          data-aos-delay="100"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
        >
          Best Selling Products
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.slice(0, 4).map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg shadow-lg duration-300 ease transition overflow-hidden relative group"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            style={{
              backgroundColor: theme.colors.ui.base,
              borderColor: theme.colors.ui.border,
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="px-6 py-2 rounded-md text-sm font-medium text-white tracking-wide uppercase"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    fontFamily: theme.fonts.alt,
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  Quick Preview
                </button>
              </div>
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
                className="mt-1 text-sm space-y-1"
                style={{ color: theme.colors.text.primary }}
              >
                <p>
                  <span
                    className="font-semibold"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    Price:
                  </span>{" "}
                  ${product.price.toFixed(2)}
                </p>
                <button
                  type="button"
                  className="mt-4 w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.body,
                  }}
                  onClick={() => console.log(`Added ${product.name} to cart`)}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full relative"
            data-aos="zoom-in"
            style={{
              fontFamily: theme.fonts.body,
              color: theme.colors.text.primary,
            }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500 transition"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full md:w-1/2 rounded-xl object-cover h-60"
              />
              <div className="flex-1 space-y-3">
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: theme.fonts.header }}
                >
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedProduct.category} — {selectedProduct.type}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Brand: {selectedProduct.brand || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedProduct.description || "No description available."}
                </p>

                <div className="flex items-center gap-3 pt-3">
                  {selectedProduct.originalPrice &&
                    selectedProduct.originalPrice > selectedProduct.price && (
                      <span
                        className="text-sm line-through"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  <span
                    className="text-xl font-bold"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  >
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                </div>

                <button
                  className="mt-4 w-full py-2 rounded-xl text-sm font-semibold transition duration-300"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.alt,
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BestSelling;
