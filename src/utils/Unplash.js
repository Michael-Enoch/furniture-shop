import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;


export const fetchUnsplashImages = async (query, count = 6) => {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: query,
        per_page: count,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return res.data.results;
  } catch (error) {
    console.error("Unsplash API error:", error);
    return [];
  }
};
