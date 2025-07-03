import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="border p-2 rounded"></CardElement>
      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
      <button
        type="submit"
        className="btn btn-primary text-black text-lg w-full"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
