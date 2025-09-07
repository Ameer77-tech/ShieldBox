import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { changeUserName } from "../../utils/AppApi";

const PopUp = ({ onClose }) => {
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleUpdateName = async (updatedName) => {
    setloading(true);
    setstatus("");
    try {
      const response = await changeUserName(updatedName);
      if (response.success) {
        setstatus(
          "UserName Updated Successfully, if not please visit home page once"
        );
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setstatus(response.error || "Failed to update UserName");
      }
    } catch (err) {
      setstatus("Failed to update UserName ", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-[200]">
          <div className="loading loading-spinner loading-lg text-white"></div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.8,
          transition: {
            ease: "anticipate",
          },
        }}
        transition={{ duration: 0.2 }}
        className="bg-base-200 rounded-xl shadow-xl w-[400px] p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside popup
      >
        <p className="text-center text-xl">Enter a New UserName</p>

        <div className="mt-5">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full flex justify-evenly p-5 mt-5">
          <button className="btn btn-dash btn-info" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={() => {
              handleUpdateName(updatedName);
              // onClose()
            }}
            disabled={loading} // Disable button while loading
          >
            Update
          </button>
        </div>
        <p className="text-center text-white text-lg">{status}</p>
      </motion.div>
    </div>
  );
};

export default PopUp;
