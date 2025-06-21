import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel
      stopOnHover={true}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={10}
      interval={2500}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
    >
      <div className="rounded-2xl">
        <img src={bannerImg1} />
        <p className="legend font-semibold text-xl">On Time Delivery</p>
      </div>
      <div className="rounded-2xl">
        <img src={bannerImg2} />
        <p className="legend font-semibold text-xl">Fastest Delivery</p>
      </div>
      <div className="rounded-2xl">
        <img src={bannerImg3} />
        <p className="legend font-semibold text-xl">Delivery in 30 Minutes</p>
      </div>
    </Carousel>
  );
};

export default Banner;
