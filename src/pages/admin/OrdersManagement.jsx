import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "orders"),
    (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orders);
      setLoading(false)
    }
  );

  return () => unsubscribe(); 
}, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated.");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update status.");
    }
    setUpdatingId("");
  };

  const handleDelete = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      toast.success("Order deleted.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete order.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" /> Loading Orders...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-md p-5 shadow-md bg-white"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    Order ID:{" "}
                    <span className="text-gray-600">{order.id}</span>
                  </p>
                  <p>User ID: {order.userId}</p>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span className="capitalize font-semibold">
                      {order.status}
                    </span>
                  </p>
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>

              {/* Products */}
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Products:</h2>
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-1 text-sm"
                  >
                    <p>Product ID: {item.productId}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>
                      Color:{" "}
                      {item.selectedColor ? item.selectedColor : "N/A"}
                    </p>
                    <p>Size: {item.selectedSize ? item.selectedSize : "N/A"}</p>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Shipping Address:</h2>
                <p>
                  {order.shippingAddress?.addressLine}, {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state}, {order.shippingAddress?.zip},{" "}
                  {order.shippingAddress?.country}
                </p>
              </div>

              {/* Status Control */}
              <div className="mt-4">
                <label className="font-semibold mr-2">Change Status:</label>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  disabled={updatingId === order.id}
                  className="border px-2 py-1 rounded-md"
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
