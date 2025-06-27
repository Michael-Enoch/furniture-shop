import { useState } from "react";
import { Star } from "lucide-react";
import theme from "../context/Theme";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useAuth } from "../context/AuthContext";

const ReviewForm = ({ productId }) => {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [success, setSuccess] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !text.trim()) return;

    const reviewId = Date.now().toString();
    const reviewRef = doc(db, "products", productId, "reviews", reviewId);

    const newReview = {
      id: reviewId,
      productId,
      userId: currentUser?.uid || "guest",
      userName,
      comment: text,
      rating,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(reviewRef, newReview);
      setSuccess(true);
      setUserName("");
      setText("");
      setRating(5);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("❌ Failed to submit review:", err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white p-4 rounded-xl shadow space-y-3"
    >
      <h3 className="text-sm font-semibold">Leave a Review</h3>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your name"
        className="w-full text-sm border rounded px-3 py-2"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your review..."
        className="w-full text-sm border rounded px-3 py-2 h-24"
      />
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            onClick={() => setRating(i + 1)}
            className={`w-5 h-5 cursor-pointer ${
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm ml-2">
          {rating} Star{rating > 1 ? "s" : ""}
        </span>
      </div>
      {success && (
        <div className="text-green-600 text-sm font-medium">
          ✅ Review submitted!
        </div>
      )}
      <button
        type="submit"
        className="px-4 py-2 text-sm rounded hover:text-[#BF6E3D] "
        style={{
          backgroundColor: theme.colors.accent.DEFAULT,
          color: theme.colors.primary.contrast,
          fontFamily: theme.fonts.body,
        }}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
