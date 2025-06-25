import { Link } from "react-router-dom";
import theme from "../context/Theme";

const UserExperience = ({ sectionIndex = 13 }) => {
  const bgColor =
    sectionIndex % 2 === 0
      ? theme.colors.background.DEFAULT
      : theme.colors.background.alt;
  return (
    <section
      className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-16 py-14 mx-auto text-center"
      style={{ background: bgColor }}
    >
      <div data-aos="fade-up">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2
            className="text-2xl font-bold mb-3"
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

export default UserExperience;
