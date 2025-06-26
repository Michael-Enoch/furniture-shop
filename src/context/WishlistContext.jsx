import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../../Firebase/firebase";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser} = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Realtime listener for logged-in users
  useEffect(() => {
    let unsubscribe;

    const listenToWishlist = () => {
      if (currentUser) {
        const ref = doc(db, "wishlists", currentUser.uid);

        unsubscribe = onSnapshot(ref, (docSnap) => {
          if (docSnap.exists()) {
            setWishlist(docSnap.data().items || []);
          } else {
            setWishlist([]);
          }
        });
      } else {
        // Load from localStorage if not logged in
        const local = localStorage.getItem("wishlist");
        setWishlist(local ? JSON.parse(local) : []);
      }
    };

    listenToWishlist();
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  // Sync wishlist to Firestore or localStorage
  useEffect(() => {
    if (currentUser) {
      const ref = doc(db, "wishlists", currentUser.uid);
      setDoc(ref, { items: wishlist });
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    setWishlistCount(wishlist.length);
  }, [wishlist, currentUser]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, { ...product }];
    });
  };

  const isWishlisted = (productOrId) => {
    const id = typeof productOrId === "object" ? productOrId.id : productOrId;
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        setWishlist, 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
