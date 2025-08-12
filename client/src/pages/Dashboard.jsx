import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../components/dashboard/MainHeading";
import Summary from "../components/dashboard/Summary";
import NavBar from "../components/dashboard/NavBar";
import { checkAuth, logout } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { secretKeyContext } from "../contexts/KeyContext";
import { motion } from "motion/react";
import { FiLogOut } from "react-icons/fi";
import { userContext } from "../contexts/UserContext";
import getData from "../utils/getDataFromStorage";

const Dashboard = () => {
  const navigate = useNavigate();
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const { userData, setUserData } = useContext(userContext);
  const [totalCreated, setTotalCreated] = useState({
    sections: 0,
    items: 0,
  });
  const [important, setImportant] = useState(0);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const response = await checkAuth();

    if (!response.success) {
      navigate("/login");
    } else if (!response.isKeySet) {
      navigate("/setkey");
    } else {
      const savedKey = sessionStorage.getItem("secretkey") || "";
      if (!savedKey) navigate("/enterkey");
      else {
        setUserData(() => ({
          email: response.email,
          userName: response.name,
        }));
        setTotalCreated({
          sections: response.totalSections,
          items: response.totalItems,
        });
        setImportant(response.important);
        setDataInStorage(response.email, response.name);
        getDataFromStorage();
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
  };
  const setDataInStorage = (email, name, theme) => {
    const existingData = getData();
    let userData = {
      ...existingData,
      email,
      userName: name,
      theme,
    };
    localStorage.setItem("user-data", JSON.stringify(userData));
  };

  const getDataFromStorage = () => {
    const existingData = getData();
    if (existingData === "") console.log("error fetching data or no data");
    else {
      setUserData(existingData);
      setUser({
        name: existingData.userName,
        email: existingData.email,
      });
    }
  };

  const handleLogout = async () => {
    const loggedOut = await logout();
    if (loggedOut) navigate("/");
    else console.log("error logging out");
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }

  return (
    <div className="md:flex md:justify-between md:items-center relative min-h-screen">
      <NavBar userName={user.name} />
      <div className="w-full min-h-screen flex flex-col md:ml-76">
        <div className="flex justify-between items-center px-5 md:h-40 pt-5">
          <MainHeading />
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            <FiLogOut />
            Logout
          </button>
        </div>
        <div>
          {" "}
          <Summary data={totalCreated} important={important}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
