import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { db } from "../../Firebase/firebase";
import CardPreview from "../components/CardPreview";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/BreadCrumbs";

const Checkout = () => {
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const [method, setMethod] = useState("");
  const [focus, setFocus] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    addressLine: "",
    description: "",
    cardNumber: "",
    expDate: "",
    securityCode: "",
    cardName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const pickMethod = (e) => setMethod(e.target.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "zip",
      "addressLine",
      "cardNumber",
      "expDate",
      "securityCode",
      "cardName",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!method) {
      errors.payment = "Please choose a payment method";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!currentUser) {
      toast.error("You must be logged in to checkout.");
      return;
    }

    setIsSubmitting(true);

    const shippingAddress = {
      addressLine: formData.addressLine,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: "Nigeria",
    };

    const orderData = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      products: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        selectedColor: item.colorHex || null,
        selectedSize: item.size || null,
      })),
      shippingAddress,
      totalAmount: parseFloat(total),
      paymentMethod: method,
      status: "processing",
      description: formData.description,
      createdAt: serverTimestamp(),
    };

    try {
      // Save to /orders (Admin access)
      const orderRef = await addDoc(collection(db, "orders"), orderData);

      // Save to /users/{userId}/orders
      await setDoc(
        doc(db, "users", currentUser.uid, "orders", orderRef.id),
        orderData
      );

      // Save shipping address locally
      localStorage.setItem("shippingDetails", JSON.stringify(shippingAddress));
      localStorage.setItem("latestOrder", JSON.stringify(orderData));

      toast.success("Order placed successfully!");
      navigate("/thank-you");

      setIsSubmitting(false);
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to place order. Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#EFEAE5] min-h-screen p-6 flex flex-col md:flex-row gap-8">
      {/* Shipping Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-7/12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#3A2F2A]">
          Shipping Address
        </h2>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", name: "firstName", placeholder: "Mark" },
            { label: "Last Name", name: "lastName", placeholder: "Otto" },
            { label: "Email", name: "email", placeholder: "email@example.com" },
            { label: "Phone", name: "phone", placeholder: "08012345678" },
            { label: "City", name: "city", placeholder: "Lagos" },
            { label: "State", name: "state", placeholder: "LA" },
            { label: "Zip", name: "zip", placeholder: "100001" },
            {
              label: "Street Address",
              name: "addressLine",
              placeholder: "123 Elm Street",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm mb-1">{field.label}*</label>
              <input
                name={field.name}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
              />
              {formErrors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label>Description (Optional)</label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Add delivery notes or extra details"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A65A2E] h-24"
          />
        </div>

        {/* Payment Section */}
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-[#3A2F2A]">
          Payment Method
        </h2>
        <div className="flex gap-4 flex-wrap">
          {[
            { id: "creditCard", label: "Credit / Debit Card" },
            { id: "payPal", label: "PayPal" },
          ].map((opt) => (
            <div
              key={opt.id}
              id={opt.id}
              onClick={pickMethod}
              className={`border rounded-lg px-5 py-3 cursor-pointer flex items-center gap-3 w-48 ${
                method === opt.id
                  ? "border-[#A65A2E] bg-[#F8F5F2]"
                  : "hover:border-[#A65A2E]"
              }`}
            >
              <input
                type="radio"
                id={opt.id}
                name="payment"
                checked={method === opt.id}
                onChange={() => setMethod(opt.id)}
              />
              <label htmlFor={opt.id} className="cursor-pointer">
                {opt.label}
              </label>
            </div>
          ))}
        </div>
        {formErrors.payment && (
          <p className="text-red-500 text-xs mt-2">{formErrors.payment}</p>
        )}

        {/* Card Details */}
        {method === "creditCard" && (
          <>
            <CardPreview
              cardNumber={formData.cardNumber}
              cardName={formData.cardName}
              expDate={formData.expDate}
              securityCode={formData.securityCode}
              focus={focus}
            />
            <div className="mt-6 space-y-3">
              <input
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
                name="cardNumber"
                 onFocus={() => setFocus("")}
                placeholder="Card Number"
                onChange={handleChange}
              />
              {formErrors.cardNumber && (
                <p className="text-red-500 text-xs">{formErrors.cardNumber}</p>
              )}

              <div className="flex gap-3">
                <input
                  className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
                  type="month"
                  name="expDate"
                   onFocus={() => setFocus("")}
                  placeholder="MM/YY"
                  onChange={handleChange}
                />
                <input
                  className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
                  name="securityCode"
                  onFocus={() => setFocus("securityCode")}
                  onBlur={() => setFocus("")}
                  placeholder="CVV"
                  onChange={handleChange}
                />
              </div>

              <input
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
                name="cardName"
                onFocus={() => setFocus("")}
                placeholder="Name on Card"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Submit */}
        <button
          disabled={isSubmitting}
          className={`mt-6 w-full bg-[#3A2F2A] text-white py-3 rounded-lg hover:bg-[#A65A2E] ${
            isSubmitting && "opacity-70 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Processing..." : `Pay ₦${total}`}
        </button>
      </form>

      {/* Cart Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-5/12">
        <h2 className="text-2xl font-semibold mb-4 text-[#3A2F2A]">
          Your Cart Summary
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.category} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₦{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="border-t pt-4 flex justify-between font-semibold text-lg">
              <p>Total:</p>
              <p>₦{total}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
