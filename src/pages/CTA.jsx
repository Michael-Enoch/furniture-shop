// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section
      className="py-20 px-6 w-full max-w-screen-2xl text-center border-b"
      style={{ background: theme.colors.primary.DEFAULT, color: theme.colors.primary.contrast, borderColor: theme.colors.ui.border }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl w-full mx-auto"
      >
        <h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.contrast, }}
        >
          Transform Your Home Today
        </h2>
        <p className="mb-6 text-base">
          Explore curated collections, handcrafted pieces, and timeless comfort with every order.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#A65A2E] hover:bg-[#BF6E3D] text-white py-3 px-6 rounded-lg transition-colors"
        >
          Start Shopping
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;
