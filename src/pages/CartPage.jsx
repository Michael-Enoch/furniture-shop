import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import Breadcrumbs from "../components/BreadCrumbs";
import { useEffect } from "react";
import theme from "../context/Theme";

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
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      removeFromCart(id);
      for (let i = 0; i < updatedItem.quantity; i++) {
        addToCart(updatedItem);
      }
    }
  };

  const total = cart
    .reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
    .toFixed(2);

  if (!cart.length) {
    return (
      <div className="min-h-[500px] py-10 px-4 w-full max-w-screen-2xl flex flex-col items-center justify-center text-center text-[#2D2D2D]">
        <Breadcrumbs />
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
          <Link
            to="/products"
            className="text-[#A65A2E] hover:underline text-lg"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto text-[#2D2D2D]">
      <Breadcrumbs />
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Your Shopping Cart
      </h1>

      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 items-center bg-white pb-4 border-b border-[#DAD4CE]"
          >
            {/* Product Info */}
            <div className="flex flex-col md:flex-row items-start justify-start gap-4 w-full md:w-full">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-full h-60 sm:w-full sm:h-40 object-cover rounded"
              />
              <div className="flex flex-col w-full items-start gap-1">
                <h3 className="font-semibold w-full text-lg text-primary-dark">
                  {item.name}
                </h3>
                <p className="text-sm">Size: {item.size}</p>
                <p className="text-sm">Color: {item.color}</p>
              </div>
            </div>

            {/* Price and Controls */}
            <div className="flex flex-col items-start md:items-end md:justify-end w-full gap-3 md:gap-6 md:flex-row">
              <p className="text-xl font-semibold text-gray-700">
                ${item.price ? item.price.toFixed(2) : "N/A"}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="min-w-[24px] text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQty(item)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
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

      {/* Cart Total */}
      <div className="mt-8 flex flex-col items-end">
        <h2 className="text-2xl font-semibold">
          Total: <span className="text-primary">${total}</span>
        </h2>
        <Link to="/checkout" className="w-full sm:w-fit">
          <button
            className="mt-4 w-full sm:w-auto px-4 py-2 rounded font-medium hover:opacity-90 transition"
            style={{
              background: theme.colors.accent.DEFAULT,
              color: theme.colors.primary.contrast,
            }}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
