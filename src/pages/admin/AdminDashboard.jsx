import { Link, Outlet, useLocation } from "react-router-dom";
import theme from "../../context/Theme";
import Breadcrumbs from "../../components/BreadCrumbs";

const AdminDashboard = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
  <div className="flex min-h-screen pl-64 bg-[#F3EFEB]">

      {/* Sidebar */}
 <aside className="fixed top-0 left-0 h-screen w-64 bg-[#3A2F2A] text-white flex flex-col justify-between py-8 px-6 shadow-lg z-40">
        <div>
          <h2
            className="text-2xl font-bold mb-10 tracking-wide text-white"
            style={{ color: theme.colors.primary.contrast }}
          >
            Admin Panel
          </h2>

          <nav className="space-y-3 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-white text-[#2D2D2D] font-semibold shadow"
                    : "hover:bg-[#F8F5F2] hover:text-[#2D2D2D]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-xs text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} Admin Tools
        </div>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto p-8"
        style={{ backgroundColor: theme.colors.background.alt }}
      >
        <Breadcrumbs />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
