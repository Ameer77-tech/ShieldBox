import React, { useContext } from "react";
import Search from "../components/sections/Search";
import SectionCard from "../components/sections/SectionCard";
import { FaPlus } from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "../utils/AuthApi";
import { secretKeyContext } from "../contexts/KeyContext";

const Sections = () => {
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
      const savedKey = sessionStorage.getItem("secretkey");
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
    <div className="md:flex md:justify-between md:items-center">
      <NavBar />

      <div className="md:w-full min-h-screen flex flex-col md:ml-76 md:p-10 p-5">
        <Search />
        <div className="flex justify-between items-center mt-13">
          <p className="font-medium text-3xl">My Sections</p>
          <button className="btn btn-primary mr-2">
            <FaPlus className="mr-2" />
            Add Section
          </button>
        </div>
        <div className="mt-5 flex flex-wrap md:gap-5 gap-5">
          <SectionCard />
          <SectionCard />
          <SectionCard />
           <SectionCard />
          <SectionCard />
          <SectionCard />
           <SectionCard />
          <SectionCard />
          <SectionCard />
           <SectionCard />
          <SectionCard />
          <SectionCard />
           <SectionCard />
          <SectionCard />
          <SectionCard />
           <SectionCard />
          <SectionCard />
          <SectionCard />
        </div>
      </div>
    </div>
  );
};

export default Sections;
