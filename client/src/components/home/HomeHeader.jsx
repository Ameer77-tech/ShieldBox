import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const HomeHeader = ({ active, setactive }) => {
  return (
    <div className="navbar shadow-sm md:px-20 lg:px-20 fixed backdrop-blur-lg bg-black/30 w-full z-10">
      <motion.div
        initial={{
          y: "-140%",
        }}
        animate={{
          y: 0,
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.9,
          delay: 0.7,
        }}
        className="navbar-start"
      >
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
              className={`text-md ${active === "home" ? "text-purple-600" : ""}`}
              onClick={() => setactive("home")}
            >
              <a href="#home">Home</a>
            </li>
            <li
              className={`text-md ${
                active === "services" ? "text-purple-600" : ""
              }`}
              onClick={() => setactive("services")}
            >
              <a href="#services">Services</a>
            </li>
          </ul>
        </div>

        <Link
          to="/"
          className="font-[rajdhani] font-semibold tracking-wider text-2xl cursor-pointer text-purple-600 select-none"
        >
          ShieldBox
        </Link>
      </motion.div>
      <motion.div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">
          <motion.li
            initial={{
              y: "-140%",
            }}
            animate={{
              y: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.9,
              delay: 0.8,
            }}
            className="overflow-hidden"
          >
            <a
              href="#home"
              className={`text-md ${active === "home" ? "text-purple-600" : ""}`}
              onClick={() => setactive("home")}
            >
              Home
            </a>
          </motion.li>
          <motion.li
            initial={{
              y: "-140%",
            }}
            animate={{
              y: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.9,
              delay: 0.9,
            }}
          >
            <a
              href="#services"
              className={`text-md ${
                active === "services" ? "text-purple-600" : ""
              }`}
              onClick={() => setactive("services")}
            >
              Services
            </a>
          </motion.li>
        </ul>
      </motion.div>
      <div className="navbar-end">
        <Link to="login">
          {" "}
          <button className="btn btn-soft btn-primary px-7 overflow-hidden">
            <motion.span
              initial={{
                y: "-140%",
              }}
              animate={{
                y: 0,
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.9,
                delay: 1,
              }}
            >
              Login
            </motion.span>
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
