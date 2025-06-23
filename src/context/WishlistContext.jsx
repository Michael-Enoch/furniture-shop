import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlistCount, setWishlistCount] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.length;
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistCount(wishlist.length); // 🔥 Update count every time wishlist changes
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, { ...product }];
      }
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
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
