import React from "react";
import Banner from "./Banner/Banner";
import Services from "./Services/Services";
import ClientLogosMarquee from "./ClientLogosMarquee/ClientLogosMarquee";
import Benefit from "./Benefits/Benefits";
import BeMerchant from "./BeMerchant/BeMerchant";
import HowItWorks from "./HowItWorks/HowItWorks";
import FAQ from "./FAQ/FAQ";
import Review from "./Review/Review";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <ClientLogosMarquee></ClientLogosMarquee>
      <div className="border-1 border-dashed mt-5 border-[#03464D] max-w-7xl mx-auto"></div>
      <Benefit></Benefit>
      <BeMerchant></BeMerchant>
      <Review></Review>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
