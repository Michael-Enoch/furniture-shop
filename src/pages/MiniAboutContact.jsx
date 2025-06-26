
import theme from "../context/Theme";
import { Link } from "react-router-dom";

const MiniAboutContact =({ sectionIndex = 8 }) => {
   const bgColor =
      sectionIndex % 2 === 0
        ? theme.colors.background.DEFAULT
        : theme.colors.background.alt;
  return (
    <section
      className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 gap-10 py-20 px-6 max-w-8xl mx-auto"
      style={{ background: bgColor, fontFamily: theme.fonts.body }}
    >
      <div
        data-aos="fade-up"
        className="bg-white p-8 rounded-xl shadow"
      >
        <h3
          className="text-2xl font-bold mb-3"
        >
          About Our Craft
        </h3>
        <p className="text-sm mb-4">
          We’re a passionate team of artisans and designers creating timeless furniture with a conscience. Every piece tells a story of sustainability, care, and beauty.
        </p>
        <Link
          to="/about"
          className="inline-block text-sm font-medium text-[#A65A2E] hover:text-[#BF6E3D] transition"
        >
          Learn more →
        </Link>
      </div>

      {/* Contact Preview */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="bg-white p-8 rounded-xl shadow"
      >
        <h3
          className="text-2xl font-bold mb-3"

        >
          Get In Touch
        </h3>
        <p className="text-sm mb-4">
          Have questions or custom project ideas? We’d love to hear from you. Reach out for support, orders, or collaborations.
        </p>
        <Link
          to="/contact"
          className="inline-block text-sm font-medium text-[#A65A2E] hover:text-[#BF6E3D] transition"
        >
          Contact us →
        </Link>
      </div>
    </section>
  );
};

export default MiniAboutContact;
