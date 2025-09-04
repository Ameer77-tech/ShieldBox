import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiCheck } from "react-icons/fi";
import { AnimatePresence, motion, spring } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { userContext } from "../../contexts/UserContext";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../utils/AuthApi";
import { useNavigate } from "react-router-dom";

const NavBar = ({ name }) => {
  const navigate = useNavigate();
  const { userData } = useContext(userContext);
  const [isNavOpen, setisNavOpen] = useState(false);

  if (isNavOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const handleLogout = async () => {
    setisNavOpen(false);
    const loggedOut = await logout();
    if (loggedOut) {
      navigate("/");
      sessionStorage.clear();
    } else console.log("error logging out");
  };
  return (
    <>
      <button
        className="btn z-120 btn-square btn-ghost md:hidden fixed top-5 left-5"
        onClick={() => setisNavOpen((prev) => !prev)} // Toggle navbar visibility
      >
        <FiMenu size={24} />
      </button>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            onClick={() => setisNavOpen(false)}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.1,
            }}
            exit={{
              opacity: 0,
            }}
            className="overlay fixed inset-0 z-50 bg-black/30"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "-100%" }}
              animate={{
                x: 0,
                transition: {
                  ease: "easeInOut",
                  duration: 0.3,
                },
              }}
              exit={{
                x: "-100%",
                transition: {
                  ease: "anticipate",
                  delay: 0,
                },
              }}
              className="z-60 navbar fixed top-0 left-0 transform-none md:hidden py-10 px-0 flex-col items-start h-screen bg-base-300 w-3/4 max-w-xs shadow-black"
            >
              <div className="navbar-start w-full flex flex-col justify-evenly items-center h-35 border-b-1 border-b-slate-600">
                <FaUserCircle size={80} />
                <p className="text-lg tracking-wide">
                  <span>{userData.userName}</span>
                </p>
              </div>

              <div className="navbar-center md:h-100 h-50 w-full items-start mt-10">
                <ul className="menu w-full gap-5">
                  <li>
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li>
                    <details open>
                      <summary className="z-10 bg-base-300 hover:bg-gray-700/40">
                        Sections
                      </summary>
                      <div className="-z-10 bg-transparent">
                        <li className="py-1">
                          <Link to="/sections">View Sections</Link>
                        </li>
                      </div>
                    </details>
                  </li>
                </ul>
              </div>

              <Link to="/settings">
                <div className="w-full flex items-center gap-3 p-4 cursor-pointer py-2 hover:bg-gray-700/40 hover:text-white select-none">
                  <FiSettings />
                  <p>Settings</p>
                </div>
              </Link>
              <div className="w-full flex items-center gap-3 p-4 cursor-pointer py-2 hover:bg-red-600 hover:text-white select-none">
                <FiLogOut />
                <button onClick={handleLogout} className="btn btn-error btn-sm">
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* PC NAVBAR */}
      <div
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
            <span>{userData.userName || name}</span>
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
                <div className="-z-10 bg-transparent">
                  <li className="py-1">
                    <Link to="/sections">View Sections</Link>
                  </li>
                </div>
              </details>
            </li>
          </ul>
        </div>

        <Link to="/settings">
          <div className="w-full flex items-center gap-3 p-4 cursor-pointer py-2 hover:bg-gray-700/40 hover:text-white select-none">
            <FiSettings />
            <p>Settings</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
