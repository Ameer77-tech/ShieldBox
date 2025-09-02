import React from "react";
import { motion } from "motion/react";

const Activity = ({ name, time }) => {
  const formattedTime = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <li className="list-row overflow-hidden">
        <motion.div
          initial={{ y: "-100%" }}
          whileInView={{ y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          viewport={{ once: true }}
          className={`list-col-grow text-md uppercase font-semibold
          }`}
        >
          {name}
        </motion.div>
        <div className="text-green-600">{formattedTime}</div>
      </li>
    </>
  );
};

export default Activity;
