import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import highlightMatch from "../utils/HighlightMatch";

import theme from "../context/Theme";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

function StarRating({ rating = 0, max = 5 }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        strokeWidth={1.5}
        className={`inline-block mr-0.5`}
        color={
          i <= rating ? theme.colors.accent.DEFAULT : theme.colors.ui.border
        }
        fill={i <= rating ? theme.colors.accent.DEFAULT : "none"}
        aria-hidden="true"
      />
    );
  }
  return (
    <div aria-label={`Rating: ${rating} out of ${max}`} role="img">
      {stars}
    </div>
  );
}

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Fetch products once on mount
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const rawProducts = data.products;
        if (!Array.isArray(rawProducts)) {
          console.warn("Fetched `products` is not an array", rawProducts);
          return setProducts([]);
        }

        const normalized = rawProducts.map((p) => ({
          ...p,
          name: p.name || "",
          brand: p.brand || "",
          category: p.category || "",
          material: p.material || "",
          color: p.color || "",
        }));
        setProducts(normalized);
      })
      .catch((err) => {
        setProducts([]);
        console.error("Failed to fetch products:", err);
      });
  }, []);

  // Sync query to URL
  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    if (query !== currentQ) {
      setSearchParams({ q: query });
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Initialize query from URL
  useEffect(() => {
    const qParam = searchParams.get("q") || "";
    setQuery(qParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];

    const q = query.toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const fields = [p.name, p.brand, p.category, p.material, p.color];
      const matched = fields.some(
        (field) => typeof field === "string" && field.toLowerCase().includes(q)
      );
      console.log("Filtering:", p.name, "Matched:", matched);
      return matched;
    });
  }, [query, products]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  console.log("Query:", query, "| Debounced:", query);
  console.log("Products:", products.length);
  console.log("Filtered:", filtered.length);

  return (
    <section
      className="py-16 px-4 sm:px-8 md:px-16 w-full max-w-screen-2xl mx-auto"
      style={{
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search products..."
        className="w-full mb-6 p-3 rounded-lg border outline-none focus:outline-none"
        style={{
          backgroundColor: theme.colors.ui.base,
          borderColor: theme.colors.ui.border,
          fontFamily: theme.fonts.body,
          color: theme.colors.text.primary,
        }}
      />

      <h1
        className="text-2xl mb-4"
        style={{
          fontFamily: theme.fonts.header,
          color: theme.colors.primary.DEFAULT,
        }}
      >
        Showing results for: <span className="italic">{`"${query}"`}</span>
      </h1>

      {paginated.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-2xl">
          {paginated.map((p) => {
            return (
              <div
                key={p.id}
                className="flex flex-col rounded-xl w-full shadow-md overflow-hidden relative group transition ease duration-300"
                style={{
                  backgroundColor: theme.colors.ui.base,
                  borderColor: theme.colors.ui.border,
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer">
                  <img
                    src={p.image || "/placeholder.jpg"}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 flex flex-col items-end p-3 space-y-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      className="p-2 rounded-md shadow-lg pointer-events-auto"
                      style={{
                        background: theme.colors.accent.DEFAULT,
                        color: theme.colors.primary.contrast,
                      }}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-md shadow-lg pointer-events-auto"
                      style={{
                        background: theme.colors.accent.DEFAULT,
                        color: theme.colors.primary.contrast,
                      }}
                      aria-label={`Add ${p.name} to wishlist`}
                    >
                      <Heart className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1 justify-between p-6">
                  <div>
                    <h2
                      className="text-xl font-semibold leading-tight line-clamp-2"
                      style={{
                        color: theme.colors.primary.DEFAULT,
                        fontFamily: theme.fonts.header,
                      }}
                    >
                      {highlightMatch(p.name, query)}
                    </h2>
                    <p
                      className="text-base mt-1 mb-1"
                      style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.fonts.body,
                      }}
                    >
                      {highlightMatch(p.brand, query)}
                    </p>
                    <StarRating rating={p.rating || 0} />
                  </div>

                  <div
                    className="mt-4 text-sm space-y-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    <p>
                      <span
                        className="font-semibold"
                        style={{ color: theme.colors.accent.DEFAULT }}
                      >
                        Category:
                      </span>{" "}
                      {highlightMatch(p.category, query)}
                    </p>
                    <p>
                      <span
                        className="font-semibold"
                        style={{ color: theme.colors.accent.DEFAULT }}
                      >
                        Material:
                      </span>{" "}
                      {highlightMatch(p.material, query)}
                    </p>
                    <p>
                      <span
                        className="font-semibold"
                        style={{ color: theme.colors.accent.DEFAULT }}
                      >
                        Color:
                      </span>{" "}
                      {highlightMatch(p.color, query)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p
          className="text-center mt-8 text-lg italic"
          style={{ color: theme.colors.text.primary }}
        >
          No matching products found.
        </p>
      )}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 rounded border bg-[#A65A2E] text-[#F8F5F2] font-medium transition disabled:opacity-40"
              style={{
                borderColor: theme.colors.ui.border,
                fontFamily: theme.fonts.ui,
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-gray-800">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 rounded border bg-[#A65A2E] text-[#F8F5F2] font-medium transition disabled:opacity-40"
              style={{
                borderColor: theme.colors.ui.border,
                fontFamily: theme.fonts.ui,
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const val = e.target.elements.pageNum.value;
              const num = parseInt(val, 10);
              if (num >= 1 && num <= totalPages) {
                setPage(num);
              }
              e.target.reset();
            }}
            className="flex gap-2 items-center justify-center text-sm"
          >
            <label htmlFor="pageNum" style={{ fontFamily: theme.fonts.ui }}>
              Go to page:
            </label>
            <input
              id="pageNum"
              type="number"
              min="1"
              max={totalPages}
              placeholder="e.g. 5"
              className="border px-2 py-1 rounded w-20 text-center"
              style={{
                fontFamily: theme.fonts.ui,
                backgroundColor: theme.colors.ui.base,
                color: theme.colors.text.primary,
                borderColor: theme.colors.ui.border,
              }}
            />
            <button
              type="submit"
              className="px-3 py-1 rounded border font-medium"
              style={{
                backgroundColor: theme.colors.accent.DEFAULT,
                borderColor: theme.colors.ui.border,
                color: theme.colors.primary.contrast,
                fontFamily: theme.fonts.ui,
              }}
            >
              Go
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
