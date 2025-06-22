import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import customerTop from "../../../assets/customer-top.png";

const reviews = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    occupation: "Software Developer, Dhaka",
    review:
      "I've used many local services, but this one really stands out. Very user-friendly and responsive!",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    occupation: "Lecturer, University of Dhaka",
    review:
      "The design is clean, and the performance is smooth. Proud to see such initiatives from Bangladesh!",
  },
  {
    id: 3,
    name: "Rasel Hossain",
    occupation: "Entrepreneur, Chattogram",
    review:
      "A game-changer for small businesses like mine. It helped me reach more customers online.",
  },
  {
    id: 4,
    name: "Farzana Akter",
    occupation: "Freelance Graphic Designer, Sylhet",
    review:
      "Beautiful interface, easy navigation, and overall a pleasant experience. Highly recommended!",
  },
  {
    id: 5,
    name: "Imran Kabir",
    occupation: "NGO Worker, Barishal",
    review:
      "We’ve used this platform for outreach programs. It’s simple yet effective. Keep it up!",
  },
];

const Review = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="flex flex-col justify-center items-center gap-4 my-10 w-1/2 mx-auto">
        <div className="">
          <img src={customerTop} alt="" />
        </div>
        <h2 className="text-4xl font-extrabold text-[#03373D]">
          What our customers are sayings
        </h2>
        <p className="text-[#606060] text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {reviews.map((review, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide key={review.id} className="cursor-pointer">
              <div
                className={`bg-white rounded-2xl p-6 shadow-xl border text-center border-gray-100 transition duration-500
                  ${
                    isActive
                      ? "scale-100 opacity-100 z-10"
                      : "scale-90 opacity-60"
                  } 
                `}
              >
                <FaQuoteLeft className="text-3xl text-primary mx-auto mb-4" />
                <p className="text-gray-700 italic mb-4">"{review.review}"</p>
                <hr className="border-dashed border-1 border-t border-gray-300 my-4 w-2/3 mx-auto" />
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.occupation}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Review;
