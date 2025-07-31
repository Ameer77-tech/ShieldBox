import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiCheck } from "react-icons/fi";
import { AnimatePresence, motion, spring } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { userContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { userData, setUserData } = useContext(userContext);

  return (
    <>
      {/* PC NAVBAR */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{
          x: 0,
          transition: {
            delay: 0.3,
            type: spring,
            stiffness: 30,
            duration: 0.5,
          },
        }}
        className="z-10 navbar hidden fixed top-0 left-0 transform-none md:block py-10 px-0 flex-col justify-between items-start h-screen bg-base-300 md:max-w-1/5 max-w-3/4 shadow-black"
      >
        <div className="navbar-start w-full flex flex-col justify-evenly items-center h-35 border-b-1 border-b-slate-600">
          <FaUserCircle size={80} />
          <p className="text-lg tracking-wide">
            <span>{userData.userName}</span>
          </p>
        </div>

        <div className="navbar-center md:h-100 h-150 w-full items-start mt-10">
          <ul className="menu w-full gap-5">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <details open>
                <summary className="z-10 bg-base-300 hover:bg-gray-700/40">
                  Sections
                </summary>
                <div className="bg-base-200 -z-10">
                  <li className="py-1">
                    <Link to="/sections">View Sections</Link>
                  </li>
                  <li className="py-1">
                    <Link to="/addsection">Add New Section</Link>
                  </li>
                </div>
              </details>
            </li>
            <li>
              <Link to="/recent">Recently Viewed</Link>
            </li>
            <li>
              <Link to="/important">Important</Link>
            </li>
          </ul>
        </div>

        <Link to="/settings">
          <div className="w-full flex items-center gap-3 p-4 cursor-pointer py-2 hover:bg-gray-700/40 hover:text-white select-none">
            <FiSettings />
            <p>Settings</p>
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default NavBar;
