const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

// Generate a unique cache key based on category and image count
const getCacheKey = (query, count) =>
  `unsplashImages_${query.replace(/\s+/g, "_")}_count${count}`;

// Load cache
export const loadCache = (query, count) => {
  const key = getCacheKey(query, count);
  const cached = localStorage.getItem(key);

  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);

  const isExpired = Date.now() - timestamp > CACHE_DURATION;
  return isExpired ? null : data;
};

// Save cache
export const saveCache = (query, count, data) => {
  const key = getCacheKey(query, count);
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

// Clear all Unsplash-related caches (safe)
export const clearAllUnsplashCache = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("unsplashImages_")) {
      localStorage.removeItem(key);
    }
  });
  console.log(" Unsplash image cache cleared.");
};
