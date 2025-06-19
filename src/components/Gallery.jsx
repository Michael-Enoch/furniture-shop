// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";
import { useState } from "react";

const images = [
  "/images/lookbook1.jpg",
  "/images/lookbook2.jpg",
  "/images/lookbook3.jpg",
  "/images/lookbook4.jpg"
];

const Gallery = ({ sectionIndex = 5 }) => {
    const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const [selected, setSelected] = useState(null);

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 max-w-8xl mx-auto"
    style={{background: bgColor}}
    >
      <h2
      data-aos="zoom-in-up"
        className="text-3xl font-bold text-center mb-10"
        style={{ color: theme.colors.primary.DEFAULT, fontFamily: theme.fonts.header }}
      >
        Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Furniture ${i + 1}`}
            onClick={() => setSelected(src)}
            className="rounded-xl object-cover w-full h-60 shadow cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </div>

      {selected && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
        >
          <motion.img
            src={selected}
            alt="Selected"
            className="max-h-[80vh] max-w-full rounded-lg shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;

