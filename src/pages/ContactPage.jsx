import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaPaperPlane,
  FaUser,
  FaEnvelopeOpen,
  FaChevronDown,
  FaMap,
  FaQuestionCircle,
  FaCalendarAlt,
  FaSitemap, 
  FaHome, 
  FaInfoCircle, 
  FaTools,
  FaImages, 
  FaNewspaper, 
  FaShoppingBag, 
  FaLock,
  FaTruck,
  FaToolbox,
  FaFileContract,
  FaShieldAlt,
  FaExchangeAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const theme = {
  colors: {
    primary: {
      DEFAULT: '#3A2F2A',
      contrast: '#F8F5F2',
    },
    accent: {
      DEFAULT: '#A65A2E',
      hover: '#BF6E3D',
    },
    background: {
      DEFAULT: '#F3EFEB',
      alt: "#EFEAE5", 
      muted: '#EAE6E1',
    },
    text: {
      primary: '#2D2D2D',
      onPrimary: '#F8F5F2',
    },
    ui: {
      base: '#FFFFFF',
      border: '#DAD4CE',
    },
    category: {
      bedroom: '#CDB8A0',
      living: '#A39887',
      office: '#7F8B91',
      dining: '#B57C54',
      outdoor: '#7A8C5D',
    },
  },
  fonts: {
    header:  "'Raleway', sans-serif",
    body: "'Inter', sans-serif",
    alt: "'Poppins', sans-serif",
    ui: "'Work Sans', sans-serif",
  }
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    service: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState("contact");
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message should be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAppointmentForm = () => {
    const errors = {};

    if (!appointmentData.date) {
      errors.date = "Date is required";
    }

    if (!appointmentData.time) {
      errors.time = "Time is required";
    }

    if (!appointmentData.service) {
      errors.service = "Service is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    }
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();

    if (validateAppointmentForm()) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setAppointmentData({ date: "", time: "", service: "", notes: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    }
  };

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
    { day: "By Appointment", hours: "Available evenings" },
  ];

  const faqItems = [
    {
      question: "How long does custom furniture take to make?",
      answer:
        "Our custom pieces typically take 6-8 weeks from design approval to completion. Complex designs may take longer.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide. Shipping costs and times vary based on location and size of the furniture.",
    },
    {
      question: "What materials do you use?",
      answer:
        "We use sustainably sourced hardwoods, premium upholstery fabrics, and eco-friendly finishes. All materials are ethically sourced.",
    },
    {
      question: "Can I visit your workshop?",
      answer:
        "Absolutely! We offer private tours of our workshop by appointment. Please schedule a visit through our contact form.",
    },
    {
      question: "Do you provide design consultations?",
      answer:
        "Yes, our design team offers complimentary 30-minute consultations to discuss your project and vision.",
    },
  ];

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="text-[#2D2D2D] overflow-hidden"
      style={{ 
        backgroundColor: theme.colors.background.DEFAULT,
        fontFamily: theme.fonts.body
      }}
    >
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10"></div>

        {/* Furniture background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide"
            style={{ fontFamily: theme.fonts.header }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crafted Connections
          </motion.h1>
          <motion.div
            className="w-32 h-1 mx-auto my-6"
            style={{ backgroundColor: theme.colors.accent.DEFAULT }}
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          <motion.p
            className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto"
            style={{ fontFamily: theme.fonts.alt }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Let's discuss your bespoke furniture journey
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div 
          className="flex border-b overflow-x-auto"
          style={{ borderColor: theme.colors.ui.border }}
        >
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "contact"
                ? `text-[${theme.colors.primary.DEFAULT}] border-b-2`
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
            style={{ 
              borderBottomColor: activeTab === "contact" ? theme.colors.primary.DEFAULT : 'transparent',
              fontFamily: theme.fonts.ui,
              color: activeTab === "contact" ? theme.colors.primary.DEFAULT : '#7A8C8C'
            }}
          >
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "faq"
                ? `text-[${theme.colors.primary.DEFAULT}] border-b-2`
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
            style={{ 
              borderBottomColor: activeTab === "faq" ? theme.colors.primary.DEFAULT : 'transparent',
              fontFamily: theme.fonts.ui,
              color: activeTab === "faq" ? theme.colors.primary.DEFAULT : '#7A8C8C'
            }}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("appointment")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "appointment"
                ? `text-[${theme.colors.primary.DEFAULT}] border-b-2`
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
            style={{ 
              borderBottomColor: activeTab === "appointment" ? theme.colors.primary.DEFAULT : 'transparent',
              fontFamily: theme.fonts.ui,
              color: activeTab === "appointment" ? theme.colors.primary.DEFAULT : '#7A8C8C'
            }}
          >
            Book Appointment
          </button>
          <button
            onClick={() => setActiveTab("sitemap")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "sitemap"
                ? `text-[${theme.colors.primary.DEFAULT}] border-b-2`
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
            style={{ 
              borderBottomColor: activeTab === "sitemap" ? theme.colors.primary.DEFAULT : 'transparent',
              fontFamily: theme.fonts.ui,
              color: activeTab === "sitemap" ? theme.colors.primary.DEFAULT : '#7A8C8C'
            }}
          >
            Site Map
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div
        id="contact-section"
        className="py-16 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {/* Contact Tab */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-12"
            >
              {/* Contact Information */}
              <div className="lg:w-2/5">
                <motion.h2
                  className="text-3xl font-bold mb-8"
                  style={{ 
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Our Studio
                </motion.h2>

                <motion.div
                  className="mb-8 flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ 
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.accent.DEFAULT
                    }}
                  >
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      Artisan Workshop
                    </h3>
                    <p style={{ color: theme.colors.text.primary }}>
                      123 Design Avenue
                      <br />
                      Lagos, Nigeria
                      <br />
                      West Africa
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-8 flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ 
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.accent.DEFAULT
                    }}
                  >
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      Phone
                    </h3>
                    <p style={{ color: theme.colors.text.primary }}>
                      +234 (0) 812 345 6789
                      <br />
                      Mon-Fri, 9am-6pm WAT
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-8 flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div 
                    className="p-3 rounded-full mr-4"
                    style={{ 
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.accent.DEFAULT
                    }}
                  >
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      Email
                    </h3>
                    <p style={{ color: theme.colors.text.primary }}>
                      info@hudsons.com
                      <br />
                      inquiries@hudsons.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 
                    className="text-xl font-semibold mb-4"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  >
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                      style={{ 
                        backgroundColor: theme.colors.primary.DEFAULT,
                        color: theme.colors.primary.contrast
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: theme.colors.accent.DEFAULT
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFacebook className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                      style={{ 
                        backgroundColor: theme.colors.primary.DEFAULT,
                        color: theme.colors.primary.contrast
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: theme.colors.accent.DEFAULT
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                      style={{ 
                        backgroundColor: theme.colors.primary.DEFAULT,
                        color: theme.colors.primary.contrast
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: theme.colors.accent.DEFAULT
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPinterest className="text-xl" />
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-12 p-6 rounded-xl border"
                  style={{ 
                    backgroundColor: theme.colors.background.alt,
                    borderColor: theme.colors.ui.border
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  >
                    Visit Our Showroom
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Experience our craftsmanship firsthand. Our showroom is open
                    by appointment for personalized consultations.
                  </p>
                  <button
                    onClick={() => setActiveTab("appointment")}
                    className="py-2 px-6 rounded-full font-medium transition-colors w-full"
                    style={{ 
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.primary.contrast
                    }}
                  >
                    Schedule a Visit
                  </button>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-3/5">
                <motion.h2
                  className="text-3xl font-bold mb-8"
                  style={{ 
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Let's Create Together
                </motion.h2>

                {submitSuccess ? (
                  <motion.div
                    className="border px-4 py-3 rounded mb-6 flex items-center"
                    style={{ 
                      backgroundColor: '#F0FDF4',
                      borderColor: '#BBF7D0',
                      color: '#166534'
                    }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <FaEnvelopeOpen className="mr-3 text-xl" />
                    <span>
                      Thank you for your message! Our design team will contact
                      you within 24 hours.
                    </span>
                  </motion.div>
                ) : null}

                <motion.form
                  onSubmit={handleSubmit}
                  className="rounded-xl shadow-lg p-6 md:p-8"
                  style={{ 
                    backgroundColor: theme.colors.ui.base,
                    borderColor: theme.colors.ui.border,
                    borderWidth: '1px'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2"
                        style={{ color: theme.colors.text.primary }}
                      >
                        Your Name *
                      </label>
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
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                            formErrors.name
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="John Smith"
                          style={{ 
                            focusRingColor: theme.colors.accent.DEFAULT,
                            borderColor: formErrors.name ? '#EF4444' : theme.colors.ui.border
                          }}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2"
                        style={{ color: theme.colors.text.primary }}
                      >
                        Email Address *
                      </label>
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
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                            formErrors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="john@example.com"
                          style={{ 
                            focusRingColor: theme.colors.accent.DEFAULT,
                            borderColor: formErrors.email ? '#EF4444' : theme.colors.ui.border
                          }}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block mb-2"
                      style={{ color: theme.colors.text.primary }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                        formErrors.subject
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="How can we help you?"
                      style={{ 
                        focusRingColor: theme.colors.accent.DEFAULT,
                        borderColor: formErrors.subject ? '#EF4444' : theme.colors.ui.border
                      }}
                    />
                    {formErrors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2"
                      style={{ color: theme.colors.text.primary }}
                    >
                      Your Vision *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                        formErrors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Tell us about your project or furniture needs..."
                      style={{ 
                        focusRingColor: theme.colors.accent.DEFAULT,
                        borderColor: formErrors.message ? '#EF4444' : theme.colors.ui.border
                      }}
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="brochure"
                      className="mr-3 w-5 h-5"
                      style={{ accentColor: theme.colors.primary.DEFAULT }}
                    />
                    <label 
                      htmlFor="brochure" 
                      style={{ color: theme.colors.text.primary }}
                    >
                      Send me Hudson's furniture catalog
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                    style={{ 
                      backgroundColor: theme.colors.primary.DEFAULT,
                      backgroundImage: `linear-gradient(to right, ${theme.colors.primary.DEFAULT}, ${theme.colors.accent.DEFAULT})`
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                style={{ 
                  color: theme.colors.primary.DEFAULT,
                  fontFamily: theme.fonts.header 
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.div
                className="rounded-xl shadow-lg p-6"
                style={{ 
                  backgroundColor: theme.colors.ui.base,
                  borderColor: theme.colors.ui.border,
                  borderWidth: '1px'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-6">
                  {faqItems.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border-b pb-6 last:border-0 last:pb-0"
                      style={{ borderColor: theme.colors.ui.border }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <div 
                          className="p-2 rounded-full mr-4"
                          style={{ 
                            backgroundColor: theme.colors.primary.DEFAULT,
                            color: theme.colors.accent.DEFAULT
                          }}
                        >
                          <FaQuestionCircle className="text-xl" />
                        </div>
                        <div>
                          <h3 
                            className="text-xl font-semibold mb-2"
                            style={{ color: theme.colors.primary.DEFAULT }}
                          >
                            {faq.question}
                          </h3>
                          <p style={{ color: theme.colors.text.primary }}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p 
                    className="text-lg mb-6 max-w-2xl mx-auto"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Didn't find the answer you were looking for? Our team is
                    ready to assist you.
                  </p>
                  <motion.button
                    onClick={() => setActiveTab("contact")}
                    className="text-white py-3 px-8 rounded-full font-medium transition-colors"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: theme.colors.accent.DEFAULT
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Support
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Appointment Tab */}
          {activeTab === "appointment" && (
            <motion.div
              key="appointment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                style={{ 
                  color: theme.colors.primary.DEFAULT,
                  fontFamily: theme.fonts.header 
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Schedule Your Visit
              </motion.h2>

              {submitSuccess ? (
                <motion.div
                  className="border px-4 py-3 rounded mb-6 flex items-center"
                  style={{ 
                    backgroundColor: '#F0FDF4',
                    borderColor: '#BBF7D0',
                    color: '#166534'
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <FaCalendarAlt className="mr-3 text-xl" />
                  <span>
                    Your appointment has been scheduled! We'll send confirmation
                    details to your email.
                  </span>
                </motion.div>
              ) : null}

              <motion.form
                onSubmit={handleAppointmentSubmit}
                className="rounded-xl shadow-lg p-6 md:p-8"
                style={{ 
                  backgroundColor: theme.colors.ui.base,
                  borderColor: theme.colors.ui.border,
                  borderWidth: '1px'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label 
                      htmlFor="date" 
                      className="block mb-2"
                      style={{ color: theme.colors.text.primary }}
                    >
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={appointmentData.date}
                        onChange={handleAppointmentChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          formErrors.date ? "border-red-500" : "border-gray-300"
                        }`}
                        min={new Date().toISOString().split("T")[0]}
                        style={{ 
                          focusRingColor: theme.colors.accent.DEFAULT,
                          borderColor: formErrors.date ? '#EF4444' : theme.colors.ui.border
                        }}
                      />
                    </div>
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label 
                      htmlFor="time" 
                      className="block mb-2"
                      style={{ color: theme.colors.text.primary }}
                    >
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <select
                        id="time"
                        name="time"
                        value={appointmentData.time}
                        onChange={handleAppointmentChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          formErrors.time ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{ 
                          focusRingColor: theme.colors.accent.DEFAULT,
                          borderColor: formErrors.time ? '#EF4444' : theme.colors.ui.border
                        }}
                      >
                        <option value="">Select a time</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                    {formErrors.time && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label 
                    htmlFor="service" 
                    className="block mb-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Service Interest *
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={appointmentData.service}
                      onChange={handleAppointmentChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                        formErrors.service
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      style={{ 
                        focusRingColor: theme.colors.accent.DEFAULT,
                        borderColor: formErrors.service ? '#EF4444' : theme.colors.ui.border
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="consultation">Design Consultation</option>
                      <option value="showroom">Showroom Visit</option>
                      <option value="custom">Custom Furniture Design</option>
                      <option value="repair">
                        Furniture Repair/Restoration
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {formErrors.service && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.service}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label 
                    htmlFor="notes" 
                    className="block mb-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={appointmentData.notes}
                    onChange={handleAppointmentChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Tell us about your project or specific interests..."
                    style={{ 
                      focusRingColor: theme.colors.accent.DEFAULT,
                      borderColor: theme.colors.ui.border
                    }}
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                  style={{ 
                    backgroundColor: theme.colors.primary.DEFAULT,
                    backgroundImage: `linear-gradient(to right, ${theme.colors.primary.DEFAULT}, ${theme.colors.accent.DEFAULT})`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <FaCalendarAlt className="mr-2" />
                      <span>Book Appointment</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          )}

          {/* Site Map Tab */}
          {activeTab === "sitemap" && (
            <motion.div
              key="sitemap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center"
                style={{ 
                  color: theme.colors.primary.DEFAULT,
                  fontFamily: theme.fonts.header 
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Website Navigation
              </motion.h2>
              
              <motion.div 
                className="rounded-xl shadow-lg p-6"
                style={{ 
                  backgroundColor: theme.colors.ui.base,
                  borderColor: theme.colors.ui.border,
                  borderWidth: '1px'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Main Navigation */}
                  <div>
                    <div className="flex items-center mb-4 pb-2 border-b"
                      style={{ borderColor: theme.colors.ui.border }}
                    >
                      <FaSitemap className="mr-3 text-xl" 
                        style={{ color: theme.colors.accent.DEFAULT }} 
                      />
                      <h3 className="text-xl font-bold"
                        style={{ color: theme.colors.primary.DEFAULT }}
                      >
                        Main Pages
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaHome className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Home
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaInfoCircle className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          About Us
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaTools className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Our Process
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaImages className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Portfolio Gallery
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaNewspaper className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Blog & News
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Products & Services */}
                  <div>
                    <div className="flex items-center mb-4 pb-2 border-b"
                      style={{ borderColor: theme.colors.ui.border }}
                    >
                      <FaTools className="mr-3 text-xl" 
                        style={{ color: theme.colors.accent.DEFAULT }} 
                      />
                      <h3 className="text-xl font-bold"
                        style={{ color: theme.colors.primary.DEFAULT }}
                      >
                        Collections
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <div className="w-5 mr-3 flex justify-center">
                          <span className="block w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: theme.colors.text.primary }}
                          ></span>
                        </div>
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Living Room Collection
                        </a>
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 mr-3 flex justify-center">
                          <span className="block w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: theme.colors.text.primary }}
                          ></span>
                        </div>
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Bedroom Furniture
                        </a>
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 mr-3 flex justify-center">
                          <span className="block w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: theme.colors.text.primary }}
                          ></span>
                        </div>
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Dining Sets
                        </a>
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 mr-3 flex justify-center">
                          <span className="block w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: theme.colors.text.primary }}
                          ></span>
                        </div>
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Office Furniture
                        </a>
                      </li>
                      <li className="flex items-center">
                        <div className="w-5 mr-3 flex justify-center">
                          <span className="block w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: theme.colors.text.primary }}
                          ></span>
                        </div>
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Custom Creations
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Support & Legal */}
                  <div>
                    <div className="flex items-center mb-4 pb-2 border-b"
                      style={{ borderColor: theme.colors.ui.border }}
                    >
                      <FaQuestionCircle className="mr-3 text-xl" 
                        style={{ color: theme.colors.accent.DEFAULT }} 
                      />
                      <h3 className="text-xl font-bold"
                        style={{ color: theme.colors.primary.DEFAULT }}
                      >
                        Support
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaEnvelopeOpen className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Contact Us
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaQuestionCircle className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          FAQ
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaTruck className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Shipping & Delivery
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaToolbox className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Care & Maintenance
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Legal & Shopping */}
                  <div>
                    <div className="flex items-center mb-4 pb-2 border-b"
                      style={{ borderColor: theme.colors.ui.border }}
                    >
                      <FaLock className="mr-3 text-xl" 
                        style={{ color: theme.colors.accent.DEFAULT }} 
                      />
                      <h3 className="text-xl font-bold"
                        style={{ color: theme.colors.primary.DEFAULT }}
                      >
                        Legal & Shopping
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FaShoppingBag className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Online Store
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaFileContract className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Terms of Service
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaShieldAlt className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li className="flex items-center">
                        <FaExchangeAlt className="mr-3" 
                          style={{ color: theme.colors.text.primary }} 
                        />
                        <a href="#" 
                          className="transition-colors"
                          style={{ color: theme.colors.text.primary }}
                        >
                          Return Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <motion.div 
                  className="mt-10 pt-6 border-t text-center"
                  style={{ borderColor: theme.colors.ui.border }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="mb-4"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Having trouble finding what you need? Our team is here to help.
                  </p>
                  <motion.button 
                    onClick={() => setActiveTab('contact')}
                    className="py-2 px-6 rounded-full font-medium transition-colors"
                    style={{ 
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.primary.contrast
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: theme.colors.accent.DEFAULT
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Support
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ 
              color: theme.colors.primary.DEFAULT,
              fontFamily: theme.fonts.header 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Workshop Location
          </motion.h2>

          <motion.div
            className="rounded-xl shadow-xl h-96 relative bg-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <FaMap className="text-5xl mx-auto mb-4" 
                    style={{ color: theme.colors.primary.DEFAULT }} 
                  />
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16254206.05650295!2d5.304653965624988!3d5.951674098355106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4168c50bc8!2sNigeria!5e0!3m2!1sen!2sng!4v1749997353844!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0, display: mapLoaded ? "block" : "none" }}
              allowFullScreen
              loading="lazy"
              title="Hudson's Furniture Workshop in Nigeria"
            ></iframe>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md text-center min-w-[200px]"
              style={{ backgroundColor: theme.colors.ui.base }}
            >
              <div className="text-4xl font-bold"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                10+
              </div>
              <div className="text-lg"
                style={{ color: theme.colors.text.primary }}
              >
                Master Craftsmen
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center min-w-[200px]"
              style={{ backgroundColor: theme.colors.ui.base }}
            >
              <div className="text-4xl font-bold"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                25+
              </div>
              <div className="text-lg"
                style={{ color: theme.colors.text.primary }}
              >
                Years Experience
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center min-w-[200px]"
              style={{ backgroundColor: theme.colors.ui.base }}
            >
              <div className="text-4xl font-bold"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                100%
              </div>
              <div className="text-lg"
                style={{ color: theme.colors.text.primary }}
              >
                Satisfaction Guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="py-16 px-4 w-full max-w-8xl mx-auto"
        style={{ backgroundColor: theme.colors.primary.DEFAULT }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            style={{ 
              color: theme.colors.primary.contrast,
              fontFamily: theme.fonts.header 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Studio Hours
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessHours.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl text-center border"
                style={{ 
                  backgroundColor: '#2D2420',
                  borderColor: '#453A35',
                  color: theme.colors.primary.contrast
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: theme.colors.accent.DEFAULT
                  }}
                >
                  <FaClock className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.day}</h3>
                <p>{item.hours}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg max-w-2xl mx-auto"
              style={{ color: theme.colors.primary.contrast }}
            >
              For personalized consultations beyond our regular hours, we're
              happy to accommodate evening appointments to discuss your bespoke
              furniture needs.
            </p>
            <motion.button
              onClick={() => setActiveTab("appointment")}
              className="mt-6 border-2 px-8 py-3 rounded-full font-medium text-lg transition-all duration-300"
              style={{ 
                borderColor: theme.colors.primary.contrast,
                color: theme.colors.primary.contrast
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: theme.colors.accent.DEFAULT,
                borderColor: theme.colors.accent.DEFAULT
              }}
              whileTap={{ scale: 0.95 }}
            >
              Request Evening Appointment
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4"
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, ${theme.colors.background.DEFAULT}, ${theme.colors.background.muted})`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ 
              color: theme.colors.primary.DEFAULT,
              fontFamily: theme.fonts.header 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experience Hudson Craftsmanship
          </motion.h2>
          <motion.div
            className="w-32 h-1 mx-auto my-6"
            style={{ backgroundColor: theme.colors.accent.DEFAULT }}
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: theme.colors.text.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Visit our showroom to touch, feel, and experience the quality that
            sets Hudson Furniture apart.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={() => setActiveTab("appointment")}
              className="py-3 px-8 rounded-full font-medium transition-colors"
              style={{ 
                backgroundColor: theme.colors.primary.DEFAULT,
                color: theme.colors.primary.contrast
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: theme.colors.accent.hover
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Private Tour
            </motion.button>
            <motion.button
              className="border-2 py-3 px-8 rounded-full font-medium transition-colors"
              style={{ 
                borderColor: theme.colors.primary.DEFAULT,
                color: theme.colors.primary.DEFAULT
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: theme.colors.primary.DEFAULT,
                color: theme.colors.primary.contrast
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Portfolio
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;