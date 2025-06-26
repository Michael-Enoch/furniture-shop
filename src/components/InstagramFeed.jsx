// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";
import { FaInstagram } from "react-icons/fa";

const posts = [
  {
    src: "https://source.unsplash.com/600x600/?interior,livingroom",
    caption: "Minimalist living space with cozy tones 🌿 #InteriorGoals",
  },
  {
    src: "https://source.unsplash.com/600x600/?bedroom,decor",
    caption: "Dreamy bedroom setup for perfect mornings ☕ #CozyVibes",
  },
  {
    src: "https://source.unsplash.com/600x600/?dining,furniture",
    caption: "Dinner gatherings start here ✨ #DiningInStyle",
  },
  {
    src: "https://source.unsplash.com/600x600/?workspace,office",
    caption: "A workspace that inspires productivity 💻 #WorkFromHome",
  },
  {
    src: "https://source.unsplash.com/600x600/?sofa,lounge",
    caption: "Weekend mood = lounging in comfort 🛋️ #ChillCorner",
  },
  {
    src: "https://source.unsplash.com/600x600/?furniture,decor",
    caption: "Details matter — textures that tell a story 🌾 #DesignDetails",
  },
];


const InstagramFeed = ({ sectionIndex = 11 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  return (
    <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto text-center"
      style={{ background: bgColor }}
    >
      <h2
        className="text-3xl font-bold mb-8"
        style={{
          fontFamily: theme.fonts.header,
          color: theme.colors.primary.DEFAULT,
        }}
      >
        Follow Us On Instagram
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-lg shadow"
          >
            <motion.img
              src={post.src}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div className="flex flex-col items-center text-white gap-2">
                <FaInstagram size={28} />
                <p className="text-xs max-w-[80%]">{post.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
