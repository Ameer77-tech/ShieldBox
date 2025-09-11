import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { changePassword } from "../../utils/AppApi"; // 🔹 Implement this API

const PasswordPopUp = ({ onClose }) => {
  const [current, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false); // 🔹 to track error/success

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handlePasswordChange = async () => {
    setStatus("");
    setIsError(false);

    // Validation
    if (!current || !newPassword || !confirmPassword) {
      setStatus("All fields are required.");
      setIsError(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus("New passwords do not match.");
      setIsError(true);
      return;
    }
    if (newPassword.length < 6) {
      setStatus("Password must be at least 6 characters.");
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await changePassword({
        current,
        newPassword,
      });
      if (response.success) {
        setStatus("✅ Password updated successfully!");
        setIsError(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Close popup after a delay
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        setStatus(response.error || "Failed to update password.");
        setIsError(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setStatus("Error updating password.");
      setIsError(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setLoading(false);
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
          transition: { ease: "anticipate" },
        }}
        transition={{ duration: 0.2 }}
        className="bg-base-200 rounded-xl shadow-xl w-[400px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-xl">Change Password</p>

        {/* Inputs */}
        <div className="mt-5 space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={current}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="New Password (min 6 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Re-enter New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-evenly p-5 mt-5">
          <button className="btn btn-dash btn-info" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            Update
          </button>
        </div>

        {/* Status */}
        {status && (
          <p
            className={`text-center text-lg mt-2 ${
              isError ? "text-red-500" : "text-green-400"
            }`}
          >
            {status}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default PasswordPopUp;
