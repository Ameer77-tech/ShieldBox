import React from "react";
import { FaFolder } from "react-icons/fa";
import { motion } from "motion/react";

const RecentlyViewed = ({ index }) => {
  return (
    <motion.div 
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{delay:index*0.2}}
    className="card image-full w-90 shadow-sm">
      <figure>
        <img src="/card-bg.jpg" alt="Shoes" />
      </figure>
      <div className="card-body justify-between">
        <h2 className="card-title text-3xl">Personal</h2>
        <div className="card-actions justify-between items-center">
          <FaFolder size={30} />
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentlyViewed;
