import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteItem, updateFields } from "../../utils/AppApi";

const ItemField = ({
  name,
  value,
  sectionId,
  itemDeleteHandler,
  isEditing,
  setisEditing,
  getFields,
  index,
}) => {
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState({
    oldName: name,
    updateName: name,
    updateValue: value,
  });
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

  const handleEdit = async (event) => {
    if (event === "edit") {
      setisEditing(index);
      return;
    } else {
      if (formData.updateName === name && formData.updateValue === value) {
        setisEditing(false);
        return;
      }
      console.log(formData);
      try {
        setloading(true);
        const response = await updateFields(sectionId, formData);
        if (!response.success) {
          console.log(response.error);
          setloading(false);
        } else {
          setloading(false);
          setisEditing(false);
          getFields();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setformData({
      oldName: name,
      updateName: name,
      updateValue: value,
    });
  }, [isEditing]);

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
      {isEditing ? (
        <td>
          <input
            onChange={(e) =>
              setformData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            value={formData.updateName}
            name="updateName"
            className="p-2 text-center outline-none border-b-2 border-b-accent"
          />
        </td>
      ) : (
        <td className="font-medium">{name}</td>
      )}
      {isEditing ? (
        <td>
          <input
            onChange={(e) =>
              setformData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            value={formData.updateValue}
            name="updateValue"
            className="p-2 text-center outline-none border-b-2 border-b-accent"
          />
        </td>
      ) : (
        <td className="font-medium">{value}</td>
      )}
      <td>
        {isEditing ? (
          <button
            onClick={() => handleEdit("ok")}
            className="btn btn-xs btn-neutral mr-2 text-blue-600"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Ok"
            )}
          </button>
        ) : (
          <button
            onClick={() => handleEdit("edit")}
            className="btn btn-xs btn-neutral mr-2"
          >
            <FaEdit />
          </button>
        )}

        {isEditing ? (
          <button
            onClick={() => setisEditing("")}
            className="btn btn-xs btn-error"
          >
            Cancel
          </button>
        ) : (
          <button
          disabled={loading}
            onClick={() => handleItemDelete(name, sectionId)}
            className="btn btn-xs btn-error"
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaTrash />
            )}
          </button>
        )}
      </td>
    </motion.tr>
  );
};

export default ItemField;
