import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../components/BreadCrumbs";
import theme from "../context/Theme";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import ReviewForm from "../components/ReviewForm";
import useProductReviews from "../hooks/useProductReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const reviews = useProductReviews(id);
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart, removeFromCart, cart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("/products.json");
        const products = res.data.products || [];
        const found = products.find((p) => p.id === id);
        setProduct(found);
        setAllProducts(products);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const increaseQty = (item) => {
    addToCart(item);
  };

  const decreaseQty = (id) => {
    const existingItem = cart.find((item) => item.id === id);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      removeFromCart(id);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      removeFromCart(id);
      updatedCart
        .filter((item) => item.id === id)
        .forEach((item) => {
          for (let i = 0; i < item.quantity; i++) {
            addToCart(item);
          }
        });
    }
  };

  if (!product) return <div className="p-6">Loading product...</div>;

  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <section
      className="py-10 px-4 sm:px-8 md:px-10 w-full max-w-screen-2xl mx-auto"
      style={{
        backgroundColor: theme.colors.background.DEFAULT,
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
      }}
    >
      <Breadcrumbs />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 ml-2">{product.rating} Stars</span>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-black">
            ${product.price.toFixed(2)}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => decreaseQty(product.id)}
              className="px-3 py-1 bg-gray-200 rounded text-sm"
            >
              −
            </button>
            <span className="text-sm font-medium">{quantity}</span>
            <button
              onClick={() => increaseQty(product)}
              className="px-3 py-1 bg-gray-200 rounded text-sm"
            >
              +
            </button>
          </div>

          {/* Details */}
          <ul className="text-sm text-gray-700 mt-4 space-y-1">
            <li>
              <strong>Brand:</strong> {product.brand}
            </li>
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Color:</strong> {product.color}
            </li>
            <li>
              <strong>Material:</strong> {product.material}
            </li>
            <li>
              <strong>Type:</strong> {product.type}
            </li>
            <li>
              <strong>Stock:</strong> {product.stock}
            </li>
            <li>
              <strong>Size:</strong> {product.size}
            </li>
            <li>
              <strong>Dimensions:</strong> {product.dimensions}
            </li>
          </ul>
          <button
            type="button"
            className="mt-4 w-full py-2 rounded-lg font-medium hover:text-[#BF6E3D] flex items-center justify-center gap-2 transition-colors"
            style={{
              backgroundColor: theme.colors.accent.DEFAULT,
              color: theme.colors.primary.contrast,
              fontFamily: theme.fonts.body,
            }}
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>

        <ReviewForm productId={product.id} />

        {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="border mt-6 border-[#DAD4CE] shadow p-3 rounded-md">
              <div className="flex items-center gap-2">
                <strong>{r.userName}</strong>
                <span className="text-yellow-500">{`★`.repeat(r.rating)}</span>
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
              <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="bg-white rounded-lg shadow p-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <div className="mt-2 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
