import React from "react";

const HowItWorksCard = ({ item }) => {
  const { illustration, title, description } = item;
  return (
    <div className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition-all text-center">
      <div className="mx-auto text-5xl w-20 h-20 object-contain">
        {illustration}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default HowItWorksCard;
