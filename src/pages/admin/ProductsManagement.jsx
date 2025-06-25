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
        console.error(error)
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
        console.error(error)
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
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

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4"
            style={{
              backgroundColor: theme.colors.ui.base,
              borderColor: theme.colors.ui.border,
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm mb-1">{item.description}</p>
            <p className="text-sm">Category: {item.category}</p>
            <p className="text-sm">Brand: {item.brand}</p>
            <p className="text-sm">Price: ${item.price}</p>
            <p className="text-sm">Stock: {item.stock}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
