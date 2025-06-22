import React from "react";
import { FaBuilding, FaMoneyBillWave, FaWarehouse } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import HowItWorksCard from "./HowItWorksCard";

const howItWorksData = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    illustration: <FaTruckFast />,
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    illustration: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    illustration: <FaWarehouse />,
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    illustration: <FaBuilding />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-8">
          How it Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {howItWorksData.map((item) => (
            <HowItWorksCard key={item.id} item={item}></HowItWorksCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
