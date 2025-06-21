import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Home/shared/Navbar/Navbar";
import Footer from "../pages/Home/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <header className="shadow-sm ">
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
