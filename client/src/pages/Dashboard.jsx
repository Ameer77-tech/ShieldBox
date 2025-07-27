import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../components/dashboard/MainHeading";
import Summary from "../components/dashboard/Summary";
import NavBar from "../components/dashboard/NavBar";
import { checkAuth, logout } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { secretKeyContext } from "../contexts/KeyContext";
import { motion } from "motion/react";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const [userName, setuserName] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthorization();

    // Attach mousemove once
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
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
        setuserName(response.name);
        setSecretKey(savedKey);
        setLoading(false);
      }
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
      <NavBar userName={userName} />
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
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
