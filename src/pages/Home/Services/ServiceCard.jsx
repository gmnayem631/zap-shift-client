import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl hover:bg-[#CAEB66] hover:cursor-pointer transition duration-300">
      <div className="card-body items-center text-center space-y-3">
        <div className="text-4xl text-primary">
          <Icon />
        </div>
        <h3 className="card-title text-xl font-bold ">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
