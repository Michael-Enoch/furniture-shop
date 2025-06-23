import theme from "../context/Theme";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export const AboutUsSections = ({ valuesData }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerGrid = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="w-full h-[500px] sm:h-[600px] flex items-center justify-center"
        style={{
          backgroundColor: theme.colors.primary.DEFAULT,
          fontFamily: theme.fonts.body,
        }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1920')",
          }}
          aria-label="Furniture workshop background"
        >
          <div className="bg-black/80 w-full h-full flex flex-col items-center  justify-center text-white px-4 sm:px-8 md:px-16 lg:px-8 py-10 md:py-16 text-center md:text-left space-y-6">
            <motion.h4
              className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-wide"
              style={{ fontFamily: theme.fonts.header }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Where Style Meets Comfort
            </motion.h4>
            <motion.div
              className="w-32 h-1 mx-auto my-6"
              style={{ backgroundColor: theme.colors.accent.DEFAULT }}
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.div>
            <motion.p
              className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto"
              style={{ fontFamily: theme.fonts.alt }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Thoughtful design
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center gap-x-8 gap-y-8 w-full">
          {/* Left Image Box */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full md:w-1/2 min-w-0 min-h-[400px] md:min-h-[500px] h-auto relative rounded-2xl shadow-lg overflow-hidden"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000')",
              }}
              aria-label="Our workshop in Brooklyn"
            />
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-white">
              <p className="text-sm opacity-80 whitespace-nowrap">
                Our workshop in Brooklyn, NY
              </p>
            </div>
          </motion.div>

          {/* Right Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full md:w-1/2 min-w-0 overflow-x-hidden box-border"
          >
            <h2
              className="text-[clamp(1.75rem,2.5vw,2.25rem)] font-bold mb-6 max-w-full"
              style={{
                color: theme.colors.primary.DEFAULT,
                fontFamily: theme.fonts.header,
              }}
            >
              Our Heritage & Journey
            </h2>
            <p className="text-base md:text-lg mb-6 leading-relaxed">
              Founded in 1995 by master craftsman Thomas Hudson, our Brooklyn
              workshop began as a humble space dedicated to reviving forgotten
              woodworking techniques. Today, we've grown into an internationally
              recognized atelier while maintaining our commitment to handcrafted
              excellence.
            </p>
            <p className="text-base md:text-lg mb-6 leading-relaxed">
              Each piece we create honors the legacy of traditional
              craftsmanship while embracing contemporary design principles. We
              believe furniture should be both functional art and an heirloom
              for future generations.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                "25+ Years Experience",
                "Family-Owned",
                "Handcrafted",
                "Sustainable Materials",
              ].map((tag, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: theme.colors.text.onPrimary,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="py-24 overflow-x-hidden box-border"
        style={{ backgroundColor: theme.colors.primary.DEFAULT }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: theme.fonts.header }}
            >
              Our Guiding Principles
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto mt-4"
              style={{
                color: theme.colors.text.onPrimary,
                fontFamily: theme.fonts.alt,
              }}
            >
              The values that shape every decision, every design, and every
              piece we create
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerGrid}
          >
            {valuesData.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg border transition-shadow duration-300"
                style={{
                  backgroundColor: theme.colors.background.alt,
                  borderColor: theme.colors.ui.border,
                }}
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: theme.colors.text.onPrimary,
                  }}
                >
                  {value.icon}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-4"
                  style={{ color: theme.colors.primary.DEFAULT }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: theme.colors.text.primary }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSections;
