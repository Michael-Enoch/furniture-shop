import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);
  const routeNames = {
    cart : "Your Cart",
  }

  return (
    <nav className="text-sm text-gray-600 my-4 flex items-center space-x-1">
    {location.pathname !== "/" && (
      <Link to="/" className="relative inline-block text-gray-400 hover:text-gray-700 hover:cursor-pointer transition-colors duration-300 underline-slide">Home</Link>
    )}
    {paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      const label = routeNames[path] || (path.charAt(0).toUpperCase() + path.slice(1));
      return (
        <span key={url} className="flex items-center space-x-1 text-gray-400 ">
        <span className="mx-1 text-gray-400">{'>'}</span>
          <Link to={url} className="relative inline-block text-gray-400 hover:text-gray-700 hover:cursor-pointer transition-colors duration-300 underline-slide">{label}</Link>
        </span>
      );
    })}
  </nav>
  );
}

export default Breadcrumbs;
