import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import theme from "../context/Theme";

export const AboutUsSections = ({ valuesData }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center overflow-x-hidden"
        style={{ backgroundColor: theme.colors.primary.DEFAULT }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to bottom, ${theme.colors.primary.DEFAULT}90, ${theme.colors.primary.DEFAULT}70, ${theme.colors.primary.DEFAULT}90)`
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1920')"
          }}
          aria-label="Furniture workshop background"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl" data-aos="fade-up">
          <div className="mb-10">
            <div
              className="w-20 h-1 mx-auto mb-6"
              style={{ backgroundColor: theme.colors.accent.DEFAULT }}
            />
            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide"
              style={{ fontFamily: theme.fonts.header }}
            >
              Crafting Timeless Spaces
            </h1>
            <div
              className="w-32 h-1 mx-auto mt-6"
              style={{ backgroundColor: theme.colors.accent.DEFAULT }}
            />
          </div>
          <p
            className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto mb-10"
            style={{ fontFamily: theme.fonts.alt }}
          >
            Blending centuries-old craftsmanship with contemporary design to create furniture that tells a story
          </p>
          <button
            className="mt-8 border-2 border-white text-white px-10 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:bg-[#A65A2E] hover:border-[#A65A2E]"
            style={{ fontFamily: theme.fonts.ui }}
          >
            Explore Our Collection
          </button>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto overflow-x-hidden relative">
        <div className="flex flex-col md:flex-row items-center gap-x-12 gap-y-8">
          <div
            className="w-full md:w-1/2 min-h-[400px] md:min-h-[500px] h-auto relative rounded-2xl shadow-lg overflow-hidden aos-init"
            data-aos="fade-right"
          >
            <div
              className="w-full h-auto bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000')"
              }}
              aria-label="Our workshop in Brooklyn"
            />
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-sm opacity-80">Our workshop in Brooklyn, NY</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 min-w-0 aos-init" data-aos="fade-left">
            <h2
              className="text-[clamp(1.75rem,2.5vw,2.25rem)] font-bold mb-6"
              style={{
                color: theme.colors.primary.DEFAULT,
                fontFamily: theme.fonts.header
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
            <div className="flex flex-wrap gap-4 mt-8">
              {["25+ Years Experience", "Family-Owned", "Handcrafted", "Sustainable Materials"].map(
                (tag, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.text.onPrimary
                    }}
                  >
                    {tag}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="py-24 overflow-x-hidden"
        style={{ backgroundColor: theme.colors.primary.DEFAULT }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
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
                fontFamily: theme.fonts.alt
              }}
            >
              The values that shape every decision, every design, and every
              piece we create
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-8 rounded-2xl shadow-md hover:shadow-lg border transition-shadow duration-300"
                style={{
                  backgroundColor: theme.colors.background.alt,
                  borderColor: theme.colors.ui.border
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: theme.colors.text.onPrimary
                  }}
                >
                  {value.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: theme.colors.primary.DEFAULT }}
                >
                  {value.title}
                </h3>
                <p style={{ color: theme.colors.text.primary }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSections;
