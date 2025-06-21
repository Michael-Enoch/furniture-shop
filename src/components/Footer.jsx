import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import theme from '../context/Theme';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
=======
const companyLinks = [
  {name:"About Us", to:"/about"}, 
  {name:"Contact Us", to:"/contact"},
  {name:"Sustainability", to:"/"}, 
  {name:"Site Map", to:"/site-map"}, 
  {name:"FAQ", to:"/faq"}
]
>>>>>>> 467e2af838b14a35aa23748de34565cc7695491c
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3A2F2A] relative text-[#F8F5F2] pt-16 pb-8 overflow-hidden"
      style={{ fontFamily: theme.fonts.body }}
      aria-label="Website footer"
    >
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A65A2E] to-transparent opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#A65A2E] opacity-5"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#BF6E3D] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 px-6 relative z-10">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <h4 className="text-3xl font-bold mb-6 font-header relative">
            <span className='text-[#A65A2E]'>Hudson</span> Furniture
          </h4>
          <p className="mb-6 text-[#F8F5F2]/90 leading-relaxed">
            Crafting timeless pieces for modern homes since 1995. Each piece tells a story of quality craftsmanship and enduring design.
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { icon: <FaFacebookF className="text-lg" />, url: 'https://facebook.com/hudsonsfurniture', label: 'Facebook' },
              { icon: <FaInstagram className="text-lg" />, url: 'https://instagram.com/hudsonsfurniture', label: 'Instagram' },
              { icon: <FaTwitter className="text-lg" />, url: 'https://x.com/hudsonsfurniture', label: 'X' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                aria-label={`Follow us on ${social.label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-10 h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6E3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3A2F2A] rounded-full transition-transform hover:scale-110"
              >
                <div className="w-10 h-10 rounded-full bg-[#A65A2E]/90 hover:bg-[#BF6E3D] flex items-center justify-center transition-all duration-300 group overflow-hidden relative">
                  <span className="relative z-10">
                    {social.icon}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Explore column */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-[#BF6E3D] flex items-center"
            style={{ fontFamily: theme.fonts.header }}
          >
            Explore <FaChevronRight className="ml-2 text-xs opacity-70" />
          </h4>
          <ul className="space-y-3">
            {[
              { name: "Collections", url: "#" },
              { name: "Showrooms", url: "#" },
              { name: "Inspiration Gallery", url: "#" },
              { name: "Custom Designs", url: "#" },
              { name: "New Arrivals", url: "#" }
            ].map((item, i) => (
              <li key={i} className="group">
                <a 
                  href={item.url} 
                  className="flex items-center py-1 transition-all duration-300 hover:text-[#BF6E3D] text-[#F8F5F2]/90 hover:text-[#F8F5F2]"
                  aria-label={`Explore ${item.name}`}
                >
                  <span className="w-0 h-px bg-[#BF6E3D] group-hover:w-4 mr-3 transition-all duration-300"></span>
                  {item.name}
                  <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Company column */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-[#BF6E3D] flex items-center"
            style={{ fontFamily: theme.fonts.header }}
          >
            Company <FaChevronRight className="ml-2 text-xs opacity-70" />
          </h4>
<<<<<<< HEAD
          <ul className="space-y-3">
            {[
              { name: "About Us", url: "#" },
              { name: "Our Craftsmanship", url: "#" },
              { name: "Sustainability", url: "#" },
              { name: "Careers", url: "#" },
              { name: "FAQ", url: "#" }
            ].map((item, i) => (
              <li key={i} className="group">
                <a 
                  href={item.url} 
                  className="flex items-center py-1 transition-all duration-300 hover:text-[#BF6E3D] text-[#F8F5F2]/90 hover:text-[#F8F5F2]"
                  aria-label={`Learn about ${item.name}`}
                >
                  <span className="w-0 h-px bg-[#BF6E3D] group-hover:w-4 mr-3 transition-all duration-300"></span>
                  {item.name}
                  <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
=======
          <ul className="space-y-2 ">
            {companyLinks.map((item, i) => (
              <li key={i} className="group">
                <Link to={item.to} className="flex items-center py-1 transition-all duration-300 hover:text-[#BF6E3D]">
                  <span className="w-0 h-px bg-[#BF6E3D] group-hover:w-4 mr-2 transition-all duration-300"></span>
                  {item.name}
                </Link>
>>>>>>> 467e2af838b14a35aa23748de34565cc7695491c
              </li>
            ))}
          </ul>
        </div>
        
        {/* Contact column */}
        <div className="lg:col-span-1">
          <h4 className="text-xl font-semibold mb-6 text-[#BF6E3D]"
            style={{ fontFamily: theme.fonts.header }}
          >
            Contact Us
          </h4>
          <address className="not-italic space-y-4">
            <div className="flex items-start group">
              <FaMapMarkerAlt className="mt-1 mr-3 text-[#A65A2E] group-hover:text-[#BF6E3D] transition-colors" />
              <div className="text-[#F8F5F2]/90 group-hover:text-[#F8F5F2] transition-colors">
                <p>123 Design Avenue</p>
                <p>New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center group">
              <FaEnvelope className="mr-3 text-[#A65A2E] group-hover:text-[#BF6E3D] transition-colors" />
              <a 
                href="mailto:info@hudsons.com" 
                className="hover:text-[#BF6E3D] transition-colors text-[#F8F5F2]/90 hover:text-[#F8F5F2]"
                aria-label="Email us"
              >
                info@hudsons.com
              </a>
            </div>
            <div className="flex items-center group">
              <FaPhone className="mr-3 text-[#A65A2E] group-hover:text-[#BF6E3D] transition-colors" />
              <a 
                href="tel:2125557890" 
                className="hover:text-[#BF6E3D] transition-colors text-[#F8F5F2]/90 hover:text-[#F8F5F2]"
                aria-label="Call us"
              >
                (212) 555-7890
              </a>
            </div>
            <div className="pt-2">
              <button
                className="relative overflow-hidden group w-full border border-[#A65A2E] text-[#F8F5F2] px-6 py-3 rounded-full hover:bg-[#A65A2E] transition-all duration-300 flex items-center justify-center"
                aria-label="Schedule a consultation"
              >
                <span className="relative z-10 transition-colors flex items-center">
                  Schedule Consultation
                  <FiArrowUpRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </button>
            </div>
          </address>
        </div>
      </div>
      
      {/* Newsletter section */}
      <div className="max-w-7xl mx-auto mt-16 px-6 relative z-10">
        <div className="bg-[#2D231F] rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-2 font-header">Join Our Design Community</h4>
              <p className="text-[#F8F5F2]/90">
                Subscribe to receive exclusive offers, design inspiration, and early access to new collections.
              </p>
            </div>
            <form 
              aria-label="Newsletter subscription form" 
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-grow">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border bg-white/95 text-[#2D2D2D] border-[#A65A2E] px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#A65A2E] hover:bg-[#BF6E3D] text-[#F8F5F2] px-6 py-3 rounded transition-all duration-300 font-medium flex items-center justify-center whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                <FiArrowUpRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#4D3F38] text-center relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="cursor-default text-sm">
            &copy; {currentYear} Hudson's Furniture. All rights reserved. Crafted with passion in Brooklyn, NY.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#F8F5F2]/80 hover:text-[#BF6E3D] transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-[#F8F5F2]/80 hover:text-[#BF6E3D] transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-[#F8F5F2]/80 hover:text-[#BF6E3D] transition-colors text-sm">Accessibility</a>
          </div>
        </div>
        
        {/* Decorative floating dots */}
        <div className="absolute -top-6 left-1/4 w-3 h-3 rounded-full bg-[#A65A2E] opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -top-8 left-3/4 w-2 h-2 rounded-full bg-[#A65A2E] opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;