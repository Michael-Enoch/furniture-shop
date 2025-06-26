import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import theme from "../context/Theme";

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  if (!wishlist.length) {
    return (
      <div className="min-h-[500px] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Your wishlist is empty 💔</h2>
        <Link
          to="/products"
          className="mt-4 inline-block px-6 py-3 bg-[#A65A2E] text-white rounded-2xl hover:bg-opacity-80"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1
        className="text-3xl font-semibold mb-6"
        style={{ color: theme.colors.text }}
      >
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
            </Link>

            <div className="flex-1">
              <h2 className="text-lg font-medium mb-2">{product.name}</h2>
              <p className="text-[#A65A2E] font-semibold mb-2">
                ${product.price}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: product.colorHex }}
                ></span>
                <span className="text-xs text-gray-600">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#3A2F2A] text-white rounded-xl px-4 py-2 hover:bg-opacity-80 transition text-sm flex items-center justify-center gap-1"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="bg-red-100 text-red-500 rounded-xl px-3 py-2 hover:bg-red-200 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
