import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumbs from "../components/BreadCrumbs";
import { useEffect } from "react";

export const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const increaseQty = (item) => addToCart(item);

  const decreaseQty = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem?.quantity === 1) {
      removeFromCart(id);
    } else {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      removeFromCart(id);
      for (let i = 0; i < updatedItem.quantity; i++) {
        addToCart(updatedItem);
      }
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  ).toFixed(2);

  if (!cart.length) {
    return (
      <>
        <Breadcrumbs />
        <div className="min-h-[70vh] w-full max-w-screen-2xl flex items-center justify-center text-center text-[#2D2D2D]">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <h2 className="text-2xl font-bold">
              Your cart is empty 🛒
            </h2>
            <Link to="/products" className="text-[#A65A2E] hover:underline text-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto text-[#2D2D2D]">
      <Breadcrumbs />
      <h1 className="text-4xl font-bold mb-6 text-primary-dark">
        Your Shopping Cart
      </h1>
      <div className="grid gap-6 pt-2">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center bg-white pb-4 border-b"
          >
            <div className="flex items-center gap-8 w-full md:w-1/2">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-lg text-primary-dark">
                  {item.name}
                </h3>
                <p className="font-semibold text-sm text-primary-dark">
                  Size: {item.size}
                </p>
                <p className="font-semibold text-sm text-primary-dark">
                  Color: {item.color}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-6 md:flex-row items-center">
              <p className="text-2xl font-semibold text-gray-600">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="min-w-[20px] text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQty(item)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-2xl font-semibold">
          Total: <span className="text-primary">${total}</span>
        </h2>
        <Link to="/checkout">
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
