import React, { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import { FaUserCircle } from "react-icons/fa";


const Profile = ({name}) => {
    const { userData } = useContext(userContext)
  return (
    <div className="navbar-start w-full flex flex-col justify-evenly items-center h-auto border-b-1 border-b-slate-600 p-5">
      <FaUserCircle size={120} />
      <p className="text-2xl tracking-wide mt-5">
        <span>{name}</span>
      </p>
    </div>
  );
};

export default Profile;
