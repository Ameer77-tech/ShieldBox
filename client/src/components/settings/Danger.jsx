import React from "react";
import PopUp from "./PopUp";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const Danger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="md:p-10 p-5 mt-5">
        <h1 className="text-2xl font-bold text-red-600">Danger Zone</h1>
        <div className="mt-10 flex flex-col gap-1">
          <div className="flex items-center justify-center p-2">
            <button className="btn btn-dash btn-error btn-wide">
              Reset My Data
            </button>
          </div>
          <div className="flex items-center justify-center p-2 relative">
            <AnimatePresence>
              {isOpen && <PopUp onClose={onClose} />}
            </AnimatePresence>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="btn btn-error btn-wide"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Danger;
