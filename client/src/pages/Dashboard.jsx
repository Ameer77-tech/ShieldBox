import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../components/dashboard/MainHeading";
import Summary from "../components/dashboard/Summary";
import NavBar from "../components/dashboard/NavBar";
import { checkAuth } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { secretKeyContext } from "../contexts/KeyContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
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
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
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
      <div
        id="cursor-follower"
        style={{
          left: coords.x + "px",
          top: coords.y + "px",
        }}
        className="fixed h-2 w-2 bg-white rounded-full z-50 pointer-events-none transition-transform duration-75 ease-out"
      ></div>
      <NavBar />
      <div className="w-full min-h-screen flex flex-col md:ml-76">
        <MainHeading />
        <Summary />
      </div>
    </div>
  );
};

export default Dashboard;
