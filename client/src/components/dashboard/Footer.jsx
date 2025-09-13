import React from "react";
import { FiAlertCircle } from "react-icons/fi"; // Feather icons
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const naviagate = useNavigate();
  return (
    <div className="grid grid-cols-2 place-items-center">
      <button
        onClick={() => {
          alert("Feature coming soon");
        }}
        className="btn btn-outline btn-info flex items-center gap-2"
      >
        Download Backup
      </button>
      <button
        onClick={() => {
          naviagate("/resetaccount");
        }}
        className="btn btn-outline btn-warning flex items-center gap-2"
      >
        <FiAlertCircle className="text-red-500" />
        Reset Vault
      </button>
    </div>
  );
};
export default Footer;
