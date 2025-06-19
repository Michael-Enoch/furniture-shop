// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import theme from "../context/Theme";

const reviews = [
  {
    name: "Sarah M.",
    quote: "The quality is unmatched. My custom sofa is stunning and insanely comfortable!",
    rating: 5
  },
  {
    name: "Daniel O.",
    quote: "Fast shipping and beautiful craftsmanship. I'll be ordering again!",
    rating: 4
  },
  {
    name: "Amaka E.",
    quote: "I'm impressed with the eco-conscious materials. Great customer support too.",
    rating: 5
  }
];

const Reviews = ({ sectionIndex = 6 }) => {
   const bgColor =
      sectionIndex % 2 === 0
        ? theme.colors.background.DEFAULT
        : theme.colors.background.alt;
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 max-w-8xl mx-auto"
    style={{background: bgColor}}
    >
      <h2
        className="text-3xl font-bold text-center mb-10"
        style={{ color: theme.colors.primary.DEFAULT, fontFamily: theme.fonts.header }}
      >
        What Our Customers Say
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white rounded-xl shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-700 italic mb-4">“{r.quote}”</p>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={16}
                  fill={idx < r.rating ? theme.colors.accent.DEFAULT : "none"}
                  color={idx < r.rating ? theme.colors.accent.DEFAULT : theme.colors.ui.border}
                />
              ))}
            </div>
            <h4 className="font-semibold text-sm text-[#A65A2E]">— {r.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
