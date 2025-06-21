// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";

const posts = [
  "/images/ig1.jpg",
  "/images/ig2.jpg",
  "/images/ig3.jpg",
  "/images/ig4.jpg",
  "/images/ig5.jpg",
  "/images/ig6.jpg"
];

const InstagramFeed = ({ sectionIndex = 11 }) => {
   const bgColor =
      sectionIndex % 2 === 0
        ? theme.colors.background.DEFAULT
        : theme.colors.background.alt;
  return (
    <section
      className="py-16 px-4 sm:px-8 md:px-16 w-full max-w-screen-2xl mx-auto text-center"
      style={{ background: bgColor }}
    >
      <h2
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.DEFAULT }}
      >
        Follow Us On Instagram
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Instagram post ${i + 1}`}
            className="w-full h-32 sm:h-40 object-cover rounded-lg shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
