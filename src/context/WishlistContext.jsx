import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../../Firebase/firebase";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (loading) return;

    if (currentUser) {
      const ref = doc(db, "wishlists", currentUser.uid);
      unsubscribe = onSnapshot(ref, (docSnap) => {
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          setWishlist([]);
        }
        setInitialLoadDone(true);
      });
    } else {
      const local = localStorage.getItem("wishlist");
      setWishlist(local ? JSON.parse(local) : []);
      setInitialLoadDone(true);
    }

    return () => unsubscribe && unsubscribe();
  }, [currentUser, loading]);

  useEffect(() => {
    if (!initialLoadDone) return;
    if (currentUser) {
      const ref = doc(db, "wishlists", currentUser.uid);
      setDoc(ref, { items: wishlist });
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setWishlistCount(wishlist.length);
  }, [wishlist, currentUser, initialLoadDone]);

  // Clear wishlist on logout
  useEffect(() => {
    if (!currentUser && initialLoadDone) {
      setWishlist([]);
      localStorage.removeItem("wishlist");
    }
  }, [currentUser, initialLoadDone]);

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
