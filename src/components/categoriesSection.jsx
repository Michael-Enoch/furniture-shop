import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import theme from "../context/Theme";

export default function CategoriesSection({ sectionIndex = 1 }) {
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
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section
      id="category"
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto"
      style={{ backgroundColor: bgColor }}
    >

        <h2 className="text-center text-3xl font-semibold mb-6"
data-aos="fade-up"
        data-aos-delay="100"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
        >
          Featured Categories
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={category.name || index}
            className="group transition-transform duration-500 hover:scale-100 sm:hover:scale-[1.03] cursor-pointer"
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
                  className="text-lg sm:text-xl font-semibold uppercase tracking-wide text-center px-2"
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
