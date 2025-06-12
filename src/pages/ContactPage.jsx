

import React, { useState, useEffect } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const title = document.getElementById("home-title");
    if (title) title.classList.add("fadeSlideIn");
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          background-color: #f5f8fa;
          color: #333;
        }

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fadeSlideIn {
          animation: fadeSlideUp 1s ease forwards;
        }

        button:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        input:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 8px #007bff;
          border-color: #007bff;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        footer {
          animation: fadeSlideUp 1.5s ease forwards;
          opacity: 0;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }
      `}</style>

      

      <section id="home" style={styles.homeSection}>
        <h1 id="home-title" style={styles.homeTitle}>
          Welcome to Our Website
        </h1>
        <p style={styles.homeDesc}>
          We’re glad you’re here! Explore our site and feel free to reach out below.We are very happy to help.
        </p>
      </section>

      <section id="contact" style={styles.contactSection}>
        <h2 style={styles.contactHeading}>Contact Us</h2>
        {submitted && (
          <div style={styles.successMessage}>
            Thanks for reaching out! We will get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate style={styles.form}>
          <label style={styles.label} htmlFor="name">
            Name
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <label style={styles.label} htmlFor="subject">
            Subject
          </label>
          <input
            style={styles.input}
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <p style={styles.error}>{errors.subject}</p>}

          <label style={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            style={{ ...styles.input, height: "100px" }}
            id="message"
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p style={styles.error}>{errors.message}</p>}

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>

        <div style={styles.contactMapContainer}>
          <div style={styles.contactInfo}>
            <p><strong>Email:</strong> support@example.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Main St, Your City, Country</p>
          </div>
          <div style={styles.mapWrapper}>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0865987414576!2d-122.41941568468277!3d37.77492977975888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b5a5a37%3A0xb8824cbb9e2e9ab2!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sus!4v1696441469023!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p>© 2025 Your Company. All rights reserved.</p>
        <div style={styles.socialLinks}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialLink}>
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialLink}>
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialLink}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  homeSection: {
    minHeight: "100vh",
    paddingTop: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f8fa",
    textAlign: "center",
    padding: "0 20px",
  },
  homeTitle: {
    fontSize: "3rem",
    color: "#333",
    marginBottom: 20,
    opacity: 0,
  },
  homeDesc: {
    fontSize: "1.25rem",
    color: "#555",
    maxWidth: 600,
  },
  contactSection: {
    maxWidth: 800,
    margin: "40px auto 80px",
    padding: 30,
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Poppins', sans-serif",
  },
  contactHeading: {
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },
  input: {
    padding: "10px 12px",
    fontSize: 14,
    marginBottom: 18,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontFamily: "inherit",
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
  },
  button: {
    padding: 12,
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: 16,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.3s ease",
  },
  error: {
    color: "red",
    marginTop: -14,
    marginBottom: 14,
    fontSize: 12,
  },
  contactMapContainer: {
    display: "flex",
    gap: 20,
    marginTop: 30,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  contactInfo: {
    flex: "1 1 300px",
    fontSize: 14,
    color: "#666",
    lineHeight: 1.6,
  },
  mapWrapper: {
    flex: "1 1 300px",
    minWidth: 300,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  successMessage: {
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: 4,
    padding: "10px 15px",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },

  footer: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "20px 10px",
    textAlign: "center",
    marginTop: 40,
    opacity: 0,
  },
  footerContent: {
    maxWidth: 900,
    margin: "0 auto",
  },
  socialLinks: {
    marginTop: 8,
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },
  socialLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
  },
};
export default ContactPage;