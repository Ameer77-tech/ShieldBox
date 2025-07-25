import React, { Suspense, useContext, useEffect, useState } from "react";
import MainHeading from "../components/dashboard/MainHeading";
import Summary from "../components/dashboard/Summary";
import NavBar from "../components/dashboard/NavBar";
import { checkAuth } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { secretKeyContext } from "../contexts/KeyContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
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
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
  };

  const circle = document.getElementById('cursor-follower')

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }

  return (
    <div className="md:flex md:justify-between md:items-center relative">
      <div id="cursor-follower" className="z-100 absolute top-1/4 left-2/4 h-2 w-2 shadow-black shadow-xl bg-white rounded-full"></div>
      <NavBar />
      <div className="w-full min-h-screen flex flex-col md:ml-76">
        <MainHeading />
        <Summary />
      </div>
    </div>
  );
};

export default Dashboard;
