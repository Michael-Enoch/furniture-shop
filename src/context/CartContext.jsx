import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [cart, setCart] = useState([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (loading) return;

    if (currentUser) {
      const ref = doc(db, "carts", currentUser.uid);
      unsubscribe = onSnapshot(ref, (docSnap) => {
        if (docSnap.exists()) {
          setCart(docSnap.data().items || []);
        } else {
          setCart([]);
        }
        setInitialLoadDone(true);
      });
    } else {
      const local = localStorage.getItem("cart");
      setCart(local ? JSON.parse(local) : []);
      setInitialLoadDone(true);
    }

    return () => unsubscribe && unsubscribe();
  }, [currentUser, loading]);

  useEffect(() => {
    if (!initialLoadDone) return;
    if (currentUser) {
      const ref = doc(db, "carts", currentUser.uid);
      setDoc(ref, { items: cart });
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, currentUser, initialLoadDone]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!currentUser && initialLoadDone) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [currentUser, initialLoadDone]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartCount, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
