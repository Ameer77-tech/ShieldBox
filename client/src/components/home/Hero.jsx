import React from "react";
import { Link } from "react-router-dom";
import { motion, spring } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="hero bg-base-200 md:min-h-screen h-150" id="home">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="overflow-hidden">
            <motion.h1 
            initial={{
              y : "100%"
            }}
            animate={{
              y : 0
            }}
            transition={{
              ease : "anticipate",
              duration : 1.2
              
            }}
            className="font-[rajdhani] md:text-7xl text-5xl font-bold text-purple-600">
              SHIELDBOX
            </motion.h1>
          </div>
          <p className="mb-3 mt-2 md:text-2xl">
            Your All-in-One Encrypted Vault
          </p>
          <p className="font-[poppins] mt-2 text-slate-500 md:text-xl text-center">
            Store everyThing that Matters - Passwords, Personal Info, Business
            Data, Medical Records, and more -- securely in one place
          </p>
          <Link to="/dashboard">
            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: -2,
              }}
              whileTap={{
                scale:1 
              }}
              className="font-[rajdhani] btn btn-primary mt-10 md:text-lg"
            >
              Go to your vault <FaArrowRight size={15} />
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
