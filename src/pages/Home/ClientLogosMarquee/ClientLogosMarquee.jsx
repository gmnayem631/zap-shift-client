import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

const logos = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  startPeople,
  start,
];

const ClientLogosMarquee = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        We've helped thousands of sales teams
      </h2>
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden hover:cursor-pointer"
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 flex items-center justify-center">
            <img
              src={logo}
              alt={`Client Logo ${index + 1}`}
              className="h-16 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogosMarquee;
