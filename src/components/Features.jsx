import { MdPayment } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import theme from "../context/Theme";

const Features = ({ sectionIndex = 0 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const features = [
    {
      icon: MdPayment,
      title: "Flexible Payment",
      description: "Multiple secure payment options.",
    },
    {
      icon: FaTruck,
      title: "Free Shipping",
      description: "Free shipping on orders above $2000",
    },
    {
      icon: MdSupportAgent,
      title: "24x7 Support",
      description: "We're always here to help.",
    },
  ];

  return (
    <section
      className="w-full py-16 px-4 sm:px-8 md:px-16 max-w-screen-2xl mx-auto"
      style={{ background: bgColor, fontFamily: theme.fonts.body }}
    >
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <item.icon
              size={36}
              color={theme.colors.accent.DEFAULT}
              className="shrink-0"
            />
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-1">{item.title}</h4>
              <p className="text-sm sm:text-base text-gray-700">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
