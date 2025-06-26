import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs} from "firebase/firestore";
import { Link} from "react-router-dom";
import { db } from "../../../Firebase/firebase";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
  const { userData } = useAuth();

  const [counts, setCounts] = useState({
    users: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    recentOrders: 0,
    products: 0,
    lowStockProducts: 0,
  });

  const [topProducts, setTopProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data function
useEffect(() => {
  const fetchData = async () => {
    try {
      const now = Date.now();

      const usersSnap = await getDocs(collection(db, "users"));

      const productsSnap = await getDocs(collection(db, "products"));
      const productsData = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const lowStockCount = productsData.filter(
        (p) => p.stock === "Out of Stock" || p.stock === "Limited Stock"
      ).length;

      const ordersSnap = await getDocs(collection(db, "orders"));
      const ordersData = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const processing = ordersData.filter(o => o.status === "processing").length;
      const shipped = ordersData.filter(o => o.status === "shipped").length;
      const cancelled = ordersData.filter(o => o.status === "cancelled").length;

      const newOrders = ordersData.filter((o) => {
        const timestamp = o.createdAt;
        if (timestamp && typeof timestamp.toDate === "function") {
          const orderDate = timestamp.toDate();
          return now - orderDate.getTime() < 24 * 60 * 60 * 1000;
        }
        return false;
      });

      const topSelling = productsData
        .filter(p => p.totalSold)
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 5);

      setCounts({
        users: usersSnap.size,
        products: productsSnap.size,
        lowStockProducts: lowStockCount,
        totalOrders: ordersSnap.size,
        pendingOrders: processing,
        completedOrders: shipped,
        cancelledOrders: cancelled,
        recentOrders: newOrders.length,
      });

      setTopProducts(topSelling);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome Admin {userData?.name || "Unknown"}
      </h1>

      {/* Quick Links */}
      <div className="mb-8 flex gap-4">
        <Link className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Product
        </Link>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Manage Users
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Manage Orders
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search users or orders..."
          className="border rounded px-4 py-2 w-full max-w-md"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl">{counts.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl">{counts.totalOrders}</p>
          <p>Pending: {counts.pendingOrders}</p>
          <p>Completed: {counts.completedOrders}</p>
          <p>Cancelled: {counts.cancelledOrders}</p>
          <p>New (24h): {counts.recentOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-3xl">{counts.products}</p>
          <p>Low Stock: {counts.lowStockProducts}</p>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Selling Products</h2>
        {topProducts.length === 0 ? (
          <p>No sales data available</p>
        ) : (
          <ul className="space-y-2">
            {topProducts.map((product) => (
              <li key={product.id} className="bg-white p-4 rounded shadow flex justify-between">
                <span>{product.name}</span>
                <span className="font-semibold">{product.totalSold} sold</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sample Sales Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sales Trend (Last 7 days)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={[
              { day: "Mon", sales: 30 },
              { day: "Tue", sales: 20 },
              { day: "Wed", sales: 27 },
              { day: "Thu", sales: 18 },
              { day: "Fri", sales: 23 },
              { day: "Sat", sales: 34 },
              { day: "Sun", sales: 40 },
            ]}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#A65A2E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
