import React, { useState } from "react";
import { motion } from "motion/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteItem } from "../../utils/AppApi";

const ItemField = ({ name, value, sectionId, itemDeleteHandler }) => {
  const [loading, setloading] = useState(false);

  const handleItemDelete = async (name, id) => {
    setloading(true);
    const response = await deleteItem(name, id);
    if (response.success) {
      itemDeleteHandler(name);
      setloading(false);
    } else {
      console.log("Error");
      setloading(false);
    }
  };

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
      <td className="font-medium">{name}</td>
      <td>{value}</td>
      <td>
        <button className="btn btn-xs btn-neutral mr-2">
          <FaEdit />
        </button>
        <button
          onClick={() => handleItemDelete(name, sectionId)}
          className="btn btn-xs btn-error"
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <FaTrash />
          )}
        </button>
      </td>
    </motion.tr>
  );
};

export default ItemField;
