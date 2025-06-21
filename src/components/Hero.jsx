import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import theme from "../context/Theme";

const Hero = ({ offers }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000;

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((prevIndex) => (prevIndex + 1) % offers.length);
    };
    timeoutRef.current = setTimeout(nextSlide, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [current, offers.length]);

  if (!offers.length) return null;

  return (
    <section className="relative w-full max-w-screen-2xl mx-auto overflow-hidden h-[500px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
      <div className="relative w-full h-full">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${offer.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-black/70 to-black/60 text-white flex items-center justify-center md:justify-start px-4 sm:px-8 md:px-16 py-20">
              <div className="max-w-5xl text-center md:text-left space-y-6">
                <h2
                  className="font-bold leading-tight tracking-tight text-white"
                  style={{
                    fontFamily: theme.fonts.header,
                    fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  }}
                >
                  {offer.title}
                  <span
                    className="ml-2 text-[#F4A261] font-semibold"
                    style={{
                      fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                    }}
                  >
                    {offer.discount}
                  </span>
                </h2>

                <p
                  className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto md:mx-0"
                  style={{ fontFamily: theme.fonts.body }}
                >
                  {offer.subtitle} — Discover beautifully crafted furniture that blends comfort and sophistication in your{" "}
                  {offer.category.toLowerCase()} space.
                </p>

                <div className="flex justify-center md:justify-start">
                  <Link
                    to={offer.link}
                    className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium bg-[#A65A2E] hover:bg-[#BF6E3D] transition-all duration-300 shadow-md text-white text-sm sm:text-base md:text-lg"
                    style={{ fontFamily: theme.fonts.alt }}
                  >
                    {offer.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
