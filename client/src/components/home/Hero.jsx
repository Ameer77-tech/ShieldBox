import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'motion/react'

const Hero = () => {
  return (
    <div className="hero bg-base-200 md:min-h-screen h-150" id="home">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <motion.h1 
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.15,duration:2,ease:'linear'}}
          className="font-[rajdhani] md:text-7xl text-5xl font-bold bg-gradient-to-r from-[#ffffff] to-[#3abdf8] text-transparent bg-clip-text">SHIELDBOX</motion.h1>
          <p className="mb-3 mt-2 md:text-2xl">Your All-in-One Encrypted Vault</p>
          <p className="font-[poppins] mt-2 text-slate-500 md:text-xl text-center">
            Store everyThing that Matters - Passwords, Personal Info, Business
            Data, Medical Records, and more -- securely in one place
          </p>
          <Link to="/dashboard"><button className="font-[rajdhani] btn btn-primary mt-10 md:text-lg">Go to your vault</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
