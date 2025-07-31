import React, { useContext } from "react";
import { userContext } from "../../contexts/UserContext";

const Info = ({name,email}) => {
  const { userData } = useContext(userContext);
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Profile Info</h1>
      <div className="mt-10 flex flex-col gap-1">
        <div className="flex items-center justify-between hover:bg-gray-700/20 p-2 rounded">
          <p className="tracking-wider">
            Username -{" "}
            <span className="text-blue-600">{name}</span>
          </p>
          <button className="btn btn-soft btn-accent">Change</button>
        </div>
        <div className="flex items-center justify-between hover:bg-gray-700/20  p-2 rounded">
          <p className="tracking-wider">
            Email address -{" "}
            <span className="text-blue-600">{email}</span>
          </p>
        </div>
        <div className="mt-5">
          <button className="btn font-medium">Change Profile Picture</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
