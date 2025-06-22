import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../pages/Home/shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200 max-w-7xl mx-auto">
      <ProFastLogo></ProFastLogo>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
