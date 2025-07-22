import React from "react";
import { FiAlertCircle } from "react-icons/fi"; // Feather icons


const Footer = () => {
  return (
    <div className="grid grid-cols-2 place-items-center">
      <button className="btn btn-outline btn-accent flex items-center gap-2">
        Download Backup
      </button>
      <button className="btn btn-outline btn-warning flex items-center gap-2">
        <FiAlertCircle className="text-red-500" />
        Reset Vault
      </button>
    </div>
  );
};
export default Footer;
