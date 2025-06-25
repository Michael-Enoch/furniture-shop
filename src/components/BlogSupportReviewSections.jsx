import { Link } from "react-router-dom";
import theme from "../context/Theme";

const BlogSupportReviewSections = () => {
  return (
    <section className="py-20 px-6 max-w-8xl mx-auto space-y-20" style={{ fontFamily: theme.fonts.body}}>
      {/* Blog Section */}
      <div data-aos="fade-up">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.DEFAULT }}
        >
          From Our Journal
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-5">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Design Tips #{i}</h3>
              <p className="text-sm text-gray-700 mb-2">Simple ways to refresh your living space using timeless aesthetics.</p>
              <Link to="/blog" className="text-sm text-[#A65A2E] hover:text-[#BF6E3D] font-medium">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div data-aos="fade-up">
        <div className="bg-[#F3EFEB] p-10 rounded-xl text-center">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.DEFAULT }}
          >
            Need Help?
          </h2>
          <p className="text-sm mb-4">Visit our Help Center for support, returns, and common questions.</p>
          <Link
            to="/help-center"
            className="inline-block text-sm font-medium text-[#A65A2E] hover:text-[#BF6E3D] transition"
          >
            Go to Help Center →
          </Link>
        </div>
      </div>

      {/* Submit Review Section */}
      <div data-aos="fade-up">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: theme.fonts.header, color: theme.colors.primary.DEFAULT }}
          >
            Share Your Experience
          </h2>
          <p className="text-sm mb-5">We love hearing from our customers! Drop a quick review and let others know what to expect.</p>
          <Link
            to="/submit-review"
            className="inline-block bg-[#A65A2E] hover:bg-[#BF6E3D] text-white py-3 px-6 rounded-lg transition-colors"
          >
            Submit a Review
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSupportReviewSections;
