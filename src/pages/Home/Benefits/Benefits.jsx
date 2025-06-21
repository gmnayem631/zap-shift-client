import React from "react";
import { FaMapMarkedAlt, FaShieldAlt, FaHeadset } from "react-icons/fa";
import BenefitCard from "./BenefitCard";

const benefits = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: <FaMapMarkedAlt className="text-5xl text-primary" />,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: <FaShieldAlt className="text-5xl text-primary" />,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: <FaHeadset className="text-5xl text-primary" />,
  },
];

const Benefit = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid gap-6">
      <h2 className="text-3xl font-extrabold text-center">Why choose us?</h2>
      {benefits.map((benefit, index) => (
        <BenefitCard key={index} benefit={benefit}></BenefitCard>
      ))}
    </div>
  );
};

export default Benefit;
