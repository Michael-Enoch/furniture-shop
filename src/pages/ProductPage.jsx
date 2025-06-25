import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Star,
} from "lucide-react";
import axios from "axios";
import theme from "../context/Theme";
import Breadcrumbs from "../components/BreadCrumbs";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const PAGE_SIZE = 6;

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { addToCart } = useCart();

  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const type = searchParams.get("type") || "";
  const price = searchParams.get("price") || "";
  const material = searchParams.get("material") || "";
  const page = parseInt(searchParams.get("page") || "1");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateParam = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    if (key !== "page") searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    ["category", "brand", "price"].forEach((key) => searchParams.delete(key));
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const StarRating = ({ rating = 0, max = 5 }) => (
    <div aria-label={`Rating: ${rating} out of ${max}`} role="img">
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= rating;
        return (
          <Star
            key={i}
            size={16}
            strokeWidth={1.5}
            className="inline-block mr-0.5"
            color={
              filled ? theme.colors.accent.DEFAULT : theme.colors.ui.border
            }
            fill={filled ? theme.colors.accent.DEFAULT : "none"}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products.json");
        const all = res.data.products;

        const unique = (arr, key) => [...new Set(arr.map((item) => item[key]))];

        setCategories(unique(all, "category"));
        setBrands(unique(all, "brand"));
        setMaterials(unique(all, "material"));
        setTypes(unique(all, "type"));
        setProducts(all);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterProducts = () => {
    return products.filter((product) => {
      const inCategory = category ? product.category === category : true;
      const selectedBrands = brand.split(",").filter(Boolean);
      const inBrand = selectedBrands.length
        ? selectedBrands.includes(product.brand)
        : true;
      const selectedMaterials = material.split(",").filter(Boolean);
      const inMaterial = selectedMaterials.length
        ? selectedMaterials.includes(product.material)
        : true;

      const selectedTypes = type.split(",").filter(Boolean);
      const inType = selectedTypes.length
        ? selectedTypes.includes(product.type)
        : true;

      const inPrice =
        price === "Under $500"
          ? product.price < 500
          : price === "$500 - $1000"
          ? product.price >= 500 && product.price <= 1000
          : price === "Above $1000"
          ? product.price > 1000
          : true;

      return inCategory && inBrand && inPrice && inMaterial && inType;
    });
  };

  const sortProducts = (list) => {
    switch (sortOption) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  };

  const filtered = sortProducts(filterProducts());
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const prices = ["Under $500", "$500 - $1000", "Above $1000"];

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
      });
      navigate("/login");
      return;
    }

    addToCart(product);

    toast.success(`✅ Added to cart!`, {
      position: "bottom-right",
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

  return (
    <section
      className="py-10 px-4 sm:px-8 md:px-10 w-full max-w-screen-2xl mx-auto"
      style={{
        backgroundColor: theme.colors.background.DEFAULT,
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
      }}
    >
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm px-3 py-2 border border-[#DAD4CE] focus:outline-1 rounded shadow bg-[#EAE6E1]"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <Breadcrumbs />

      <div className="flex flex-col md:flex-row gap-6">
        {(showFilters || window.innerWidth >= 768) && (
          <aside
            className="scrollbar w-full md:max-w-[250px] p-4 rounded shadow overflow-y-auto max-h-[85vh]"
            style={{ backgroundColor: theme.colors.background.alt }}
          >
            {/* Filters Title */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </span>
              {showFilters && (
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="mb-4">
              <h3 className="text-sm font-medium">Category</h3>
              {categories.map((cat) => (
                <div key={cat} className="text-sm mt-1">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => updateParam("category", cat)}
                      className="mr-2"
                    />
                    {cat}
                  </label>
                </div>
              ))}
              <div className="text-sm mt-2">
                <label>
                  <input
                    type="radio"
                    name="category"
                    checked={category === ""}
                    onChange={() => updateParam("category", "")}
                    className="mr-2"
                  />
                  All
                </label>
              </div>
            </div>

            {/* Brand Filters */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Brand</h3>
              <div className="relative">
                <div
                  className={`scrollbar grid grid-cols-2 gap-y-2 overflow-y-auto transition-all duration-300 ${
                    showAllBrands ? "max-h-none" : "max-h-[200px]"
                  }`}
                >
                  {brands.map((b) => (
                    <label key={b} className="flex items-center text-xs gap-2">
                      <input
                        type="checkbox"
                        name="brand"
                        checked={brand.split(",").includes(b)}
                        onChange={() => {
                          const current = brand.split(",").filter(Boolean);
                          const updated = current.includes(b)
                            ? current.filter((x) => x !== b)
                            : [...current, b];
                          updateParam("brand", updated.join(","));
                        }}
                      />
                      {b}
                    </label>
                  ))}
                </div>

                {/* Show More / Show Less Toggle */}
                {brands.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="mt-2 text-xs text-blue-600 underline"
                  >
                    {showAllBrands ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* Reset brands */}
              <div className="text-sm mt-2">
                <label>
                  <input
                    type="checkbox"
                    checked={brand === ""}
                    onChange={() => updateParam("brand", "")}
                    className="mr-2"
                  />
                  All
                </label>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Type</h3>
              <div
                className={`scrollbar grid grid-cols-2 gap-y-2 overflow-y-auto transition-all duration-300 ${
                  showAllTypes ? "max-h-none" : "max-h-[200px]"
                }`}
              >
                {types.map((t) => (
                  <label
                    key={t}
                    className="flex items-center text-[11px] gap-2"
                  >
                    <input
                      type="checkbox"
                      name="type"
                      checked={type.split(",").includes(t)}
                      onChange={() => {
                        const current = type.split(",").filter(Boolean);
                        const updated = current.includes(t)
                          ? current.filter((x) => x !== t)
                          : [...current, t];
                        updateParam("type", updated.join(","));
                      }}
                    />
                    {t}
                  </label>
                ))}
              </div>
              {types.length > 6 && (
                <button
                  onClick={() => setShowAllTypes(!showAllTypes)}
                  className="mt-2 text-xs text-blue-600 underline"
                >
                  {showAllTypes ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            {/* Price Filters */}
            <div className="mb-4">
              <h3 className="text-sm font-medium">Price</h3>
              {prices.map((range) => (
                <div key={range} className="text-sm mt-1">
                  <label>
                    <input
                      type="radio"
                      name="price"
                      checked={price === range}
                      onChange={() => updateParam("price", range)}
                      className="mr-2"
                    />
                    {range}
                  </label>
                </div>
              ))}
              <div className="text-sm mt-2">
                <label>
                  <input
                    type="radio"
                    name="price"
                    checked={price === ""}
                    onChange={() => updateParam("price", "")}
                    className="mr-2"
                  />
                  All
                </label>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Material</h3>
              <div
                className={`scrollbar grid grid-cols-2 gap-y-2 overflow-y-auto transition-all duration-300 ${
                  showAllMaterials ? "max-h-none" : "max-h-[200px]"
                }`}
              >
                {materials.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center text-[11px] gap-2"
                  >
                    <input
                      type="checkbox"
                      name="material"
                      checked={material.split(",").includes(mat)}
                      onChange={() => {
                        const current = material.split(",").filter(Boolean);
                        const updated = current.includes(mat)
                          ? current.filter((x) => x !== mat)
                          : [...current, mat];
                        updateParam("material", updated.join(","));
                      }}
                    />
                    {mat}
                  </label>
                ))}
              </div>
              {materials.length > 6 && (
                <button
                  onClick={() => setShowAllMaterials(!showAllMaterials)}
                  className="mt-2 text-xs text-blue-600 underline"
                >
                  {showAllMaterials ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Sorting */}
          <div className="flex justify-end mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm px-3 py-2 border border-[#DAD4CE] focus:outline-1 rounded shadow bg-[#EAE6E1]"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>

          {/* Active Filters */}
          {(category || brand || price) && (
            <div className="flex flex-wrap gap-2 items-center mb-4">
              {category && (
                <span className="flex items-center gap-1 text-sm bg-[#EAE6E1] px-2 py-1 rounded">
                  {category}{" "}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateParam("category", "")}
                  />
                </span>
              )}
              {brand && (
                <span className="flex items-center gap-1 text-sm bg-[#EAE6E1] px-2 py-1 rounded">
                  {brand}{" "}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateParam("brand", "")}
                  />
                </span>
              )}
              {price && (
                <span className="flex items-center gap-1 text-sm bg-[#EAE6E1] px-2 py-1 rounded">
                  {price}{" "}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateParam("price", "")}
                  />
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 ml-2 underline"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <p className="text-center text-gray-500 mt-10">
              Loading products...
            </p>
          ) : paginated.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No products found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white flex flex-col rounded-xl w-full shadow-md overflow-hidden relative"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col flex-1 justify-between p-6">
                      <div>
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          className="text-md font-semibold leading-tight line-clamp-2"
                          style={{
                            color: theme.colors.primary.DEFAULT,
                            fontFamily: theme.fonts.header,
                          }}
                        >
                          {product.name}
                        </Link>
                        <p
                          className="text-base mt-1 mb-1 capitalize"
                          style={{
                            color: theme.colors.text.primary,
                            fontFamily: theme.fonts.body,
                          }}
                        >
                          {product.brand || "Unbranded"}
                        </p>
                        <StarRating rating={product.rating || 4} />
                      </div>

                      <div
                        className="mt-1 text-sm space-y-1"
                        style={{ color: theme.colors.text.primary }}
                      >
                        <p>
                          <span
                            className="font-semibold"
                            style={{ color: theme.colors.accent.DEFAULT }}
                          >
                            Price:
                          </span>{" "}
                          ${product.price.toFixed(2)}
                        </p>

                        <button
                          type="button"
                          className="mt-4 w-full py-2 rounded-lg font-medium hover:text-[#BF6E3D] flex items-center justify-center gap-2 transition-colors pointer-events-auto"
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
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-8 text-sm font-medium text-gray-700">
                  <button
                    disabled={page === 1}
                    onClick={() => updateParam("page", String(page - 1))}
                    className={`px-3 py-1 rounded border bg-white hover:bg-gray-100 ${
                      page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-gray-800">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => updateParam("page", String(page + 1))}
                    className={`px-3 py-1 rounded border bg-white hover:bg-gray-100 ${
                      page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default ProductPage;
