import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const useProductReviews = (productId) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;

    const reviewsRef = collection(db, "products", productId, "reviews");

    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const fetched = snapshot.docs.map(doc => doc.data());
      setReviews(fetched);
    });

    return () => unsubscribe();
  }, [productId]);

  return reviews;
};

export default useProductReviews;
