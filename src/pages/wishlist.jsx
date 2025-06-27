import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../context/Theme";
import { useEffect } from "react";
import Breadcrumbs from "../components/BreadCrumbs";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const {currentUser} = useAuth();
  const {addToCart} = useCart();
  const navigate = useNavigate();

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [toggleWishlist]);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error("⚠️ You need to sign in to add items to your cart.", {
        position: "top-right",
        style: {
          backgroundColor: "#3A2F2A",
          color: "#F8F5F2",
          border: "1px solid #A65A2E",
          padding: "14px",
          fontSize: "13px",
          borderRadius: "8px",
        },
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    addToCart(product);

    toast.success(`✅ Added to cart!`, {
      position: "bottom-center",
      style: {
        backgroundColor: "#3A2F2A",
        color: "#F8F5F2",
        border: "1px solid #A65A2E",
        padding: "14px",
        fontSize: "13px",
        borderRadius: "8px",
      },
      iconTheme: {
        primary: "#A65A2E",
        secondary: "#F8F5F2",
      },
      duration: 3000,
      description: "View your cart to checkout.",
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  if (!wishlist.length) {
    return (
      <div className="min-h-[500px] py-10 px-4 w-full max-w-screen-2xl flex flex-col items-center justify-center text-center text-[#2D2D2D]">
        <Breadcrumbs />
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-2xl font-bold">Your wishlist is empty 💔</h2>
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
    <section  className="w-full max-w-screen-2xl px-8 py-14 mx-auto">
      <h1
        className="text-3xl font-semibold mb-6"
        style={{ color: theme.colors.text.primary }}
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
                onClick={() => handleAddToCart(product)}
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
    </section>
  );
};
