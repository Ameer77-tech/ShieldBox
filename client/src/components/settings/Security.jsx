import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PasswordPopUp  from "./ChangePasswordPopUp";

const Security = () => {
  const [secretKey, setsecretKey] = useState("");
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    let key = sessionStorage.getItem("secretkey");
    setsecretKey(key);
  }, []);

  const onClose = () => {
    setisOpen(false);
  }

  return (
    <div className="md:p-10 p-5 mt-5">
      <h1 className="md:text-2xl text-xl font-bold">Privacy & Security</h1>
      <div className="md:mt-10 mt-5 flex flex-col md:gap-1 gap-5">
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Change Password <span className="text-blue-600"></span>
          </p>
           <AnimatePresence>
              {isOpen && <PasswordPopUp onClose={onClose} />}
            </AnimatePresence>
          <button 
          onClick={() => setisOpen(true)}
          className="btn btn-soft btn-accent">Change</button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20  md:p-2 rounded">
          <p className="tracking-wider">
            Secret Key - <span className="text-blue-600">********</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;
