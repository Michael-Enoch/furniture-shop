import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaArrowRight } from "react-icons/fa";

export default function LatestOffersGridWithModal({
  products,
  theme,
  sectionIndex = 3,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error("⚠️ You need to sign in to add items to your cart.", {
        position: "top-right",
        style: {
          backgroundColor: "#3A2F2A",
          color: "#F8F5F2",
          border: "1px solid #A65A2E",
          padding: "14px",
          fontSize: "13px",
          borderRadius: "8px",
        },
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    addToCart(product);

    toast.success(`✅ Added to cart!`, {
      position: "bottom-center",
      style: {
        backgroundColor: "#3A2F2A",
        color: "#F8F5F2",
        border: "1px solid #A65A2E",
        padding: "14px",
        fontSize: "13px",
        borderRadius: "8px",
      },
      iconTheme: {
        primary: "#A65A2E",
        secondary: "#F8F5F2",
      },
      duration: 3000,
      description: "View your cart to checkout.",
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  return (
    <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto"
      style={{ backgroundColor: bgColor }}
    >
      {/* Modal Overlay */}
      {selectedProduct && <div className="fixed inset-0 bg-black/50 z-40" />}

      {/* Section Header */}
      <h2
        className="text-center text-3xl font-semibold mb-6"
        data-aos="fade-up"
        data-aos-delay="100"
        style={{
          color: theme.colors.text.primary,
          fontFamily: theme.fonts.header,
        }}
      >
        Our Latest Offers
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden relative group transition-transform duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: theme.colors.ui.base }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Product Image + Discount Badge */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <div className="absolute top-2 right-2 z-20">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition"
                  aria-label="Toggle Wishlist"
                >
                  <Heart
                    size={18}
                    className={`transition-all duration-300 ${
                      isWishlisted(product.id) ? "scale-110" : "scale-100"
                    } text-[#BF6E3D]`}
                    fill={isWishlisted(product.id) ? "#BF6E3D" : "none"}
                  />
                </button>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {product.discount && (
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold z-30 shadow"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.alt,
                  }}
                >
                  {product.discount} OFF
                </div>
              )}

              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="px-6 py-2 rounded-md text-sm font-medium text-white tracking-wide uppercase transition"
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    fontFamily: theme.fonts.alt,
                  }}
                >
                  Quick Preview
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between flex-1 p-4">
              <div className="w-full">
                <h3
                  className="text-md font-semibold mb-1 line-clamp-2"
                  style={{
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-sm mb-2 capitalize"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {product.category} — {product.type}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-2 mb-3">
                {product.originalPrice > product.price && (
                  <span
                    className="text-sm line-through"
                    style={{ color: theme.colors.text.primary }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span
                  className="text-lg font-semibold"
                  style={{ color: theme.colors.accent.DEFAULT }}
                >
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div
                onClick={() => setSelectedProduct(product)}
                className="font-medium w-full cursor-pointer flex items-center flex-row gap-2"
              >
                <p
                  className="font-medium underline"
                  style={{ color: theme.colors.accent.DEFAULT }}
                >
                  Learn more
                </p>
                <FaArrowRight size={10} />
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                className="mt-4 w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                style={{
                  backgroundColor: theme.colors.accent.DEFAULT,
                  color: theme.colors.primary.contrast,
                  fontFamily: theme.fonts.body,
                }}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              className="absolute -top-1 right-1 text-3xl text-gray-400 hover:text-[#BF6E3D] transition"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full md:w-1/2 rounded-xl object-cover h-auto"
              />
              <div className="flex-1 flex flex-col px-1 space-y-3">
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: theme.fonts.header }}
                >
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedProduct.category} — {selectedProduct.type}
                </p>
                <p className="text-sm text-gray-500">
                  Brand: {selectedProduct.brand}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedProduct.description || "No description available."}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  {selectedProduct.originalPrice &&
                    selectedProduct.originalPrice > selectedProduct.price && (
                      <span
                        className="text-sm line-through"
                        style={{ color: theme.colors.text.primary }}
                      >
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  <span
                    className="text-xl font-bold"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                </div>
                <button
                  className="mt-4 w-full py-2 rounded text-sm font-semibold transition duration-300"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.alt,
                  }}
                  onClick={() => handleAddToCart(selectedProduct)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      theme.colors.accent.hover)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      theme.colors.accent.DEFAULT)
                  }
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
}
