// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  "/gallery/Living room_ Devon Grace.webp",
  "/gallery/second.jpg",
  "/gallery/third.jpg",
  "/gallery/fourth.webp",
  "/gallery/fifth.jpg",
  "/gallery/second.jpg",
  "/gallery/second.jpg",
  "/gallery/second.jpg",
];

const Gallery = ({ sectionIndex = 6 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainer = useRef(null);

  const openLightbox = (index = 0) => {
    setActiveIndex(index);
    setIsOpen(true);
    setTimeout(() => {
      scrollToIndex(index);
    }, 50);
  };

  const closeLightbox = () => setIsOpen(false);

  const scrollLeft = () => {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const scrollRight = () => {
    if (activeIndex < images.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    const container = scrollContainer.current;
    const child = container.children[index];
    if (child) {
      container.scrollTo({
        left:
          child.offsetLeft -
          container.offsetLeft -
          (container.clientWidth - child.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  // Detect manual scroll (trackpad, swipe) to update active image
  const handleScroll = () => {
    const container = scrollContainer.current;
    const children = Array.from(container.children);
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter =
        child.offsetLeft - container.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        scrollRight();
      } else if (e.key === "ArrowLeft") {
        scrollLeft();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, activeIndex]);

  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto"
      style={{ background: bgColor }}
    >
      <h2
        data-aos="zoom-in-up"
        className="text-3xl font-bold text-center mb-10"
        style={{
          color: theme.colors.primary.DEFAULT,
          fontFamily: theme.fonts.header,
        }}
      >
        Gallery
      </h2>

      {/* Main Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.slice(0, 4).map((src, i) => (
          <motion.img
            key={i}
            src={src}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            alt={`Furniture ${i + 1}`}
            onClick={() => openLightbox(i)}
            className="rounded-xl object-cover w-full h-60 shadow cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={() => openLightbox(0)}
          className="px-6 py-3 rounded-lg border-2 text-sm font-medium transition"
          style={{ color: theme.colors.primary.DEFAULT, borderColor: theme.colors.ui.border }}
        >
          View All
        </button>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-white text-3xl hover:text-[#BF6E3D] transition"
            onClick={closeLightbox}
          >
            &times;
          </button>

          {/* Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 px-2 py-2 disabled:opacity-30 rounded-full transform -translate-y-1/2 bg-[#3A2F2A]"
            disabled={activeIndex === 0}
          >
            <ArrowLeft className="text-white" size={20}/>
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 bg-[#3A2F2A] px-2 py-2 disabled:opacity-30 rounded-full transform -translate-y-1/2"
            disabled={activeIndex === images.length - 1}
          >
            <ArrowRight className="text-white" size={20}/>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Scrollable Images */}
          <div
            ref={scrollContainer}
            className="flex gap-20 overflow-y-scroll w-7xl px-30 py-4 scrollbar-hide cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Furniture ${i + 1}`}
                onClick={() => {
                  setActiveIndex(i);
                  scrollToIndex(i);
                }}
                className={`rounded-xl max-h-[80vh] w-[300px] md:w-[600px] object-cover shadow-lg flex-shrink-0 transition-all ${
                  activeIndex === i
                    ? "ring-4 ring-[#A65A2E]"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  scrollSnapAlign: "center",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
