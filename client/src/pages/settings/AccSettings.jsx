import React, { useEffect, useState } from "react";
import Profile from "../../components/settings/Profile";
import NavBar from "../../components/dashboard/NavBar";
import Info from "../../components/settings/Info";
import Security from "../../components/settings/Security";
import Preferences from "../../components/settings/Preferences";
import Danger from "../../components/settings/Danger";
import getData from "../../utils/getDataFromStorage";
import { checkAuth } from "../../utils/AuthApi";
import { useNavigate } from "react-router-dom";

const AccSettings = () => {
  const [userData, setuserData] = useState({});
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    checkAuthorization();
    const data = getData();
    document.documentElement.setAttribute("data-theme", theme);
    setuserData(data);
  }, []);
  const checkAuthorization = async () => {
    const response = await checkAuth();
    if (!response.success) {
      navigate("/login");
    } else if (!response.isKeySet) {
      navigate("/setkey");
    } else {
      const savedKey = sessionStorage.getItem("secretkey") || "";
      if (!savedKey) navigate("/enterkey");
      else setloading(false);
    }
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div>
        <NavBar name={userData.userName} />
      </div>
      <div className="flex flex-col md:ml-77 w-full md:p-10">
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
