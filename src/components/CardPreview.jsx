// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import theme from "../context/Theme";

const CardPreview = ({
  cardNumber,
  cardName,
  expDate,
  securityCode,
  focus,
}) => {
  const isFlipped = focus === "securityCode";

  return (
    <div className="perspective w-full max-w-[340px] h-[200px] mt-8">
      <div
        className={`relative w-full h-full duration-700 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div className="absolute w-full h-full rounded-2xl p-5 shadow-lg bg-gradient-to-r from-[#3A2F2A] to-[#A65A2E] text-white backface-hidden flex flex-col justify-between">
          <div className="flex justify-between">
            <h2
              className="text-lg font-semibold"
              style={{ color: theme.colors.primary.contrast }}
            >
              FURNISH CARD
            </h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-6"
            />
          </div>
          <div className="text-lg tracking-widest mb-4">
            {cardNumber ? cardNumber : "**** **** **** ****"}
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs">Card Holder</p>
              <p className="font-medium">{cardName || "FULL NAME"}</p>
            </div>
            <div>
              <p className="text-xs">Expires</p>
              <p className="font-medium">{expDate || "MM/YY"}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full rounded-2xl p-5 shadow-lg bg-gradient-to-r from-[#3A2F2A] to-[#A65A2E] text-white backface-hidden rotate-y-180 flex flex-col justify-center">
          <div className="bg-black h-8 w-full mb-5 rounded"></div>
          <div className="flex justify-end">
            <div className="bg-white text-black px-3 py-1 rounded">
              {securityCode || "•••"}
            </div>
          </div>
          <div className="mt-5 text-center text-xs opacity-70">
            Powered by FURNISH
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
