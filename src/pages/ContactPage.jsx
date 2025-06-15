import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const titleRef = useRef(null);
  const sectionRefs = useRef([]);
  
  useEffect(() => {
    // GSAP animations
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 0.3
    });
    
    gsap.utils.toArray(".animate-section").forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#F5F1E9', color: '#333333' }}>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <motion.h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: '#2F4F4F' }}
          >
            Contact Us
          </motion.h2>
          <motion.div 
            className="w-24 h-1 mx-auto mb-6"
            style={{ backgroundColor: '#5C3A21' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Have questions about our furniture collections or custom design services? Our team is ready to assist you.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="animate-section p-8 rounded-xl shadow-lg"
            style={{ backgroundColor: '#FFF9F0' }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#2F4F4F' }}>
              Send Us a Message
            </h3>
            
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: '#e6f4ea', color: '#0f5132' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-lg">We've received your message and will get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2`}
                      style={{ backgroundColor: '#F5F1E9', focusRingColor: '#5C3A21' }}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2`}
                      style={{ backgroundColor: '#F5F1E9', focusRingColor: '#5C3A21' }}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2`}
                      style={{ backgroundColor: '#F5F1E9', focusRingColor: '#5C3A21' }}
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block font-medium mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 min-h-[150px]`}
                      style={{ backgroundColor: '#F5F1E9', focusRingColor: '#5C3A21' }}
                      id="message"
                      name="message"
                      placeholder="Tell us about your furniture needs..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      className="w-full py-4 text-white font-bold rounded-lg"
                      style={{ backgroundColor: '#5C3A21' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </motion.div>
              </form>
            )}
          </motion.div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div 
              className="animate-section p-8 rounded-xl shadow-lg"
              style={{ backgroundColor: '#FFF9F0' }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#2F4F4F' }}>
                Our Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#2F4F4F' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF9F0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: '#2F4F4F' }}>Showroom Address</h4>
                    <p>123 Design District Avenue</p>
                    <p>Furniture City, FC 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#2F4F4F' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF9F0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: '#2F4F4F' }}>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri: 9am - 6pm</p>
                    <p>Sat: 10am - 4pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#2F4F4F' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF9F0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: '#2F4F4F' }}>Email</h4>
                    <p>info@hudsonsfurniture.com</p>
                    <p>support@hudsonsfurniture.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="animate-section rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                title="Hudson's Furniture Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133404903!2d-73.98757492416464!3d40.75797473455734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1696441469023!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <motion.div 
          className="animate-section mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#2F4F4F' }}>Frequently Asked Questions</h3>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#5C3A21' }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What is your delivery timeline?",
                answer: "Standard delivery takes 2-4 weeks after order confirmation. For custom pieces, please allow 6-8 weeks. Expedited options are available."
              },
              {
                question: "Do you offer assembly services?",
                answer: "Yes, we offer professional assembly services for all our furniture. Our team will ensure everything is set up perfectly in your home."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy on all non-custom items. Custom pieces are not returnable but are covered by our quality guarantee."
              },
              {
                question: "Can I customize furniture pieces?",
                answer: "Absolutely! We specialize in custom furniture. Choose from various fabrics, finishes, and dimensions to create your perfect piece."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                className="p-6 rounded-xl shadow-md"
                style={{ backgroundColor: '#FFF9F0' }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bold text-lg mb-2" style={{ color: '#2F4F4F' }}>{faq.question}</h4>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Site Map */}
        <motion.div 
          className="animate-section mt-20 py-12 px-8 rounded-xl"
          style={{ backgroundColor: '#2F4F4F', color: '#FFF9F0' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Site Map</h3>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#5C3A21' }}></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Collections</h4>
              <ul className="space-y-2">
                {['Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Outdoor', 'Accent Pieces'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-80 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                {['Custom Design', 'Interior Consultation', 'Delivery & Setup', 'Furniture Restoration', 'Trade Program', 'Financing'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-80 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">About Us</h4>
              <ul className="space-y-2">
                {['Our Story', 'Craftsmanship', 'Sustainability', 'Showrooms', 'Careers', 'Press'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-80 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Customer Support</h4>
              <ul className="space-y-2">
                {['Contact Us', 'FAQ', 'Shipping Info', 'Returns & Exchanges', 'Care Instructions', 'Warranty'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:opacity-80 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-6 mt-20" style={{ backgroundColor: '#2F4F4F', color: '#FFF9F0' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Hudson's Furniture</h3>
              <p className="max-w-xs opacity-80">Crafting timeless furniture for modern living since 1985</p>
            </div>
            
            <div className="flex space-x-6">
              {['facebook', 'twitter', 'instagram', 'pinterest'].map((platform, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                  whileHover={{ y: -3 }}
                >
                  <span className="sr-only">{platform}</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5C3A21' }}>
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#FFF9F0' }}></div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Hudson's Furniture. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Terms of Service</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;