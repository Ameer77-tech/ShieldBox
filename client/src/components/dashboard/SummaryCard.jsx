import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const SummaryCard = (props) => {
  return (
    <div className="card md:w-96 bg-base-100 md:card-xl shadow-sm">
      <div className="card-body">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.9,
              delay: props.index * 0.3,
            }}
            className="card-title"
          >
            {props.title}
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-4xl"
        >
          {props.count}
        </motion.p>
        <div className="justify-end card-actions">
          <Link to="/sections">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="btn btn-soft btn-primary text-sky-600 hover:text-white"
            >
              {props.button}
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
