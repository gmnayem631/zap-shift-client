import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Home/shared/Navbar/Navbar";
import Footer from "../pages/Home/shared/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const RootLayout = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <header className="shadow-sm bg-base-100 ">
        <Navbar className="max-w-7xl"></Navbar>
      </header>
      <main className="my-10">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
