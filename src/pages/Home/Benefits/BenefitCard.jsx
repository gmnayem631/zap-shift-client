import React from "react";

const BenefitCard = ({ benefit }) => {
  const { image, title, description } = benefit;
  return (
    <div className="flex items-center bg-base-100 shadow-md rounded-2xl p-6 overflow-hidden">
      {/* Left: Image */}
      <div className="p-6 flex justify-center items-center">{image}</div>

      {/* Divider */}
      <div className="h-full w-px bg-gray-300" />

      {/* Right: Content */}
      <div className="flex-1 p-6">
        <h3 className="text-xl font-semibold mb-2 text-neutral">{title}</h3>
        <p className="text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
