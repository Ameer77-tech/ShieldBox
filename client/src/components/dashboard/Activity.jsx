import React from "react";
import { motion } from "motion/react";

const Activity = () => {
  return (
    <>
      <li className="list-row overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ease:'easeInOut', duration : 1}}
          viewport={{once:true}}
          className="list-col-grow text-md uppercase font-semibold"
        >
          Created New Section
        </motion.div>
        <div className="text-green-600">Recent</div>
      </li>
    </>
  );
};

export default Activity;
