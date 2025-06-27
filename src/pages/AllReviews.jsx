// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import theme from "../context/Theme";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import Breadcrumbs from "../components/BreadCrumbs";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Real-time fetch reviews
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "reviews"),
      (snapshot) => {
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sorted = fetchedReviews.sort(
          (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
        );

        setReviews(sorted);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section
      className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 flex flex-col gap-8"
      style={{ background: theme.colors.background.DEFAULT }}
    >
      {/* Breadcrumb */}
      <Breadcrumbs/>

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center">Customer Reviews</h2>

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {reviews.length === 0 ? (
          <p className="text-center col-span-full">No reviews yet.</p>
        ) : (
          reviews.map((r, i) => (
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
                    fill={
                      idx < r.rating ? theme.colors.accent.DEFAULT : "none"
                    }
                    color={
                      idx < r.rating
                        ? theme.colors.accent.DEFAULT
                        : theme.colors.ui.border
                    }
                  />
                ))}
              </div>
              <h4 className="font-semibold text-sm text-[#A65A2E]">
                — {r.name}
              </h4>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default AllReviews;
