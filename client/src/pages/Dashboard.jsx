import React, { useEffect, useState } from "react";
import MainHeading from "../components/dashboard/MainHeading";
import Summary from "../components/dashboard/Summary";
import NavBar from "../components/dashboard/NavBar";
import { checkAuth } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setLoading(false);
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
    <div className="md:flex md:justify-between md:items-center">
      <NavBar />
      <div className="w-full min-h-screen flex flex-col md:ml-76">
        <MainHeading />
        <Summary />
      </div>
    </div>
  );
};

export default Dashboard;
