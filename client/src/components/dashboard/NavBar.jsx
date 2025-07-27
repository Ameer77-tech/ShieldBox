import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { AnimatePresence, motion, spring } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const NavBar = ({userName}) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <FiMenu
        onClick={() => {
          setShowNav(!showNav);
        }}
        className="md:hidden absolute top-5 left-5 z-50"
      />
      {/* MOBILE NAVBAR */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: -350 }}
            animate={{ x: 0 }}
            exit={{ x: -350 }}
            transition={{ type: spring, stiffness: 35 }}
            className={`z-10 navbar md:hidden fixed
        py-10 px-0 flex-col justify-between items-start overflow-scroll min-h-screen bg-base-300 md:max-w-1/5 max-w-3/5  border-r-white border-r-1 shadow-black`}
          >
            <div className="navbar-start w-full flex flex-col justify-evenly items-center h-25 rounded border-b-1 border-b-white">
              <Link
                to="/dashboard"
                className="font-[rajdhani] font-semibold tracking-widest text-4xl text-center w-full cursor-pointer bg-gradient-to-r from-[#ffffff] to-[#3abdf8] text-transparent bg-clip-text select-none"
              >
                ShieldBox
              </Link>
              <p className="text-lg tracking-wide">
                Welcome, <span className="font-semibold">Ameer👋</span>
              </p>
            </div>
            <div className="navbar-center md:h-100 h-150 w-full items-start mt-10">
              <ul className="menu w-full gap-5">
                <li>
                  <details open>
                    <summary
                      className="z-10 bg-base-300 hover:bg-[#212021]"
                      style={{ opacity: 1 }}
                    >
                      Sections
                    </summary>

                    <div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-base-200 -z-10"
                    >
                      <li className="py-1">
                        <a>View Sections</a>
                      </li>
                      <li className="py-1">
                        <a>Add New Section</a>
                      </li>
                    </div>
                  </details>
                </li>

                <li>
                  <a>Recently Viewed</a>
                </li>
                <li>
                  <a>Important</a>
                </li>
                <li className="bg-base-200">
                  <details open>
                    <summary className="bg-base-300 hover:bg-[#212021]">
                      App Settings
                    </summary>
                    <details open>
                      <summary className="py-2 cursor-pointer select-none">
                        Theme
                      </summary>
                      <ul>
                        <li className="py-1">
                          <a>Dark</a>
                        </li>
                        <li className="py-1">
                          <a>Light</a>
                        </li>
                      </ul>
                    </details>
                  </details>
                </li>
              </ul>
            </div>
            <div className="w-full active:bg-indigo-900 transition-all ease flex items-center gap-3 p-4 cursor-pointer py-2 hover:bg-[#212021] select-none">
              <FiSettings />
              <p>Account Settings</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PC NAVBAR --------------------------------------------------------------------------------------------------------------------------------------------------------- PC NAVBAR */}

      <motion.div
        initial={{ x : '-100%' }}
        animate={{ x : 0 }}
        transition={{
          delay : 0.3,
          type : spring,
          stiffness : 30,
          duration : 0.5
        }}
        className={`z-10 navbar hidden fixed top-0 left-0 transform-none
        md:block py-10 px-0 flex-col justify-between items-start h-screen bg-base-300 md:max-w-1/5 max-w-3/4  shadow-black`}
      >
        <div className="navbar-start w-full flex flex-col justify-evenly items-center h-35 border-b-1 border-b-slate-600">
          <FaUserCircle size={80} />
          <p className="text-lg tracking-wide">
            <span className="">{userName}</span>
          </p>
        </div>
        <div className="navbar-center md:h-100 h-150 w-full items-start mt-10">
          <ul className="menu w-full gap-5">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <details open>
                <summary
                  className="z-10 bg-base-300 hover:bg-[#212021]"
                  style={{ opacity: 1 }}
                >
                  Sections
                </summary>

                <div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-base-200 -z-10"
                >
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
              <Link to="important">Important</Link>
            </li>
            <li className="bg-base-200">
              <details open>
                <summary className="py-2 cursor-pointer select-none bg-base-300">
                  Theme
                </summary>
                <ul>
                  <li className="py-1">
                    <a>Dark</a>
                  </li>
                  <li className="py-1">
                    <a>Light</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="w-full flex items-center gap-3 p-4 cursor-pointer py-2 hover:bg-[#212021] select-none">
          <FiSettings />
          <Link to="/settings">Account Settings</Link>
        </div>
      </motion.div>
    </>
  );
};

export default NavBar;
