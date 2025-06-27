import { Link} from "react-router-dom";

const ThankYou = () => {
  const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));

  const shipping = latestOrder?.shippingAddress;
  const orderId = latestOrder?.createdAt?.seconds || Math.floor(Math.random() * 10000000);
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    .toLocaleDateString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#EFEAE5] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-[#3A2F2A] mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-[#A65A2E] font-medium mb-4">
          Order ID: #{orderId}
        </p>

        <div className="border rounded-xl p-4 mb-6 text-left">
          <h2 className="text-lg font-semibold mb-3 text-[#A65A2E]">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm md:text-base">
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{latestOrder?.status}</span>
            </p>
            <p>
              <strong>Total:</strong> ₦{latestOrder?.totalAmount}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {latestOrder?.paymentMethod === "creditCard"
                ? "Credit Card"
                : latestOrder?.paymentMethod}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> {estimatedDelivery}
            </p>

            {shipping && (
              <div>
                <p className="font-semibold mt-2">Shipping Address:</p>
                <p>{shipping.addressLine}</p>
                <p>
                  {shipping.city}, {shipping.state}, {shipping.zip}
                </p>
                <p>{shipping.country}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={handlePrint}
            className="bg-[#A65A2E] hover:bg-[#3A2F2A] text-white px-5 py-3 rounded-lg w-full"
          >
            Print Receipt
          </button>

          <Link
            to="/"
            className="bg-[#3A2F2A] hover:bg-[#A65A2E] text-white px-5 py-3 rounded-lg w-full text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
