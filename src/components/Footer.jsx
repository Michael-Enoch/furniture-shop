import gsap from "gsap";
import { useRef } from "react";

const Footer = () => {
      const footerRef = useRef(null);
    // Footer animation
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom-=200",
              toggleActions: "play none none none",
            },
          }
        );
  return (
    <>
       {/* Footer */}
      <footer ref={footerRef} className="bg-[#3A2F2A] text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          <div>
            <h4 className="text-2xl font-bold mb-6">Hudson's Furniture</h4>
            <p className="text-[#E8DFD1] mb-4">
              Crafting timeless pieces for modern homes since 1995.
            </p>
            <div className="flex gap-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-[#5C3A21] flex items-center justify-center hover:bg-[#C5A880] transition-colors cursor-pointer"
                >
                  <span className="text-xs">fb</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-[#E8DFD1]">
              {[
                "Collections",
                "Custom Orders",
                "Showrooms",
                "Inspiration Gallery",
                "Care Instructions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-[#C5A880] cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[#E8DFD1]">
              {[
                "About Us",
                "Sustainability",
                "Careers",
                "Press",
                "Trade Program",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-[#C5A880] cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-[#E8DFD1]">
              <p className="mb-2">123 Design Avenue</p>
              <p className="mb-4">New York, NY 10001</p>
              <p className="mb-1">info@hudsons.com</p>
              <p className="mb-6">(212) 555-7890</p>
              <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-[#C5A880] hover:border-[#C5A880] transition-colors">
                Schedule Consultation
              </button>
            </address>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#5C3A21] text-center text-[#E8DFD1]">
          <p>
            © 2023 Hudson's Furniture. All rights reserved. Crafted with passion
            in Brooklyn, NY.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
