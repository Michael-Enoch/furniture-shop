import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import theme from "../context/Theme";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div
      className="w-full max-w-screen-2xl mx-auto"
      style={{ backgroundColor: "#F3EFEB", color: "#2D2D2D", fontFamily: theme.fonts.body }}
    >
      {/* Hero Section */}
      <div
        className="relative min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundColor: "#3A2F2A", // fallback
          color: "#F8F5F2",
        }}
      >
        {/* overlay if needed */}
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1
      className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide"
      style={{ fontFamily: theme.fonts.header }}
    >
      Get In Touch
    </h1>
          <div className="w-32 h-1 bg-[#BF6E3D] mx-auto my-6"></div>
          <p className="text-xl md:text-2xl text-[#E8DFD1] max-w-2xl mx-auto"
          >
            We're here to answer your questions and help you find the perfect
            piece
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section
        className="w-full py-16 bg-[#F3EFEB] px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-[#3A2F2A] mb-8">
              Contact Information
            </h2>

            {[
              {
                icon: FaMapMarkerAlt,
                label: "Our Workshop",
                content: (
                  <>
                    123 Design Avenue
                    <br />
                    Brooklyn, NY 11201
                    <br />
                    United States
                  </>
                ),
              },
              {
                icon: FaPhone,
                label: "Phone",
                content: (
                  <>
                    (212) 555-7890
                    <br />
                    Mon–Fri, 9am–6pm
                  </>
                ),
              },
              {
                icon: FaEnvelope,
                label: "Email",
                content: (
                  <>
                    info@hudsons.com
                    <br />
                    inquiries@hudsons.com
                  </>
                ),
              },
              // eslint-disable-next-line no-unused-vars
            ].map(({ icon: Icon, label, content }, i) => (
              <div key={i} className="mb-6 flex items-start">
                <div className="p-3 bg-[#3A2F2A] text-[#A65A2E] rounded-full mr-4">
                  <Icon className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3A2F2A] mb-1">
                    {label}
                  </h3>
                  <p className="text-[#2D2D2D]">{content}</p>
                </div>
              </div>
            ))}

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-[#3A2F2A] mb-3">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {[FaFacebook, FaInstagram, FaPinterest].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#3A2F2A] flex items-center justify-center hover:bg-[#A65A2E] transition"
                  >
                    <Icon className="text-white text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-[#3A2F2A] mb-8">
              Send Us a Message
            </h2>

            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <FaEnvelopeOpen className="mr-3 text-xl" />
                <span>
                  Thank you for your message! We'll get back to you soon.
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  {
                    id: "name",
                    label: "Your Name",
                    type: "text",
                    icon: FaUser,
                    placeholder: "John Smith",
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    type: "email",
                    icon: FaEnvelope,
                    placeholder: "john@example.com",
                  },
                  // eslint-disable-next-line no-unused-vars
                ].map(({ id, label, type, icon: Icon, placeholder }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block text-[#2D2D2D] font-medium mb-2"
                    >
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                        <Icon />
                      </div>
                      <input
                        type={type}
                        id={id}
                        name={id}
                        value={formData[id]}
                        onChange={handleChange}
                        required
                        placeholder={placeholder}
                        className="w-full pl-10 pr-3 py-3 border border-[#DAD4CE] rounded-lg focus:ring-2 focus:ring-[#A65A2E] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-[#2D2D2D] font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-[#DAD4CE] rounded-lg focus:ring-2 focus:ring-[#A65A2E] focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-[#2D2D2D] font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project or inquiry..."
                  className="w-full min-h-[150px] md:min-h-[180px] max-h-[300px] px-4 py-3 border border-[#DAD4CE] rounded-lg resize-y focus:ring-2 focus:ring-[#A65A2E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3A2F2A] text-white py-3 rounded-lg font-semibold hover:bg-[#2D2D2D] transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      {/* Map Section */}
      <div
        className="py-16 px-4 w-full max-w-8xl mx-auto"
        style={{ backgroundColor: "#F3EFEB" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-8 text-center">
            Visit Our Workshop
          </h2>
          <div
            className="rounded-2xl w-full shadow-xl overflow-hidden h-96 border"
            style={{ borderColor: "#DAD4CE" }}
          >
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
      <div
        className="py-16 px-4 w-full max-w-8xl mx-auto"
        style={{ backgroundColor: "#EAE6E1", color: "#2D2D2D" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2D2D2D]">
            Business Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
              { label: "Saturday", time: "10:00 AM - 4:00 PM" },
              { label: "Sunday", time: "Closed" },
              { label: "By Appointment", time: "Available evenings" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl text-center shadow-md"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #DAD4CE",
                }}
              >
                <div className="bg-[#EFEAE5] text-[#2D2D2D] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FaClock className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                <p>{item.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg max-w-2xl mx-auto text-[#2D2D2D]">
              We recommend scheduling an appointment for personalized
              consultations to ensure we can give you our undivided attention.
            </p>
            <button
              className="mt-6 px-8 py-3 rounded-full font-medium text-lg transition-all duration-300"
              style={{
                border: "2px solid #2D2D2D",
                color: "#2D2D2D",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#EFEAE5";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              Schedule an Appointment
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-8xl mx-auto bg-[#3A2F2A] text-white py-16 text-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          Let's Create Your Dream Space
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Tell us about your vision — our designers are ready to collaborate
          with you.
        </p>
        <a
          href="/shop"
          className="inline-block bg-[#A65A2E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#874823] transition-colors"
        >
          Start Shopping
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
