import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import theme from "../context/Theme";

const Hero = ({ offers }) => {
  if (!offers.length) return null;

  return (
    <section className="relative w-full group">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-[500px] sm:h-[600px]"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${offer.image})` }}
            >
              <div className="bg-black/80 w-full h-full flex flex-col items-center md:items-start justify-center text-white px-4 sm:px-8 md:px-16 lg:px-8 py-10 md:py-16 text-center md:text-left space-y-6">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug"
                  style={{ fontFamily: theme.fonts.header }}
                >
                  {offer.title}
                  <span className="text-[#F4A261] font-semibold ml-2">
                    {offer.discount}
                  </span>
                </h2>

                <p
                  className="text-xs sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed"
                  style={{ fontFamily: theme.fonts.body }}
                >
                  {offer.subtitle} — Discover beautifully crafted furniture that
                  blends comfort and sophistication in your{" "}
                  {offer.category.toLowerCase()} space.
                </p>

                <Link
                  to={offer.link}
                  className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base md:text-lg font-medium bg-[#A65A2E] hover:bg-[#BF6E3D] transition-all duration-300 shadow-md"
                  style={{ fontFamily: theme.fonts.alt }}
                >
                  {offer.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
