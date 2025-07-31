import React from "react";

const Danger = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-red-600">Danger Zone</h1>
      <div className="mt-10 flex flex-col gap-1">
        <div className="flex items-center justify-center p-2">
          <button className="btn btn-dash btn-error btn-wide">Reset My Data</button>
        </div>
        <div className="flex items-center justify-center p-2">
         <button className="btn btn-error btn-wide">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Danger;
