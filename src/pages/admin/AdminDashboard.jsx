import { Link, Outlet, useLocation } from "react-router-dom";
import theme from "../../context/Theme";

const AdminDashboard = () => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
  ];
  return (
    <div className="flex min-h-screen">
      {/* SideBar */}
      <aside
        className="w-64 p-6"
        style={{ background: theme.colors.primary.DEFAULT }}
      >
        <h2
          className="text-2xl font-bold mb-8"
          style={{ color: theme.colors.primary.DEFAULT }}
        >
          Admin Panel
        </h2>

        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded ${
                location.pathname === item.path
                  ? "bg-white text-[#2D2D2D]"
                  : "text-white hover:bg-white hover:text-[#2D2D2D]"
              }`}
            >
                {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8" 
      style={{background:theme.colors.background.DEFAULT}}
      >
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminDashboard;
