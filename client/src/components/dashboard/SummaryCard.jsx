import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";

const SummaryCard = (props) => {
  const [displayCount, setDisplayCount] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, props.count, {
      duration: 2, // seconds
      ease: "easeOut",
      delay: props.index * 0.3, // stagger like your title
      onUpdate: (latest) => {
        setDisplayCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [props.count, props.index, count]);

  return (
    <div className="card md:w-89 bg-base-100 md:card-xl shadow-sm">
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

        {/* Animated counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-4xl"
        >
          {displayCount.toLocaleString()} {/* adds commas like 1,000 */}
        </motion.p>

        <div className="justify-end card-actions">
          <Link to="/sections">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
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
