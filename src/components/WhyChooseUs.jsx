import { ShieldCheck, Leaf, Clock, Smile } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Built to Last",
    description: "We use premium, durable materials to ensure your furniture stands the test of time."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainably sourced wood and eco finishes because we care about the planet."
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description: "We create timeless aesthetics that never go out of style."
  },
  {
    icon: Smile,
    title: "Satisfaction Guarantee",
    description: "We stand by our craftsmanship. Hassle-free returns within 30 days."
  }
];

const WhyChooseUs = ({ sectionIndex = 5 }) => {
    const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;
  return (
    <section className="w-full max-w-screen-2xl py-16 px-4 sm:px-8 md:px-16 mx-auto"
    style={{ background: bgColor, fontFamily: theme.fonts.body}}
    >
      <h2
       data-aos="fade-down"
       data-aos-delay="100"
        className="text-center text-3xl font-bold mb-12"
        style={{ color: theme.colors.primary.DEFAULT, fontFamily: theme.fonts.header }}
      >
        Why Choose Us
      </h2>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow bg-white text-center"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <item.icon size={32} color={theme.colors.accent.DEFAULT} className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
