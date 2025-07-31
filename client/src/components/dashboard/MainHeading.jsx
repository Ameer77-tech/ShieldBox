import React from "react";
import { motion } from 'motion/react'
import ThemeController from "../Theme/ThemeController";

const MainHeading = () => {
  return (
    <div className="overflow-hidden flex gap-3 items-center">
      <motion.p 
      initial={{x:'-100%'}}
      animate={{x:0}}
      transition={{ease:'easeInOut', duration : 0.9, delay : 1}}
      className="uppercase font-[sora] grid place-items-center md:text-4xl tracking-wide font-semibold">
        Dashboard
      </motion.p>
      <ThemeController/>
    </div>
  );
};

export default MainHeading;
