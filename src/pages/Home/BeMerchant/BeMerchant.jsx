import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div className="hero bg-[#03373D] max-w-7xl mx-auto p-20 rounded-3xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={location} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl text-white font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-[#dadada]">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn bg-primary rounded-full font-bold py-4 px-8">
            Become a merchant
          </button>
          <button className="btn btn-outline text-primary ml-4 hover:bg-primary hover:text-[#1F1F1F] rounded-full font-bold py-4 px-8">
            Earn with ProFast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
