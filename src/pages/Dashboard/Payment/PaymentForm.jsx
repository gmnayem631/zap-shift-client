import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const { parcelId } = useParams();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/parcels/${parcelId}`);
      return response.data;
    },
  });
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen"></div>
    );
  }
  console.log(parcelInfo);

  const amount = parcelInfo.deliveryCost;
  const amountsInCents = amount * 100;

  // console.log(parcelId);
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

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountsInCents,
      parcelId,
    });

    // confirm payment
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Ben",
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded");
        console.log(result);
      }
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
        Pay ৳{amount}
      </button>
    </form>
  );
};

export default PaymentForm;
