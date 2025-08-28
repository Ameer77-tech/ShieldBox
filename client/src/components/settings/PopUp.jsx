import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deleteAccount } from "../../utils/AuthApi";
import { useNavigate } from "react-router-dom";

const PopUp = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onDelete = async (password) => {
    if (password == "") {
      setstatus("Field cant be empty");
      return;
    }
    setloading(true);
    const { success, res } = await deleteAccount(password);
    if (success) {
      setstatus(res.response.data.reply);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
      setloading(false);
    } else {
      setstatus(res.response.data.reply);
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
        <p className="text-center text-xl">
          Please enter your account password to confirm deletion. This operation
          will delete your account permanently along with your existing data.
        </p>

        <div className="mt-5">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full flex justify-evenly p-5 mt-5">
          <button className="btn btn-dash btn-info" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={() => onDelete(password)}
            disabled={loading} // Disable button while loading
          >
            Delete
          </button>
        </div>
        <p className="text-center text-red-600 text-lg font-semibold">
          {status}
        </p>
      </motion.div>
    </div>
  );
};

export default PopUp;
