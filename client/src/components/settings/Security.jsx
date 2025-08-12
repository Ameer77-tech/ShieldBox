import React from "react";

const Security = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Privacy & Security</h1>
      <div className="mt-10 flex flex-col gap-1">
        <div className="flex items-center justify-between hover:bg-gray-700/20 p-2 rounded">
          <p className="tracking-wider">
            Change Password{" "}
            <span className="text-blue-600"></span>
          </p>
          <button className="btn btn-soft btn-accent">Change</button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20  p-2 rounded">
          <p className="tracking-wider">
            Secret Key -{" "}
            <span className="text-blue-600"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;
