import React from "react";
import { motion } from 'motion/react'
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const ItemField = () => {
  return (
    <motion.tr
      initial={{
        opacity: 0,
        scale: 0.99,
        y: -20,
      }}
      whileHover={{
        scale: 1.01,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
      transition={{
        whileInView: {
          ease: "easeInOut",
          duration: 0.7,
        },
      }}
      viewport={{ once: true }}
    >
      <td className="font-medium">Gmail</td>
      <td>454545</td>
      <td>
        <button className="btn btn-xs btn-neutral mr-2">
          <FaEdit />
        </button>
        <button className="btn btn-xs btn-error">
          <FaTrash />
        </button>
      </td>
    </motion.tr>
  );
};

export default ItemField;
