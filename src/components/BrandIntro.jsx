import theme from "../context/Theme";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const BrandIntro = ({ sectionIndex = 0 }) => {
   const bgColor =
      sectionIndex % 2 === 0
        ? theme.colors.background.DEFAULT
        : theme.colors.background.alt;
  return (
    <section
      className="text-center py-16 px-6 max-w-4xl mx-auto"
      style={{ background: bgColor }}
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        style={{ color: theme.colors.primary.DEFAULT, fontFamily: theme.fonts.header }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Crafted for Comfort. Designed to Last.
      </motion.h2>
      <motion.p
        className="text-base text-gray-700"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Our furniture blends artisanal craftsmanship with timeless design. Each piece is made from ethically sourced materials and built to last a lifetime — responsibly and beautifully.
      </motion.p>
    </section>
  );
};

export default BrandIntro
