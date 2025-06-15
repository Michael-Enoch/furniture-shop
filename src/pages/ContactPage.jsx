import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaPinterest, FaPaperPlane, FaUser, FaEnvelopeOpen } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const heroRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const hoursRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };
  
  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
    
    // Contact info animation
    gsap.from(contactInfoRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: contactInfoRef.current,
        start: "top bottom-=150",
        toggleActions: "play none none none"
      }
    });
    
    // Form animation
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom-=150",
        toggleActions: "play none none none"
      }
    });
    
    // Map animation
    gsap.from(mapRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top bottom-=150",
        toggleActions: "play none none none"
      }
    });
    
    // Hours animation
    gsap.from(hoursRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: {
        trigger: hoursRef.current,
        start: "top bottom-=150",
        toggleActions: "play none none none"
      }
    });
  }, []);
  
  return (
    <div className="bg-[#F5F1E9] text-[#333333] overflow-hidden">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-[60vh] flex items-center justify-center bg-black"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10"></div>
        
        {/* Furniture background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1920')" }}
        ></div>
        
        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            Get In Touch
          </h1>
          <div className="w-32 h-1 bg-[#C5A880] mx-auto my-6"></div>
          <p className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto">
            We're here to answer your questions and help you find the perfect piece
          </p>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="lg:w-1/3" ref={contactInfoRef}>
            <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8">Contact Information</h2>
            
            <div className="mb-8 flex items-start">
              <div className="bg-[#2F4F4F] text-[#C5A880] p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">Our Workshop</h3>
                <p className="text-gray-700">
                  123 Design Avenue<br />
                  Brooklyn, NY 11201<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="mb-8 flex items-start">
              <div className="bg-[#2F4F4F] text-[#C5A880] p-3 rounded-full mr-4">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">Phone</h3>
                <p className="text-gray-700">
                  (212) 555-7890<br />
                  Mon-Fri, 9am-6pm EST
                </p>
              </div>
            </div>
            
            <div className="mb-8 flex items-start">
              <div className="bg-[#2F4F4F] text-[#C5A880] p-3 rounded-full mr-4">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">Email</h3>
                <p className="text-gray-700">
                  info@hudsons.com<br />
                  inquiries@hudsons.com
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-[#2F4F4F] mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-[#2F4F4F] flex items-center justify-center hover:bg-[#C5A880] transition-colors">
                  <FaFacebook className="text-[#F5F1E9] text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#2F4F4F] flex items-center justify-center hover:bg-[#C5A880] transition-colors">
                  <FaInstagram className="text-[#F5F1E9] text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#2F4F4F] flex items-center justify-center hover:bg-[#C5A880] transition-colors">
                  <FaPinterest className="text-[#F5F1E9] text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:w-2/3" ref={formRef}>
            <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8">Send Us a Message</h2>
            
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <FaEnvelopeOpen className="mr-3 text-xl" />
                <span>Thank you for your message! We'll get back to you soon.</span>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2F4F4F] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1E3E3E] transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="py-12 px-4" ref={mapRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8 text-center">Visit Our Workshop</h2>
          
          <div className="rounded-xl overflow-hidden shadow-xl h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1659377895806!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="Hudson's Furniture Location"
            ></iframe>
          </div>
        </div>
      </div>
      
      {/* Business Hours */}
      <div className="py-16 px-4 bg-[#2F4F4F] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Business Hours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={hoursRef}>
            <div className="bg-[#3A5F5F] p-6 rounded-xl text-center">
              <div className="bg-[#2F4F4F] text-[#C5A880] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Monday - Friday</h3>
              <p className="text-[#E8DFD1]">9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="bg-[#3A5F5F] p-6 rounded-xl text-center">
              <div className="bg-[#2F4F4F] text-[#C5A880] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Saturday</h3>
              <p className="text-[#E8DFD1]">10:00 AM - 4:00 PM</p>
            </div>
            
            <div className="bg-[#3A5F5F] p-6 rounded-xl text-center">
              <div className="bg-[#2F4F4F] text-[#C5A880] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sunday</h3>
              <p className="text-[#E8DFD1]">Closed</p>
            </div>
            
            <div className="bg-[#3A5F5F] p-6 rounded-xl text-center">
              <div className="bg-[#2F4F4F] text-[#C5A880] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">By Appointment</h3>
              <p className="text-[#E8DFD1]">Available evenings</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg max-w-2xl mx-auto text-[#E8DFD1]">
              We recommend scheduling an appointment for personalized consultations to ensure we can give you our undivided attention.
            </p>
            <button className="mt-6 border-2 border-white text-white px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:bg-[#C5A880] hover:border-[#C5A880]">
              Schedule an Appointment
            </button>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-[#F5F1E9] to-[#E8DFD1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-6">Experience Hudson Craftsmanship</h2>
          <div className="w-32 h-1 bg-[#C5A880] mx-auto my-6"></div>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Visit our showroom to see our furniture in person and speak with our design consultants.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#2F4F4F] text-white py-3 px-8 rounded-full font-medium hover:bg-[#1E3E3E] transition-colors">
              Book a Showroom Tour
            </button>
            <button className="border-2 border-[#2F4F4F] text-[#2F4F4F] py-3 px-8 rounded-full font-medium hover:bg-[#2F4F4F] hover:text-white transition-colors">
              Download Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;