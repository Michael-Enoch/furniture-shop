import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import theme from "../context/Theme";

export default function CategoriesSection({ sectionIndex = 0 }) {
  const [categories, setCategories] = useState([]);
  const BASE_URL = "/categories.json";
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BASE_URL);
        const data = response.data;
        setCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section
      className="w-full px-4 sm:px-8 md:px-16 py-14 relative"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="text-center mb-16 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
        >
          Featured Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {categories.map((category, index) => (
          <div
            className="group cursor-pointer transition-all duration-500 hover:scale-[1.03]"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative rounded-2xl shadow-md overflow-hidden">
              {/* Image */}
              <div
                className="w-full aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  
                }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(58, 47, 42, 0.4)", zIndex: 20 }}
              />
              {/* Name */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <p
                  className="text-xl font-semibold uppercase tracking-wide text-center"
                  style={{
                    fontFamily: theme.fonts.alt,
                    color: theme.colors.text.onPrimary,
                  }}
                >
                  {category.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
