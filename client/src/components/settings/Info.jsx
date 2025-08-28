import React, { useContext } from "react";
import { userContext } from "../../contexts/UserContext";

const Info = ({name,email}) => {
  const { userData } = useContext(userContext);
  return (
    <div className="md:p-10 p-5 mt-5">
      <h1 className="md:text-2xl text-xl font-bold">Profile Info</h1>
      <div className="md:mt-10 mt-5 flex flex-col md:gap-1 gap-5">
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Username -{" "}
            <span className="text-blue-600">{name}</span>
          </p>
          <button className="btn btn-soft btn-accent">Change</button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20 md:p-2 rounded">
          <p className="tracking-wider">
            Email address -{" "}
            <span className="text-blue-600">{email}</span>
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
