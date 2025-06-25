import Marquee from "react-fast-marquee";
import theme from "../context/Theme";

const Brands = ({ sectionIndex = 2 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const brandLogos = [
    "/brands/Timber & Co.png",
    "/brands/UrbanNest.png",
    "/brands/Willow & Elm.png",
    "/brands/StudioForm.png",
    "/brands/Nordico Brand.png",
    "/brands/Luxe Living.png",
    "/brands/HomeSmith.png",
    "/brands/CozyLiving.png",
    "/brands/Amber Oak.png",
    "/brands/Haven Interiors.png",
    "/brands/LoftStyle.png"
  ];

  return (
    <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto"
      style={{ background: bgColor }}
    >
      <div
        className="text-center mb-10"
        data-aos="fade-up"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Our Sponsored Brands
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Trusted by premium furniture manufacturers worldwide
        </p>
      </div>

      <Marquee
        pauseOnHover
        gradient={false}
        speed={50}
        className="flex items-center"
      >
        {brandLogos.concat(brandLogos).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Brand ${i + 1}`}
            className="h-20 w-auto mx-4 object-contain"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default Brands;
