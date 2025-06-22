import React from "react";
import arrow from "../../../assets/arrow.png";

const FAQ = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col gap-5 text-center mb-5 mt-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03373D]">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-[#606060]">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How long does delivery take?
          </div>
          <div className="collapse-content text-sm">
            Delivery usually takes 24 to 72 hours, depending on the destination
            and package type. For major cities, we offer same-day or next-day
            delivery options.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Can I track my order in real-time?
          </div>
          <div className="collapse-content text-sm">
            Yes! Once your parcel is picked up, you'll receive a tracking ID.
            You can use it on our website or mobile app to track your order in
            real-time.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Do you offer Cash on Delivery (COD)?
          </div>
          <div className="collapse-content text-sm">
            Absolutely. We offer Cash on Delivery services across Bangladesh.
            It’s a safe and convenient way for customers to pay when they
            receive their parcel.
          </div>
        </div>{" "}
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            What should I do if my parcel is delayed or lost?
          </div>
          <div className="collapse-content text-sm">
            If your parcel is delayed beyond the expected time or goes missing,
            please contact our support team immediately. We’ll investigate the
            issue and ensure it's resolved as quickly as possible, including
            compensation where applicable.
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mt-3">
          <button className="btn btn-primary rounded-xl text-[#1F1F1F] text-xl">
            See More FAQ’s
          </button>{" "}
          <div className="rounded-full  bg-black p-1 cursor-pointer">
            <img src={arrow} className="h-8" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
