import { createContext, useContext, useEffect, useState } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  console.log("🛒 Adding to cart:", product);

  setCart((prev) => {
    const exists = prev.find((item) => item.id === product.id);
    if (exists) {
      const updatedCart = prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log("🛠️ Updated cart:", updatedCart);
      return updatedCart;
    }
    const newCart = [...prev, { ...product, quantity: 1 }];
    console.log("✨ New cart:", newCart);
    return newCart;
  });
};


  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
