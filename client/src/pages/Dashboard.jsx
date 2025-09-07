import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../components/dashboard/MainHeading";
import Summary from "../components/dashboard/Summary";
import NavBar from "../components/dashboard/NavBar";
import { checkAuth, logout } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { secretKeyContext } from "../contexts/KeyContext";
import { FiLogOut } from "react-icons/fi";
import { userContext } from "../contexts/UserContext";
import getData from "../utils/getDataFromStorage";
import { motion } from "motion/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const { userData, setUserData } = useContext(userContext);
  const [totalCreated, setTotalCreated] = useState({
    sections: 0,
    items: 0,
  });
  const [recentViewedSections, setrecentViewedSections] = useState([]);
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
        setrecentViewedSections(response.recentViewedSections);
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
    if (loggedOut) {
      navigate("/");
      sessionStorage.clear();
    } else console.log("error logging out");
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }

  return (
    <div className="md:flex md:justify-between md:items-start relative min-h-screen bg-base-100">
      {/* Sidebar */}
      <div
        className="shadow-lg"
      >
        <NavBar userName={user.name} />
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col md:ml-76 md:p-6 p-4">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-between items-center bg-base-200 shadow-sm rounded-xl p-4 md:h-32 mb-8"
        >
          <MainHeading />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="btn btn-error btn-outline hidden md:flex gap-2"
          >
            <FiLogOut className="text-lg" />
            Logout
          </motion.button>
        </motion.div>

        {/* Summary Section */}
        <div
          className="w-full"
        >
          <Summary
            data={totalCreated}
            important={important}
            recentViewedSections={recentViewedSections}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
