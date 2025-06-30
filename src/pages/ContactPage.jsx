import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaPaperPlane,
  FaUser,
  FaEnvelopeOpen,
  FaMap,
  FaCalendarAlt,
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import theme from "../context/Theme";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="text-[#2D2D2D] w-full max-w-screen-2xl text-center mx-auto"
      style={{
        backgroundColor: theme.colors.background.DEFAULT,
        fontFamily: theme.fonts.body,
      }}
    >
      {/* Hero Section */}
      <div className="w-full h-[500px] lg:h-[500px] flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1563512449174-5e39364a2f33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="bg-black/80 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-8 py-10 md:py-16 text-center md:text-left space-y-6">
            <motion.h4
              className="text-4xl md:text-6xl font-medium mb-6 tracking-wide"
              style={{ fontFamily: theme.fonts.header, color:theme.colors.primary.contrast }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Connect With The Hudson Team
            </motion.h4>
            <motion.div
              className="w-32 h-1 mx-auto "
              style={{ backgroundColor: theme.colors.accent.DEFAULT }}
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.div>
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              style={{ color:theme.colors.text.onPrimary}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Let's discuss your bespoke furniture journey
            </motion.p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto w-full px-4 mt-8">
        <div
          className="flex w-full items-start border-b"
          style={{ borderColor: theme.colors.ui.border }}
        >
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-4 px-6 text-md font-medium transition-colors ${
              activeTab === "contact"
                ? `text-[${theme.colors.text.primary}] border-b-2`
                : `opacity-50`
            }`}
            style={{
              borderBottomColor:
                activeTab === "contact"
                  ? theme.colors.primary.DEFAULT
                  : "transparent",
              fontFamily: theme.fonts.ui,
            }}
          >
            Contact Us
          </button>

          <button
            onClick={() => setActiveTab("appointment")}
            className={`py-4 px-6 text-md font-medium transition-colors${
              activeTab === "appointment"
                ? `text-[${theme.colors.text.primary}] border-b-2`
                : `opacity-50`
            }`}
            style={{
              borderBottomColor:
                activeTab === "appointment"
                  ? theme.colors.primary.DEFAULT
                  : "transparent",
              fontFamily: theme.fonts.ui,
            }}
          >
            Book Appointment
          </button>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8 max-w-6xl  mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-6 w-full max-w-8xl mx-auto"
            >
              <div className="flex flex-col flex-1/2 max-w-8xl w-full gap-6">
                <motion.h2
                  className="text-3xl text-left font-bold"
                  style={{
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Our Studio
                </motion.h2>

                <motion.div
                  className="flex flex-row items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full mr-4"
                    style={{
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.accent.DEFAULT,
                    }}
                  >
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      Artisan Workshop
                    </h3>
                    <div
                      className="flex flex-col items-start space-y-1"
                      style={{ color: theme.colors.text.primary }}
                    >
                      <p>123 Design Avenue</p>
                      <p>Lagos, Nigeria</p>
                      <p>West Africa</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-row items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full mr-4"
                    style={{
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.accent.DEFAULT,
                    }}
                  >
                    <FaPhone size={18} />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      Phone
                    </h3>
                    <div
                      className="flex flex-col items-start space-y-1"
                      style={{ color: theme.colors.text.primary }}
                    >
                      <p>+234 (0) 812 345 6789</p>
                      <p>Mon-Fri, 9am-6pm WAT</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-row items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full mr-4"
                    style={{
                      backgroundColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.accent.DEFAULT,
                    }}
                  >
                    <FaEnvelope size={18} />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      Email
                    </h3>
                    <div
                      className="flex flex-col items-start space-y-1"
                      style={{ color: theme.colors.text.primary }}
                    >
                      <p>husdon@gmail.com</p>
                      <p>inquiries_hudson@gmail.com</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  >
                    Connect With Us
                  </h3>
                  <div className="flex flex-row space-x-2">
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: theme.colors.primary.DEFAULT,
                        color: theme.colors.accent.DEFAULT,
                      }}
                      whileHover={{
                        backgroundColor: theme.colors.accent.hover,
                        color: theme.colors.primary.contrast,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFacebookF size={18} />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: theme.colors.primary.DEFAULT,
                        color: theme.colors.accent.DEFAULT,
                      }}
                      whileHover={{
                        backgroundColor: theme.colors.accent.hover,
                        color: theme.colors.primary.contrast,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram size={18} />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: theme.colors.primary.DEFAULT,
                        color: theme.colors.accent.DEFAULT,
                      }}
                      whileHover={{
                        backgroundColor: theme.colors.accent.hover,
                        color: theme.colors.primary.contrast,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPinterest size={18} />
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  className="p-6 rounded-xl border"
                  style={{
                    borderColor: theme.colors.ui.border,
                    color: theme.colors.text.primary,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-3">
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
                      color: theme.colors.primary.contrast,
                    }}
                  >
                    Schedule a Visit
                  </button>
                </motion.div>
              </div>

              <div className="flex flex-col max-w-8xl space-y-4 w-full flex-1/2">
                <motion.h2
                  className="text-center text-2xl w-full max-w-screen md:text-3xl font-bold"
                  style={{
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Let's Create Together
                </motion.h2>

                {submitSuccess ? (
                  <motion.div
                    className="border px-4 py-3 rounded w-full mx-auto flex items-center"
                    style={{
                      backgroundColor: "#F0FDF4",
                      borderColor: "#BBF7D0",
                      color: "#166534",
                    }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <FaEnvelopeOpen size={15} />
                    <span className="text-sm w-full">
                      Thank you for your message! Our design team will contact
                      you within 24 hours.
                    </span>
                  </motion.div>
                ) : null}

                <motion.form
                  onSubmit={handleSubmit}
                  className="rounded-xl shadow-lg border-1 space-y-6 flex flex-col w-full px-8 py-8"
                  style={{
                    backgroundColor: theme.colors.ui.base,
                    borderColor: theme.colors.ui.border,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex w-full text-left flex-col space-y-2">
                      <label
                        htmlFor="name"
                        className="block w-full"
                        style={{ color: theme.colors.text.primary }}
                      >
                        Your Name *
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
                          <FaUser size={15} className="text-gray-400 w-full" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-9 py-3 rounded-lg text-sm 
                            bg-[${theme.colors.ui.base}] 
                            border-[#DAD4CE]
                            border
                            focus:ring-2 
                            focus:ring-[${theme.colors.accent.DEFAULT}] 
                            focus:outline-none 
                            placeholder:text-[#2D2D2D]
                            placeholder:opacity-50
                            ${
                              formErrors.name
                                ? "border-red-500"
                                : "border-[${theme.colors.ui.border}]"
                            }
                          `}
                          placeholder="Michael Enoch"
                          style={{
                            fontFamily: theme.fonts.ui,
                            borderColor: formErrors.name
                              ? "#EF4444"
                              : theme.colors.ui.border,
                            backgroundColor: theme.colors.ui.base,
                            color: theme.colors.text.primary,
                          }}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-red-500 text-left text-sm mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex w-full text-left flex-col space-y-2">
                      <label
                        htmlFor="email"
                        className="block w-full"
                        style={{ color: theme.colors.text.primary }}
                      >
                        Email Address *
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
                          <FaEnvelope
                            size={15}
                            className="text-gray-400 w-full"
                          />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-9 py-3 rounded-lg text-sm 
                            bg-[${theme.colors.ui.base}] 
                            border-[#DAD4CE]
                            border
                            focus:ring-2 
                            focus:ring-[${theme.colors.accent.DEFAULT}] 
                            focus:outline-none 
                            placeholder:text-[#2D2D2D]
                            placeholder:opacity-50
                            ${
                              formErrors.name
                                ? "border-red-500"
                                : "border-[${theme.colors.ui.border}]"
                            }
                          `}
                          placeholder="michael08@gmail.com"
                          style={{
                            fontFamily: theme.fonts.ui,
                            borderColor: formErrors.name
                              ? "#EF4444"
                              : theme.colors.ui.border,
                            backgroundColor: theme.colors.ui.base,
                            color: theme.colors.text.primary,
                          }}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-500 text-left text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col text-left space-y-2">
                    <label
                      htmlFor="subject"
                      className="block w-full"
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
                      className={`w-full px-4 py-3 rounded-lg text-sm 
                      bg-[${theme.colors.ui.base}] 
                     border-[#DAD4CE]
                      border
                      focus:ring-2 
                      focus:ring-[${theme.colors.accent.DEFAULT}] 
                      focus:outline-none 
                      placeholder:text-[#2D2D2D]
                      placeholder:opacity-50
                      ${
                        formErrors.name
                          ? "border-red-500"
                          : "border-[${theme.colors.ui.border}]"
                      }
                    `}
                      placeholder="Your Subject"
                      style={{
                        fontFamily: theme.fonts.ui,
                        borderColor: formErrors.name
                          ? "#EF4444"
                          : theme.colors.ui.border,
                        backgroundColor: theme.colors.ui.base,
                        color: theme.colors.text.primary,
                      }}
                    />
                    {formErrors.subject && (
                      <p className="text-red-500 text-left text-sm mt-1">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col text-left space-y-2">
                    <label
                      htmlFor="message"
                      className="block w-full"
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
                      className={`w-full px-4 py-3 rounded-lg text-sm
                        bg-[${theme.colors.ui.base}] 
                        border-[#DAD4CE]
                        border
                        focus:ring-2 
                        focus:ring-[${theme.colors.accent.DEFAULT}] 
                        focus:outline-none 
                        placeholder:text-[#2D2D2D]
                        placeholder:opacity-50
                        ${
                          formErrors.name
                            ? "border-red-500"
                            : "border-[${theme.colors.ui.border}]"
                        }
                      `}
                      placeholder="Your Vision"
                      style={{
                        fontFamily: theme.fonts.ui,
                        borderColor: formErrors.name
                          ? "#EF4444"
                          : theme.colors.ui.border,
                        backgroundColor: theme.colors.ui.base,
                        color: theme.colors.text.primary,
                      }}
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-[#F8F5F2] py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                    style={{
                      backgroundColor: theme.colors.primary.DEFAULT,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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

          {activeTab === "appointment" && (
            <motion.div
              key="appointment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl flex flex-col space-y-4 w-full mx-auto"
            >
              <motion.h2
                className="text2xl md:text-3xl font-bold text-center"
                style={{
                  color: theme.colors.primary.DEFAULT,
                  fontFamily: theme.fonts.header,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Schedule Your Visit
              </motion.h2>

              {submitSuccess ? (
                <motion.div
                  className="border px-4 py-3 rounded w-full mx-auto flex items-center"
                  style={{
                    backgroundColor: "#F0FDF4",
                    borderColor: "#BBF7D0",
                    color: "#166534",
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <FaCalendarAlt size={15} />
                  <span className="text-sm w-full">
                    Your appointment has been scheduled! We'll send confirmation
                    details to your email.
                  </span>
                </motion.div>
              ) : null}

              <motion.form
                onSubmit={handleAppointmentSubmit}
                className="rounded-xl shadow-lg border-1 space-y-6 flex flex-col w-full px-8 py-8"
                style={{
                  backgroundColor: theme.colors.ui.base,
                  borderColor: theme.colors.ui.border,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col space-y-2 text-left">
                    <label
                      htmlFor="date"
                      className="block w-full"
                      style={{ color: theme.colors.text.primary }}
                    >
                      Preferred Date *
                    </label>
                    <div className="relative w-full">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={appointmentData.date}
                        onChange={handleAppointmentChange}
                        className={`w-full px-4 py-3 rounded-lg text-sm 
                      bg-[${theme.colors.ui.base}] 
                     border-[#DAD4CE]
                      border
                      focus:ring-2 
                      focus:ring-[${theme.colors.accent.DEFAULT}] 
                      focus:outline-none 
                      placeholder:text-[#2D2D2D]
                      placeholder:opacity-50
                      ${
                        formErrors.date
                          ? "border-red-500"
                          : "border-[${theme.colors.ui.border}]"
                      }
                    `}
                        min={new Date().toISOString().split("T")[0]}
                        style={{
                          fontFamily: theme.fonts.ui,
                          borderColor: formErrors.date
                            ? "#EF4444"
                            : theme.colors.ui.border,
                          backgroundColor: theme.colors.ui.base,
                          color: theme.colors.text.primary,
                        }}
                      />
                    </div>
                    {formErrors.date && (
                      <p className="text-red-500 text-left text-sm mt-1">
                        {formErrors.date}
                      </p>
                    )}
                  </div>

                  <div className="w-full text-left flex flex-col space-y-2">
                    <label
                      htmlFor="time"
                      className="block w-full"
                      style={{ color: theme.colors.text.primary }}
                    >
                      Preferred Time *
                    </label>
                    <div className="relative w-full">
                      <select
                        id="time"
                        name="time"
                        value={appointmentData.time}
                        onChange={handleAppointmentChange}
                        className={`w-full px-4 py-3 rounded-lg text-sm 
                      bg-[${theme.colors.ui.base}] 
                     border-[#DAD4CE]
                      border
                      focus:ring-2 
                      focus:ring-[${theme.colors.accent.DEFAULT}] 
                      focus:outline-none 
                      placeholder:text-[#2D2D2D]
                      placeholder:opacity-50
                      ${
                        formErrors.time
                          ? "border-red-500"
                          : "border-[${theme.colors.ui.border}]"
                      }
                    `}
                        style={{
                          fontFamily: theme.fonts.ui,
                          borderColor: formErrors.time
                            ? "#EF4444"
                            : theme.colors.ui.border,
                          backgroundColor: theme.colors.ui.base,
                          color: theme.colors.text.primary,
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
                      <p className="text-red-500 text-left text-sm mt-1">
                        {formErrors.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col space-y-2 text-left">
                  <label
                    htmlFor="service"
                    className="block w-full"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Service Interest *
                  </label>
                  <div className="relative w-full">
                    <select
                      id="service"
                      name="service"
                      value={appointmentData.service}
                      onChange={handleAppointmentChange}
                      className={`w-full px-4 py-3 rounded-lg text-sm 
                      bg-[${theme.colors.ui.base}] 
                     border-[#DAD4CE]
                      border
                      focus:ring-2 
                      focus:ring-[${theme.colors.accent.DEFAULT}] 
                      focus:outline-none 
                      placeholder:text-[#2D2D2D]
                      placeholder:opacity-50
                      ${
                        formErrors.service
                          ? "border-red-500"
                          : "border-[${theme.colors.ui.border}]"
                      }
                    `}
                      style={{
                        fontFamily: theme.fonts.ui,
                        borderColor: formErrors.service
                          ? "#EF4444"
                          : theme.colors.ui.border,
                        backgroundColor: theme.colors.ui.base,
                        color: theme.colors.text.primary,
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
                    <p className="text-red-500 text-left text-sm mt-1">
                      {formErrors.service}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col space-y-2 text-left">
                  <label
                    htmlFor="notes"
                    className="block w-full"
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
                    className={`w-full px-4 py-3 rounded-lg text-sm 
                      bg-[${theme.colors.ui.base}] 
                     border-[#DAD4CE]
                      border
                      focus:ring-2 
                      focus:ring-[${theme.colors.accent.DEFAULT}] 
                      focus:outline-none 
                      placeholder:text-[#2D2D2D]
                      placeholder:opacity-50
                    `}
                    placeholder="Tell us about your project or specific interests..."
                    style={{
                      borderColor: theme.colors.ui.border,
                    }}
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
      <div
        className="max-w-screen-2xl w-full py-16 px-12 flex flex-col space-y-8 mx-auto"
        style={{
          backgroundColor: theme.colors.background.muted,
        }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Workshop Location
        </motion.h2>

        <motion.div
          className="rounded-xl shadow-xl h-96 relative w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center text-center w-full justify-center">
              <div className=" flex flex-row gap-6 items-center justify-center">
                <FaMap
                  className="text-5xl mx-auto"
                  style={{ color: theme.colors.accent.DEFAULT }}
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
          className="flex flex-wrap flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div
            className="bg-white px-5 py-5 flex flex-col gap-2 rounded-lg shadow-md text-center min-w-[200px]"
            style={{ backgroundColor: theme.colors.ui.base }}
          >
            <div
              className="text-3xl font-bold"
              style={{ color: theme.colors.text.primary }}
            >
              10+
            </div>
            <div
              className="text-md"
              style={{ color: theme.colors.text.primary }}
            >
              Master Craftsmen
            </div>
          </div>
          <div
            className="bg-white px-5 py-5 flex flex-col gap-2 rounded-lg shadow-md text-center min-w-[200px]"
            style={{ backgroundColor: theme.colors.ui.base }}
          >
            <div
              className="text-3xl font-bold"
              style={{ color: theme.colors.text.primary }}
            >
              25+
            </div>
            <div
              className="text-md"
              style={{ color: theme.colors.text.primary }}
            >
              Years Experience
            </div>
          </div>
          <div
            className="bg-white px-5 py-5 flex flex-col gap-2 rounded-lg shadow-md text-center min-w-[200px]"
            style={{ backgroundColor: theme.colors.ui.base }}
          >
            <div
              className="text-3xl font-bold"
              style={{ color: theme.colors.text.primary }}
            >
              100%
            </div>
            <div
              className="text-md"
              style={{ color: theme.colors.text.primary }}
            >
              Satisfaction Guaranteed
            </div>
          </div>
        </motion.div>
      </div>

      {/* Business Hours */}
      <div
        className="max-w-screen-2xl w-full py-16 px-12 flex flex-col space-y-8 mx-auto"
        style={{
          backgroundColor: theme.colors.background.DEFAULT,
        }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center"
          style={{
            color: theme.colors.text.primary,
            fontFamily: theme.fonts.header,
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
                backgroundColor: theme.colors.ui.base,
                borderColor: theme.colors.ui.border,
                color: theme.colors.text.primary,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                style={{
                  backgroundColor: theme.colors.primary.DEFAULT,
                  color: theme.colors.accent.DEFAULT,
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
          className="flex flex-col items-center justify-center space-y-8 text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p
            className="w-full text-md max-w-3xl mx-auto"
          >
            For personalized consultations beyond our regular hours, we're happy
            to accommodate evening appointments to discuss your tailored
            furniture needs.
          </p>
          <motion.button
            onClick={() => setActiveTab("appointment")}
            className="border-2 px-8 py-3 rounded-full font-medium text-md transition-all duration-300"
            style={{
              borderColor: theme.colors.ui.border,
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: theme.colors.primary.DEFAULT,
              borderColor: theme.colors.ui.border,
              color: theme.colors.primary.contrast
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book an Appointment
          </motion.button>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div
        className="max-w-screen-2xl w-full py-16 px-12 flex flex-col space-y-8 border-b mx-auto"
        style={{
          backgroundColor: theme.colors.primary.DEFAULT,
          borderColor: theme.colors.ui.border,
        }}
      >
          <motion.h2
            className="text-2xl md:text-3xl font-bold"
            style={{
              color: theme.colors.primary.contrast,
              fontFamily: theme.fonts.header,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experience Hudson Craftsmanship
          </motion.h2>
          <motion.div
            className="w-32 h-1 mx-auto"
            style={{ backgroundColor: theme.colors.accent.DEFAULT }}
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          <motion.p
            className="w-full text-md md:text-lg max-w-2xl mx-auto"
            style={{ color: theme.colors.primary.contrast }}
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
                backgroundColor: theme.colors.accent.DEFAULT,
                color: theme.colors.primary.contrast,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: theme.colors.accent.hover,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Private Tour
            </motion.button>
          </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
