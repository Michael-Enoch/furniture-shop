import { Briefcase, BedDouble, Sofa, UtensilsCrossed, TreePalm } from "lucide-react";
import theme from "../context/Theme";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const ShopByRoom = ({ sectionIndex = 1 }) => {
     const bgColor =
        sectionIndex % 2 === 0
          ? theme.colors.background.DEFAULT
          : theme.colors.background.alt;
  const rooms = [
    { name: "Bedroom", icon: BedDouble, color: theme.colors.category.bedroom },
    { name: "Living Room", icon: Sofa, color: theme.colors.category.living },
    { name: "Dining", icon: UtensilsCrossed, color: theme.colors.category.dining },
    { name: "Office", icon: Briefcase, color: theme.colors.category.office },
    { name: "Outdoor", icon: TreePalm, color: theme.colors.category.outdoor },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 max-w-8xl mx-auto text-center"
    style={{ background: bgColor}}
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: theme.colors.primary.DEFAULT, fontFamily: theme.fonts.header }}
      >
        Shop by Room
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {rooms.map((room, index) => (
          <motion.a
            key={index}
            href={`/category/${room.name.toLowerCase()}`}
            className="rounded-xl p-4 flex flex-col items-center shadow transition-transform hover:scale-105"
            style={{ background: room.color, color: theme.colors.text.onPrimary }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <room.icon size={28} className="mb-2" />
            <span className="font-medium text-sm">{room.name}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ShopByRoom