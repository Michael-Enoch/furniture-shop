import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import theme from "../context/Theme";

const Hero = () => {
  const [offers, setOffers] = useState([]);
  const BASE_URL = "/limited_offers.json";

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(BASE_URL);
        const data = response.data;
        setOffers(data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      }
    };
    fetchOffers();
  }, []);

  if (offers.length === 0) return null;
  return (
    <section className="relative w-full group">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        className="w-full h-[600px]"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div
              className="w-full h-[600px] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${offer.image})` }}
            >
              <div className="bg-black/80 w-full h-full flex items-center justify-start px-4 md:px-20 text-center md:text-left">
                <div className="max-w-xl text-left text-white space-y-4">
                  <h2
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {offer.title}
                  </h2>
                  <p
                    className="text-lg md:text-xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {offer.subtitle}
                  </p>
                  <Link
                    to={offer.link}
                    className="inline-block mt-4 px-6 py-2 text-white text-lg font-medium rounded-lg bg-[#A65A2E] hover:bg-[#BF6E3D] transition-colors duration-300"
                    style={{ fontFamily: theme.fonts.alt }}
                  >
                    {offer.cta}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    
  );
};

export default Hero;
