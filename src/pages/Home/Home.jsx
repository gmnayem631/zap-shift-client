import React from "react";
import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import ClientLogosMarquee from "./ClientLogosMarquee/ClientLogosMarquee";
import Benefit from "./Benefits/Benefits";
import BeMerchant from "./BeMerchant/BeMerchant";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogosMarquee></ClientLogosMarquee>
      <div className="border-1 border-dashed mt-5 border-[#03464D] max-w-7xl mx-auto"></div>
      <Benefit></Benefit>
      <BeMerchant></BeMerchant>
    </div>
  );
};

export default Home;
