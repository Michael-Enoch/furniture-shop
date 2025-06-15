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
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="bg-[#F9F7F2] text-[#333333] overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center bg-black">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Crafted Connections
          </motion.h1>
          <motion.div
            className="w-32 h-1 bg-[#C5A880] mx-auto my-6"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          <motion.p
            className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto"
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
        <div className="flex border-b border-[#D4C8B0] overflow-x-auto">
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "contact"
                ? "text-[#2F4F4F] border-b-2 border-[#2F4F4F]"
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "faq"
                ? "text-[#2F4F4F] border-b-2 border-[#2F4F4F]"
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("appointment")}
            className={`py-4 px-6 text-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === "appointment"
                ? "text-[#2F4F4F] border-b-2 border-[#2F4F4F]"
                : "text-[#7A8C8C] hover:text-[#2F4F4F]"
            }`}
          >
            Book Appointment
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
                  className="text-3xl font-bold text-[#2F4F4F] mb-8"
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
                  <div className="bg-[#2F4F4F] text-[#C5A880] p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">
                      Artisan Workshop
                    </h3>
                    <p className="text-gray-700">
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
                  <div className="bg-[#2F4F4F] text-[#C5A880] p-3 rounded-full mr-4">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-700">
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
                  <div className="bg-[#2F4F4F] text-[#C5A880] p-3 rounded-full mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">
                      Email
                    </h3>
                    <p className="text-gray-700">
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
                  <h3 className="text-xl font-semibold text-[#2F4F4F] mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="w-12 h-12 rounded-full bg-[#2F4F4F] flex items-center justify-center hover:bg-[#C5A880] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFacebook className="text-[#F5F1E9] text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 rounded-full bg-[#2F4F4F] flex items-center justify-center hover:bg-[#C5A880] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram className="text-[#F5F1E9] text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 rounded-full bg-[#2F4F4F] flex items-center justify-center hover:bg-[#C5A880] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPinterest className="text-[#F5F1E9] text-xl" />
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-12 p-6 bg-[#F5F1E9] rounded-xl border border-[#D4C8B0]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-[#2F4F4F] mb-3">
                    Visit Our Showroom
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Experience our craftsmanship firsthand. Our showroom is open
                    by appointment for personalized consultations.
                  </p>
                  <button
                    onClick={() => setActiveTab("appointment")}
                    className="bg-[#2F4F4F] text-white py-2 px-6 rounded-full font-medium hover:bg-[#1E3E3E] transition-colors w-full"
                  >
                    Schedule a Visit
                  </button>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-3/5">
                <motion.h2
                  className="text-3xl font-bold text-[#2F4F4F] mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Let's Create Together
                </motion.h2>

                {submitSuccess ? (
                  <motion.div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center"
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
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[#D4C8B0]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 mb-2"
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
                          className={`w-full pl-10 pr-3 py-3 border ${
                            formErrors.name
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
                          placeholder="John Smith"
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
                        className="block text-gray-700 mb-2"
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
                          className={`w-full pl-10 pr-3 py-3 border ${
                            formErrors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
                          placeholder="john@example.com"
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
                      className="block text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        formErrors.subject
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
                      placeholder="How can we help you?"
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
                      className="block text-gray-700 mb-2"
                    >
                      Your Vision *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 border ${
                        formErrors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
                      placeholder="Tell us about your project or furniture needs..."
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
                      className="mr-3 w-5 h-5 accent-[#2F4F4F]"
                    />
                    <label htmlFor="brochure" className="text-gray-700">
                      Send me Hudson's furniture catalog
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#2F4F4F] to-[#1E3E3E] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
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
                className="text-3xl font-bold text-[#2F4F4F] mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 border border-[#D4C8B0]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-6">
                  {faqItems.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border-b border-[#E8DFD1] pb-6 last:border-0 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <div className="bg-[#2F4F4F] text-[#C5A880] p-2 rounded-full mr-4">
                          <FaQuestionCircle className="text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-700">{faq.answer}</p>
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
                  <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-700">
                    Didn't find the answer you were looking for? Our team is
                    ready to assist you.
                  </p>
                  <motion.button
                    onClick={() => setActiveTab("contact")}
                    className="bg-[#2F4F4F] text-white py-3 px-8 rounded-full font-medium hover:bg-[#1E3E3E] transition-colors"
                    whileHover={{ scale: 1.05 }}
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
                className="text-3xl font-bold text-[#2F4F4F] mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Schedule Your Visit
              </motion.h2>

              {submitSuccess ? (
                <motion.div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center"
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
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[#D4C8B0]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="date" className="block text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={appointmentData.date}
                        onChange={handleAppointmentChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.date ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <select
                        id="time"
                        name="time"
                        value={appointmentData.time}
                        onChange={handleAppointmentChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.time ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
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
                  <label htmlFor="service" className="block text-gray-700 mb-2">
                    Service Interest *
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={appointmentData.service}
                      onChange={handleAppointmentChange}
                      className={`w-full px-4 py-3 border ${
                        formErrors.service
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent`}
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
                  <label htmlFor="notes" className="block text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={appointmentData.notes}
                    onChange={handleAppointmentChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent"
                    placeholder="Tell us about your project or specific interests..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#2F4F4F] to-[#1E3E3E] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
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
        </AnimatePresence>
      </div>

      {/* Map Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-[#2F4F4F] mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Workshop Location
          </motion.h2>

          <motion.div
            className="rounded-xl overflow-hidden shadow-xl h-96 relative bg-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <FaMap className="text-5xl text-[#2F4F4F] mx-auto mb-4" />
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
            <div className="bg-white p-6 rounded-xl shadow-md text-center min-w-[200px]">
              <div className="text-4xl font-bold text-[#2F4F4F]">10+</div>
              <div className="text-lg text-gray-600">Master Craftsmen</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center min-w-[200px]">
              <div className="text-4xl font-bold text-[#2F4F4F]">25+</div>
              <div className="text-lg text-gray-600">Years Experience</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center min-w-[200px]">
              <div className="text-4xl font-bold text-[#2F4F4F]">100%</div>
              <div className="text-lg text-gray-600">
                Satisfaction Guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="py-16 px-4 w-full max-w-8xl mx-auto bg-[#F3EFEB] text-[#2D2D2D]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
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
                className="bg-[#3A5F5F] p-6 rounded-xl text-center border border-[#4A7F7F]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-[#2F4F4F] text-[#C5A880] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.day}</h3>
                <p className="text-[#E8DFD1]">{item.hours}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg max-w-2xl mx-auto text-[#E8DFD1]">
              For personalized consultations beyond our regular hours, we're
              happy to accommodate evening appointments to discuss your bespoke
              furniture needs.
            </p>
            <motion.button
              onClick={() => setActiveTab("appointment")}
              className="mt-6 border-2 border-white text-white px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:bg-[#C5A880] hover:border-[#C5A880]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Evening Appointment
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-[#F5F1E9] to-[#E8DFD1]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experience Hudson Craftsmanship
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-[#C5A880] mx-auto my-6"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          <motion.p
            className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
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
              className="bg-[#2F4F4F] text-white py-3 px-8 rounded-full font-medium hover:bg-[#1E3E3E] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Private Tour
            </motion.button>
            <motion.button
              className="border-2 border-[#2F4F4F] text-[#2F4F4F] py-3 px-8 rounded-full font-medium hover:bg-[#2F4F4F] hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
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
