import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import theme from "../context/Theme";
import { clearAllUnsplashCache, loadCache, saveCache } from "../utils/Cache";
import { fetchUnsplashImages } from "../utils/Unplash";

// Categories you want to fetch from Unsplash
const categories = ["living room", "bedroom", "workspace", "outdoor", "dining"];

// Control how many images per category
const IMAGES_PER_CATEGORY = 1;

const InstagramFeed = ({ sectionIndex = 11 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const allPosts = [];

      for (const category of categories) {
        const cached = loadCache(category, IMAGES_PER_CATEGORY);

        if (cached) {
          console.log(`Loaded ${category} from cache ✅`);
          allPosts.push(
            ...cached.map((img) => ({
              ...img,
              category,
            }))
          );
        } else {
          const images = await fetchUnsplashImages(
            category,
            IMAGES_PER_CATEGORY
          );
          const mapped = images.map((img) => ({
            src: img.urls.regular,
            caption: img.alt_description || `${category} inspiration ✨`,
            category,
          }));
          allPosts.push(...mapped);
          saveCache(category, IMAGES_PER_CATEGORY, mapped);
          console.log(`Fetched ${category} from API 🔥`);
        }
      }

      setPosts(allPosts);
    };

    // Optional: Clear cache temporarily for testing
    clearAllUnsplashCache();

    loadImages();
  }, []);

  return (
    <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto text-center"
      style={{ background: bgColor }}
    >
      <h2
        className="text-3xl font-bold mb-8"
        style={{
          fontFamily: theme.fonts.header,
          color: theme.colors.primary.DEFAULT,
        }}
      >
        Follow Us On Instagram
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <div
            key={i}
            className="relative group transition-transform duration-500 hover:scale-100 sm:hover:scale-[1.03] cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="relative rounded-2xl shadow-md overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${post.src})`,
                }}
                className="w-full h-60 bg-cover bg-center rounded-2xl shadow-md transition duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 transition-opacity rounded-2xl flex items-center justify-center">
                <div className="flex flex-col items-center text-white gap-2">
                  <FaInstagram size={28} />
                  <p className="text-xs max-w-[80%]">{post.caption}</p>
                  <p className="text-[10px] opacity-70">#{post.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
