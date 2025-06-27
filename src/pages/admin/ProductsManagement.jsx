import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import theme from "../../context/Theme";
import { toast } from "sonner";
import { db } from "../../../Firebase/firebase";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9); 

const handleShowMore = () => {
  setVisibleCount((prev) => prev + 6); // Load 6 more each time
};
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    imageUrl: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
      useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [editId])


  const productsRef = collection(db, "products");

  // Fetch products
  const fetchProducts = async () => {
    const snapshot = await getDocs(productsRef);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      createdAt: Timestamp.now(),
    };

    try {
      if (editId) {
        await updateDoc(doc(db, "products", editId), data);
        toast.success("Product updated");
      } else {
        await addDoc(productsRef, data);
        toast.success("Product added");
      }

      setForm({
        name: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        imageUrl: "",
        description: "",
      });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Error saving product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting");
    }
  };

  // Load product to edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      category: item.category,
      brand: item.brand,
      stock: item.stock,
      imageUrl: item.imageUrl,
      description: item.description,
    });
    setEditId(item.id);
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: theme.colors.background.DEFAULT }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: theme.colors.primary.DEFAULT }}
      >
        Product Management
      </h1>

      <div className="sticky top-0 z-10 bg-[#EFEAE5] p-4 rounded shadow mb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {["name", "price", "category", "brand", "stock", "imageUrl"].map(
            (field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
                style={{
                  backgroundColor: theme.colors.ui.base,
                  borderColor: theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                }}
              />
            )
          )}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-lg p-3 md:col-span-2"
            style={{
              backgroundColor: theme.colors.ui.base,
              borderColor: theme.colors.ui.border,
              fontFamily: theme.fonts.ui,
            }}
          />
          <button
            type="submit"
            className="bg-[#A65A2E] text-white rounded-lg py-2 md:col-span-2"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.slice(0, visibleCount).map((item) => (
    <div
      key={item.id}
      className="border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
      style={{
        backgroundColor: theme.colors.ui.base,
        borderColor: theme.colors.ui.border,
        maxHeight: "450px",
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-36 object-cover rounded mb-3"
      />
      <h2 className="text-lg font-semibold truncate">{item.name}</h2>

      <p className="text-sm line-clamp-2 text-gray-600 mb-1">
        {item.description}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>Category: {item.category}</p>
        <p>Brand: {item.brand}</p>
        <p>Price: ${item.price}</p>
        <p>Stock: {item.stock}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleEdit(item)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
{visibleCount < products.length && (
  <div className="mt-6 text-center">
    <button
      onClick={handleShowMore}
      className="px-5 py-2 bg-[#A65A2E] text-white rounded hover:bg-[#BF6E3D] transition"
    >
      Load More
    </button>
  </div>
)}
    </div>
  );
};

export default AdminProducts;
