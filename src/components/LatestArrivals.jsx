import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import {useCart} from '../context/CartContext'

export default function LatestArrivalsGridWithModal({ products, theme, sectionIndex = 3 }) {
  const {addToCart} = useCart()
  const [selectedProduct, setSelectedProduct] = useState(null);

  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  return (
    <section
      className="py-16 px-4 sm:px-8 md:px-16 w-full max-w-screen-2xl mx-auto"
      style={{ backgroundColor: bgColor }}
    >
      {/* Modal Overlay */}
      {selectedProduct && <div className="fixed inset-0 bg-black/50 z-40" />}

      {/* Section Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
        >
          Our Latest Arrivals
        </h2>
      </div>

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

              {/* Hover Overlay + Quick Preview */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  className="px-6 py-2 rounded-md text-sm font-medium text-white tracking-wide uppercase transition"
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

            {/* Product Info */}
            <div className="flex flex-col justify-between flex-1 p-4">
              <div>
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
              <div className="flex items-center gap-3 mt-2">
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

              {/* Add to Cart */}
              <button
                type="button"
                className="mt-4 w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                style={{
                  backgroundColor: theme.colors.accent.DEFAULT,
                  color: theme.colors.primary.contrast,
                  fontFamily: theme.fonts.body,
                }}
                onClick={() => addToCart(product)}
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
                <p className="text-sm text-gray-500">Brand: {selectedProduct.brand}</p>
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
                  className="mt-4 w-full py-2 rounded-xl text-sm font-semibold transition duration-300"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.alt,
                  }}
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
