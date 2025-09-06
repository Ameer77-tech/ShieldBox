import React, { useContext, useState } from "react";
import { userContext } from "../../contexts/UserContext";
import ChangeUserNamePopUp from "./ChangeNamePopUp";
import { AnimatePresence } from "framer-motion";

const Info = ({ name, email }) => {
  const { userData } = useContext(userContext);
  const [isOpen, setisOpen] = useState(false);
  const onClose = () => {
    setisOpen(false);
  };

  return (
    <div className="md:p-10 p-5 mt-5">
      <AnimatePresence>
        {isOpen && <ChangeUserNamePopUp onClose={onClose} />}
      </AnimatePresence>
      <h1 className="md:text-2xl text-xl font-bold">Profile Info</h1>
      <div className="md:mt-10 mt-5 flex flex-col md:gap-1 gap-5">
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Username - <span className="text-blue-600">{name}</span>
          </p>
          <button
            onClick={() => setisOpen(true)}
            className="btn btn-soft btn-accent"
          >
            Change
          </button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Email address - <span className="text-blue-600">{email}</span>
          </p>
        </div>
        <div className="mt-5 flex justify-center">
          <button className="btn font-medium">Change Profile Picture</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
