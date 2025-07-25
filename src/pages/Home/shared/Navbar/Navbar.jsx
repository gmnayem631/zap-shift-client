import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import useAuth from "../../../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const handleLogout = () => {
    logoutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink to={"/"} className="text-lg">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/sendParcel"} className="text-lg">
          Send a Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"} className="text-lg">
          Coverage
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to={"/dashboard"} className="text-lg">
              Dashboard
            </NavLink>
          </li>
        </>
      ) : (
        ""
      )}
      <li>
        <NavLink to={"/beARider"} className="text-lg">
          Be a Rider
        </NavLink>
      </li>{" "}
      <li>
        <NavLink className="text-lg">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <div className="btn btn-ghost text-xl">
          <ProFastLogo></ProFastLogo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <Link to={"/login"} className="btn btn-primary text-black">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn btn-primary text-black">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
