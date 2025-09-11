import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteItem, updateFields } from "../../utils/AppApi";
import { encrypt } from "../../utils/EncryptDecrypt";

const ItemField = ({
  itemId, // ✅ get itemId from parent (InsideSection → Items.map)
  name,
  value,
  sectionId,
  isEditing,
  setisEditing,
  getFields,
  index,
}) => {
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState({
    itemId: itemId, // ✅ include ID
    updateName: name,
    updateValue: value,
  });

  const handleItemDelete = async (id, secId) => {
    setloading(true);
    const response = await deleteItem(id, secId); // ✅ send itemId to API
    if (response.success) {
      getFields();
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
      try {
        setloading(true);

        const key = sessionStorage.getItem("secretkey");
        if (!key) {
          console.error("No encryption key found");
          setloading(false);
          return;
        }

        const encryptedData = {
          itemId: formData.itemId,
          updateName: await encrypt(formData.updateName, key),
          updateValue: await encrypt(formData.updateValue, key),
        };

        const response = await updateFields(sectionId, encryptedData);

        if (!response.success) {
          console.log(response.error);
        } else {
          getFields();
          setisEditing(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    }
  };

  useEffect(() => {
    setformData({
      itemId: itemId, // ✅ always keep id in sync
      updateName: name,
      updateValue: value,
    });
  }, [isEditing, name, value, itemId]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        y: -2,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-base-200 rounded-xl shadow-md p-4 flex flex-col justify-between md:min-w-[220px] md:max-w-xs w-full mx-auto"
    >
      {/* Name & Value */}
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <input
            type="text"
            name="updateName"
            value={formData.updateName || ""}
            onChange={(e) =>
              setformData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Name"
            className="input input-bordered input-sm w-full"
          />
        ) : (
          <h3 className="font-semibold text-lg truncate" title={name}>
            {name}
          </h3>
        )}

        {isEditing ? (
          <input
            type="text"
            name="updateValue"
            value={formData.updateValue || ""}
            onChange={(e) =>
              setformData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Value"
            className="input input-bordered input-sm w-full"
          />
        ) : (
          <p className="text-gray-500 truncate" title={value}>
            {value}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 justify-end flex-wrap">
        {isEditing ? (
          <>
            <button
              onClick={() => handleEdit("ok")}
              className="btn btn-success btn-xs"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Ok"
              )}
            </button>
            <button
              onClick={() => setisEditing("")}
              className="btn btn-error btn-xs"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEdit("edit")}
              className="btn btn-primary btn-xs"
            >
              <FaEdit />
            </button>
            <button
              disabled={loading}
              onClick={() => handleItemDelete(itemId, sectionId)}
              className="btn btn-error btn-xs"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaTrash />
              )}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ItemField;
