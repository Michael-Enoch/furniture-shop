import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import theme from '../context/Theme';
import { Link } from 'react-router-dom';

const companyLinks = [
  {name:"About Us", to:"/about"}, 
  {name:"Contact Us", to:"/contact"},
  {name:"Sustainability", to:"/"}, 
  {name:"Site Map", to:"/site-map"}, 
  {name:"FAQ", to:"/faq"}
]
const Footer = () => {
  return (
    <footer className="bg-[#3A2F2A] relative text-[#F8F5F2] pt-16 pb-8 w-full max-w-screen-2xl"
    style={ {fontFamily: theme.fonts.body}}
    >
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A65A2E] to-transparent opacity-30"></div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 relative">
        <div className='w-full'>
          <h4 className="text-2xl font-bold mb-6 font-header relative z-10"><span className='text-[#A65A2E]'>Hudson</span> Furniture</h4>
          <p className=" mb-4 relative z-10">
            Crafting timeless pieces for modern homes since 1995.
          </p>
          <div className="flex gap-4 mt-4 relative z-10">
            {[
              { icon: <FaFacebookF className="text-lg" />, url: 'https://facebook.com/hudsonsfurniture', label: 'Facebook' },
              { icon: <FaInstagram className="text-lg" />, url: 'https://instagram.com/hudsonsfurniture', label: 'Instagram' },
              { icon: <FaTwitter className="text-lg" />, url: 'https://x.com/hudsonsfurniture', label: 'X' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-10 h-10 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full  bg-[#A65A2E]  flex items-center justify-center hover:text-[#F8F5F2] transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#BF6E3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                  
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <div className='w-full'> 
          <h4 className="text-lg font-semibold mb-4 text-[#BF6E3D] flex items-center"
          style={ {fontFamily: theme.fonts.header}}
          >
            Explore <FaChevronRight className="ml-2 text-xs opacity-70" />
          </h4>
          <ul className="space-y-2">
            {["Collections", "Showrooms", "Inspiration Gallery"].map((item, i) => (
              <li key={i} className="group">
                <a href="#" className="flex items-center py-1 transition-all duration-300 hover:text-[#BF6E3D]">
                  <span className="w-0 h-px bg-[#BF6E3D] group-hover:w-4 mr-2 transition-all duration-300"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='w-full'>
          <h4 className="text-lg font-semibold mb-4 text-[#BF6E3D] flex items-center"
          style={ {fontFamily: theme.fonts.header}}
          >
            Company <FaChevronRight className="ml-2 text-xs opacity-70" />
          </h4>
          <ul className="space-y-2 ">
            {companyLinks.map((item, i) => (
              <li key={i} className="group">
                <Link to={item.to} className="flex items-center py-1 transition-all duration-300 hover:text-[#BF6E3D]">
                  <span className="w-0 h-px bg-[#BF6E3D] group-hover:w-4 mr-2 transition-all duration-300"></span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='w-full'>
          <h4 className="text-lg font-semibold mb-4 text-[#BF6E3D]"
          style={ {fontFamily: theme.fonts.header}}
          >
          Contact Us
          </h4>
          <address className="not-italic">
            <div className="flex items-start mb-3 group">
              <FaMapMarkerAlt className="mt-1 mr-3 text-[#A65A2E] group-hover:animate-bounce group-hover:text-[#BF6E3D]" />
              <div>
                <p>123 Design Avenue</p>
                <p>New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center mb-3 group">
              <FaEnvelope className="mr-3 text-[#A65A2E] group-hover:animate-pulse group-hover:text-[#BF6E3D]" />
              <a href="mailto:info@hudsons.com" className="hover:text-[#BF6E3D] transition-colors">info@hudsons.com</a>
            </div>
            <div className="flex items-center mb-6 group">
              <FaPhone className="mr-3 text-[#A65A2E] group-hover:animate-pulse group-hover:text-[#BF6E3D]" />
              <a href="tel:2125557890" className="hover:text-[#BF6E3D] transition-colors">(212) 555-7890</a>
            </div>
            <button
              className="relative overflow-hidden group border-1 border-[#A65A2E] text-[#A65A2E] px-6 py-3 rounded-full hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-[#F8F5F2] text-[#F8F5F2] transition-colors">
                Schedule Consultation
              </span>
              <div className="absolute inset-0 bg-[#BF6E3D] w-0 group-hover:w-full transition-all duration-500 z-0"></div>
            </button>
          </address>
        </div>

        <div className='w-full'>
          <h4 className="text-lg font-semibold mb-4 font-header">Subscribe to our newsletter</h4>
          <form aria-label="Newsletter subscription form" className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="border bg-white text-[#2D2D2D] border-[#A65A2E] px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A65A2E]"
            />
            <button
              type="submit"
              className="bg-[#A65A2E] text-[#F8F5F2] px-6 py-2 rounded-full hover:bg-[#BF6E3D] transition-all duration-300 font-body"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
      
      <div className="max-w-6xl w-full mx-auto mt-16 pt-8 border-t border-[#DAD4CE] text-center relative">
        <p className="cursor-default text-xs sm:text-base">
          &copy; 2025 Hudson's Furniture. All rights reserved. Crafted with passion in Brooklyn, NY.
        </p>
        <div className="absolute -top-6 left-1/4 w-3 h-3 rounded-full bg-[#A65A2E] opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -top-8 left-3/4 w-2 h-2 rounded-full bg-[#A65A2E] opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
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
  );
};

export default Footer;