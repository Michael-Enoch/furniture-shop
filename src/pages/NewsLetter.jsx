// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";

const Newsletter = ({ sectionIndex = 10 }) => {
   const bgColor =
      sectionIndex % 2 === 0
        ? theme.colors.background.DEFAULT
        : theme.colors.background.alt;
  return (
      <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto text-center"
      style={{ background: bgColor, fontFamily: theme.fonts.body }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2
          className="text-3xl font-bold mb-4"
        >
          Join Our Newsletter
        </h2>
        <p className="text-base mb-6 text-gray-700">
          Be the first to know about new arrivals, exclusive offers, and design tips.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="px-4 py-3 w-full max-w-md rounded-lg border border-[#DAD4CE] bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="text-white font-medium px-6 py-3 rounded-lg transition-colors"
            style={{background: theme.colors.primary.DEFAULT}}
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
