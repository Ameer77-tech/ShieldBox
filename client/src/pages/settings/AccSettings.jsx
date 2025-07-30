import React from "react";
import Profile from "../../components/settings/Profile";
import NavBar from "../../components/dashboard/NavBar";
import Info from "../../components/settings/Info";

const AccSettings = () => {
  return (
    <div className="flex min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col md:ml-77 w-full p-10">
        <Profile />
        <Info/>
      </div>
    </div>
  );
};

export default AccSettings;
