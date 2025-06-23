import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../pages/Home/shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="p-5 min-h-screen max-w-7xl mx-auto flex flex-col">
      <ProFastLogo />

      <div className="flex flex-1 flex-col lg:flex-row-reverse items-stretch rounded-3xl overflow-hidden mt-4">
        {/* Right side image */}
        <div className="bg-[#FAFDF0] flex-1 flex items-center justify-center">
          <img src={authImage} alt="Auth" className="max-w-full h-auto" />
        </div>

        {/* Left side form */}
        <div className="flex-1 bg-white flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
