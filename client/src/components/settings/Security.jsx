import React, { useEffect, useState } from "react";

const Security = () => {
  const [secretKey, setsecretKey] = useState("");

  useEffect(() => {
    let key = sessionStorage.getItem("secretkey");
    setsecretKey(key);
  }, []);

  return (
    <div className="md:p-10 p-5 mt-5">
      <h1 className="md:text-2xl text-xl font-bold">Privacy & Security</h1>
      <div className="md:mt-10 mt-5 flex flex-col md:gap-1 gap-5">
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Change Password <span className="text-blue-600"></span>
          </p>
          <button className="btn btn-soft btn-accent">Change</button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20  md:p-2 rounded">
          <p className="tracking-wider">
            Secret Key - <span className="text-blue-600">{secretKey}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Security;
