import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import theme from "../context/Theme";

const faqData = [
  {
    category: "Orders & Returns",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery. Items must be unused and in their original packaging. Custom orders are non-refundable. To initiate a return, contact our support team with your order number.",
      },
      {
        question: "How do I cancel my order?",
        answer:
          "Orders can be canceled within 24 hours of placement. After this period, we begin processing. Contact support immediately if you need to cancel or change details.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship worldwide. International shipping costs and delivery times vary by destination. All duties and taxes are the responsibility of the customer.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "For in-stock items, delivery within Nigeria takes 3–7 business days. International and custom orders may take 2–6 weeks depending on complexity and location.",
      },
    ],
  },
  {
    category: "Product & Materials",
    items: [
      {
        question: "What materials do you use?",
        answer:
          "We use premium, sustainably sourced hardwoods such as oak and walnut, high-density foams, and eco-certified fabrics. All finishes are VOC-free and environmentally safe.",
      },
      {
        question: "Can I request a custom size or finish?",
        answer:
          "Absolutely. Our design team works closely with you to tailor furniture dimensions, finishes, and fabrics to your needs. Customizations may affect price and lead time.",
      },
    ],
  },
  {
    category: "Security & Payments",
    items: [
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. Our site uses SSL encryption, and all transactions are processed through PCI-compliant gateways like Stripe and Paystack. We do not store your payment details.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, MasterCard, Verve, Paystack, Stripe, and bank transfers. For custom orders, partial payments are available.",
      },
    ],
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState({});

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggle = (categoryIndex, itemIndex) => {
    const isOpen = openIndex[categoryIndex] === itemIndex;
    setOpenIndex({ [categoryIndex]: isOpen ? null : itemIndex });
  };

  return (
    <main
      className="py-16 px-6 max-w-7xl mx-auto"
      style={{
        background: theme.colors.background.DEFAULT,
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
      }}
    >
      <h1
        className="text-4xl font-bold mb-12 text-center"
        style={{
          fontFamily: theme.fonts.header,
          color: theme.colors.primary.DEFAULT,
        }}
      >
        Frequently Asked Questions
      </h1>

      {faqData.map((section, categoryIndex) => (
        <section key={categoryIndex} className="mb-10">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: theme.colors.accent.DEFAULT }}
          >
            {section.category}
          </h2>

          <motion.div layout className="space-y-4">
            {section.items.map((faq, itemIndex) => {
              const isOpen = openIndex[categoryIndex] === itemIndex;

              return (
                <motion.div
                  key={itemIndex}
                  layout
                  transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                  className="bg-white border border-[#DAD4CE] rounded-xl shadow"
                >
                  <button
                    onClick={() => toggle(categoryIndex, itemIndex)}
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
                        transition={{ duration: 0.25 }}
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
        </section>
      ))}
    </main>
  );
};

export default FaqPage;
