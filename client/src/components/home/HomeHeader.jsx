import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = ({ active, setactive }) => {
  return (
    <div className="navbar shadow-sm md:px-20 lg:px-20 fixed backdrop-blur-lg bg-black/30 w-full z-10">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2"
          >
            <li
              className={`text-md ${active === "home" ? "text-[#00D1B2]" : ""}`}
              onClick={() => setactive("home")}
            >
              <a href="#home">Home</a>
            </li>
            <li
              className={`text-md ${
                active === "services" ? "text-[#00D1B2]" : ""
              }`}
              onClick={() => setactive("services")}
            >
              <a href="#services">Services</a>
            </li>
          </ul>
        </div>

        <Link
          to="/"
          className="font-semibold tracking-wider text-2xl cursor-pointer text-[#00D1B2] select-none"
        >
          ShieldBox
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">
          <li>
            <a
              href="#home"
              className={`text-md ${active === "home" ? "text-[#00D1B2]" : ""}`}
              onClick={() => setactive("home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`text-md ${
                active === "services" ? "text-[#00D1B2]" : ""
              }`}
              onClick={() => setactive("services")}
            >
              Services
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-soft btn-primary px-7">Login</button>
      </div>
    </div>
  );
};

export default HomeHeader;
