import React, { useEffect, useState } from "react";
import Profile from "../../components/settings/Profile";
import NavBar from "../../components/dashboard/NavBar";
import Info from "../../components/settings/Info";
import Security from "../../components/settings/Security";
import Preferences from "../../components/settings/Preferences";
import Danger from "../../components/settings/Danger";
import getData from "../../utils/getDataFromStorage";

const AccSettings = () => {
  const [userData, setuserData] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    const data = getData();
    document.documentElement.setAttribute("data-theme", theme);
    setuserData(data);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col md:ml-77 w-full p-10">
        <Profile name={userData.userName} />
        <Info name={userData.userName} email={userData.email} />
        <Security />
        <Preferences theme={theme} setTheme={setTheme} />
        <Danger />
      </div>
    </div>
  );
};

export default AccSettings;
