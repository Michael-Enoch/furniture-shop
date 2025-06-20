import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import theme from "../context/Theme";

const testimonials = [
  {
    name: "Emily R.",
    text: "Exceptional service and stunning craftsmanship. My home feels brand new."
  },
  {
    name: "Kunle A.",
    text: "Very pleased with the quality and fast delivery. Highly recommended!"
  },
  {
    name: "Laura T.",
    text: "The design consultation made all the difference. I'm obsessed with my new dining set!"
  }
];

const TestimonialsCarousel = ({ sectionIndex = 10 }) => {
   const bgColor =
      sectionIndex % 2 === 0
        ? theme.colors.background.DEFAULT
        : theme.colors.background.alt;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (i) => setIndex(i);

  return (
    <section
      className="py-20 px-6 text-center"
      style={{ background: bgColor }}
    >
      <h2
        className="text-3xl font-bold mb-10"
        style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.DEFAULT }}
      >
        Hear From Our Customers
      </h2>

      <div className="relative max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow"
          >
            <p className="text-base italic text-gray-700 mb-4">“{testimonials[index].text}”</p>
            <h4 className="text-sm font-semibold text-[#A65A2E]">— {testimonials[index].name}</h4>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                i === index ? "bg-[#A65A2E]" : "bg-gray-300"
              }`}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
