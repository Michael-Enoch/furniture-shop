import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import theme from "../context/Theme";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "What is your return policy?",
    answer:
      "We offer free returns within 30 days of purchase. Conditions apply.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping costs and times vary based on location.",
  },
  {
    question: "What materials do you use?",
    answer: "We use sustainably sourced hardwoods and eco-friendly finishes.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use end-to-end encryption and secure gateways.",
  },
];

const FAQ = ({ sectionIndex = 8 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      className="py-16 px-4 sm:px-8 md:px-16 max-w-8xl w-full mx-auto"
      style={{
        background: bgColor,
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
      }}
    >
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{
            fontFamily: theme.fonts.header,
            color: theme.colors.primary.DEFAULT,
          }}
        >
          Frequently Asked Questions
        </h2>

        <motion.div layout className="space-y-4">
          {faqItems.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                layout
                transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                className="bg-white border border-[#DAD4CE] rounded-xl shadow"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 focus:outline-none"
                >
                  <span className="text-left font-medium text-base sm:text-lg">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <Minus size={20} color={theme.colors.accent.DEFAULT} />
                  ) : (
                    <Plus size={20} color={theme.colors.accent.DEFAULT} />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="px-5 pb-4"
                    >
                      <p className="text-sm text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            to="/faq"
            className="text-sm font-medium"
            style={{ color: theme.colors.accent.DEFAULT }}
          >
            View all FAQs →
          </Link>
        </div>
    </section>
  );
};

export default FAQ;
