// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import theme from "../context/Theme";
import { toast } from "react-hot-toast";
import { db } from "../../Firebase/firebase";

const CustomersReviewsForm = ({ sectionIndex = 7 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quote: "",
    rating: 5,
  });

  const maxDisplay = 6;
const displayedReviews = reviews.slice(0, maxDisplay);

  // Real-time fetch reviews from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "reviews"),
      (snapshot) => {
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort by timestamp  (latest first)
        const sorted = fetchedReviews.sort(
          (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
        );

        setReviews(sorted);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  //  Submit review to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quote || !formData.rating) return;

    try {
      await addDoc(collection(db, "reviews"), {
        name: formData.name,
        quote: formData.quote,
        rating: formData.rating,
        createdAt: serverTimestamp(),
      });

      setFormData({ name: "", quote: "", rating: 5 });
      setIsModalOpen(false);
      toast.success("Review submitted!");
    } catch (error) {
      console.error("Error adding review: ", error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <section
      className="w-full max-w-screen-2xl flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:px-12 lg:px-16 py-16 mx-auto"
      style={{ background: bgColor }}
    >
      <h2 className="text-3xl font-bold text-center">
        What Our Customers Say
      </h2>

      <div className="w-full mb-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {displayedReviews.map((r, i) => (
          <motion.div
            key={r.id}
            className="p-6 bg-white rounded-xl shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-700 italic mb-4">“{r.quote}”</p>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={16}
                  fill={idx < r.rating ? theme.colors.accent.DEFAULT : "none"}
                  color={
                    idx < r.rating
                      ? theme.colors.accent.DEFAULT
                      : theme.colors.ui.border
                  }
                />
              ))}
            </div>
            <h4 className="font-semibold text-sm text-[#A65A2E]">— {r.name}</h4>
          </motion.div>
        ))}
      </div>

      {reviews.length > maxDisplay && (
  <div data-aos="fade-up my-2">
    <Link
      to="/reviews"
      className="inline-block text-white py-2 px-6 rounded-lg transition-colors"
      style={{ background: theme.colors.accent.DEFAULT }}
    >
      See All Reviews
    </Link>
  </div>
)}


      <div
        className="bg-white rounded-xl w-full shadow p-8 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-3">Share Your Experience</h2>
        <p className="text-sm mb-5">
          We love hearing from our customers! Drop a quick review and let others
          know what to expect.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block text-white py-3 px-6 rounded-lg transition-colors"
          style={{ background: theme.colors.primary.DEFAULT }}
        >
          Submit a Review
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="bg-white rounded-xl shadow p-6 w-full max-w-md relative"
            data-aos="zoom-in"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4">Submit Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quote</label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border rounded px-3 py-2 text-sm"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white py-2 rounded-lg"
                style={{ background: theme.colors.primary.DEFAULT }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomersReviewsForm;
