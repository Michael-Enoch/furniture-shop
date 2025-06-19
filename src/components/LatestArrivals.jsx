import { useState } from "react";
import { Link } from "react-router-dom";

export default function LatestArrivalsGridWithModal({
  products,
  theme,
  sectionIndex = 2,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  return (
    <section
      className="w-full px-4 sm:px-8 md:px-16 py-14 relative"
      style={{ backgroundColor: bgColor }}
    >
      {/* Modal Background Overlay */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          data-aos="fade-in"
          aria-hidden="true"
        />
      )}

      <div
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight"
          data-aos="zoom-in-down"
          data-aos-delay="100"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
        >
          Our latest arrivals
        </h2>

        <Link
          to="/shop"
          className="px-8 py-3 border font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-lg"
          data-aos="fade-in"
          data-aos-delay="300"
          style={{
            borderColor: theme.colors.accent.DEFAULT,
            color: theme.colors.accent.hover,
            backgroundColor: "transparent",
            fontFamily: theme.fonts.alt,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.accent.DEFAULT;
            e.currentTarget.style.color = theme.colors.primary.contrast;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = theme.colors.accent.hover;
          }} 
        >
          Shop All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group cursor-pointer transition-all duration-500 hover:scale-105"
            onClick={() => setSelectedProduct(product)}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Card Container */}
            <div className="relative rounded-2xl shadow-md overflow-hidden">
              {/* Discount Badge */}
              {product.discount && (
                <div
                  className="absolute top-3 left-3 z-20 text-xs px-3 py-1 rounded-full font-semibold shadow-md"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.alt,
                  }}
                >
                  {product.discount} OFF
                </div>
              )}

              {/* Image */}
              <div
                className="w-full aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 z-10" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              {/* Quick Preview Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                <button
                  className="px-6 py-2 text-[#F8F5F2] text-sm font-medium tracking-wide uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 rounded-md"
                  style={{
                    backgroundColor: theme.colors.accent.DEFAULT,
                    fontFamily: theme.fonts.alt,
                  }}
                >
                  Quick Preview
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center items-start text-left gap-1 mt-4 px-2">
              <h3
                className="text-lg font-medium"
                style={{
                  color: theme.colors.text.primary,
                  fontFamily: theme.fonts.body,
                }}
              >
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {product.category} — {product.type}
              </p>
              <div className="">
                <span
                  className="text-lg font-semibold"
                  style={{ color: theme.colors.primary.DEFAULT }}
                >
                  ${product.price.toFixed(2)}
                </span>
              </div>
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
                <p className="text-sm text-gray-500 leading-relaxed">
                  Brand: {selectedProduct.brand}
                </p>
                <div className="flex justify-between items-center pt-3">
                  <span
                    className="text-xl font-bold"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  >
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    {selectedProduct.discount} OFF
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
