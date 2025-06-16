import React, { useRef } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer 
      ref={footerRef}
      className="bg-[#1E3E3E] text-white pt-16 pb-8 overflow-hidden"
    >
      {/* Animated decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-30"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 relative">
        {/* Brand Column */}
        <div className="relative">
          {/* <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#2A4B4B] rounded-full mix-blend-multiply opacity-70 animate-pulse"></div> */}
          <h4 className="text-2xl font-bold mb-6 text-[#C5A880] relative z-10">Hudson's Furniture</h4>
          <p className="text-[#E8DFD1] mb-4 relative z-10">
            Crafting timeless pieces for modern homes since 1995.
          </p>
          <div className="flex gap-4 mt-4 relative z-10">
            {[
              { icon: <FaFacebookF className="text-lg" />, color: '#4267B2' },
              { icon: <FaInstagram className="text-lg" />, color: '#E1306C' },
              { icon: <FaTwitter className="text-lg" />, color: '#1DA1F2' }
            ].map((social, i) => (
              <div 
                key={i}
                className="w-10 h-10 rounded-full bg-[#2A4B4B] flex items-center justify-center text-[#E8DFD1] hover:text-white transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 group-hover:scale-110 transition-transform">
                  {social.icon}
                </span>
                <div 
                  className="absolute inset-0 rounded-full border border-[#C5A880] opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                  style={{ animationDuration: '1.5s' }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Explore Column */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C5A880] flex items-center">
            Explore <FaChevronRight className="ml-2 text-xs opacity-70" />
          </h4>
          <ul className="space-y-2 text-[#E8DFD1]">
            {["Collections", "Custom Orders", "Showrooms", "Inspiration Gallery", "Care Instructions"].map((item, i) => (
              <li key={i} className="group">
                <a href="#" className="flex items-center py-1 transition-all duration-300 hover:text-[#C5A880]">
                  <span className="w-0 h-px bg-[#C5A880] group-hover:w-4 mr-2 transition-all duration-300"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Company Column */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C5A880] flex items-center">
            Company <FaChevronRight className="ml-2 text-xs opacity-70" />
          </h4>
          <ul className="space-y-2 text-[#E8DFD1]">
            {["About Us", "Sustainability", "Careers", "Press", "Trade Program"].map((item, i) => (
              <li key={i} className="group">
                <a href="#" className="flex items-center py-1 transition-all duration-300 hover:text-[#C5A880]">
                  <span className="w-0 h-px bg-[#C5A880] group-hover:w-4 mr-2 transition-all duration-300"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Contact Column */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#C5A880]">Contact Us</h4>
          <address className="not-italic text-[#E8DFD1]">
            <div className="flex items-start mb-3 group">
              <FaMapMarkerAlt className="mt-1 mr-3 text-[#C5A880] group-hover:animate-bounce" />
              <div>
                <p>123 Design Avenue</p>
                <p>New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center mb-3 group">
              <FaEnvelope className="mr-3 text-[#C5A880] group-hover:animate-pulse" />
              <a href="mailto:info@hudsons.com" className="hover:text-[#C5A880] transition-colors">info@hudsons.com</a>
            </div>
            <div className="flex items-center mb-6 group">
              <FaPhone className="mr-3 text-[#C5A880] group-hover:animate-pulse" />
              <a href="tel:2125557890" className="hover:text-[#C5A880] transition-colors">(212) 555-7890</a>
            </div>
            <button 
              className="relative overflow-hidden group border border-[#C5A880] text-[#C5A880] px-6 py-3 rounded-full hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-white transition-colors">
                Schedule Consultation
              </span>
              <div className="absolute inset-0 bg-[#C5A880] w-0 group-hover:w-full transition-all duration-500 z-0"></div>
            </button>
          </address>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#3A5F5F] text-center text-[#E8DFD1] relative">
        <p className="hover:text-[#C5A880] transition-colors duration-300 cursor-default">
          © 2025 Hudson's Furniture. All rights reserved. Crafted with passion in Brooklyn, NY.
        </p>
        {/* Floating elements */}
        <div className="absolute -top-6 left-1/4 w-3 h-3 rounded-full bg-[#C5A880] opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -top-8 left-3/4 w-2 h-2 rounded-full bg-[#C5A880] opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer;