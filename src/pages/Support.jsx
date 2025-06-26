import { Link } from "react-router-dom";
import theme from "../context/Theme";

const Support = ({ sectionIndex = 12 }) => {
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
        <div className="bg-[#F3EFEB] p-10 rounded-xl text-center">
          <h2
            className="text-2xl font-bold mb-2"
          >
            Need Help?
          </h2>
          <p className="text-sm mb-4">
            Visit our Help Center for support, returns, and common questions.
          </p>
          <Link
            to="/help-center"
            className="inline-block text-sm font-medium text-[#A65A2E] hover:text-[#BF6E3D] transition"
          >
            Go to Help Center →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Support;
