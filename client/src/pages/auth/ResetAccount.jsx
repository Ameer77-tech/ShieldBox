import React, { useEffect, useState } from "react";
import { checkAuth } from "../../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const ResetAccount = () => {
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
    <div className="flex justify-center items-center min-h-screen select-none flex-col">
      <div className="card bg-base-300 rounded-lg justify-evenly md:px-10 md:py-10 md:w-2/6 w-[90%] px-5 py-7 gap-10 items-center">
        <h1 className="text-center">
          We’re sorry, but for your privacy and security, we can’t recover or
          reset your key. If you can’t remember it, you can choose to reset your
          account — but this will permanently delete all your stored data.
        </h1>
        <button className="btn btn-soft btn-error">Reset My Account</button>
      </div>
      <button
        className="btn btn-circle btn-ghost absolute top-5 left-5"
        onClick={() => navigate("/enterkey")} // Navigate back to the previous page
      >
        <FiArrowLeft size={24} />
      </button>
    </div>
  );
};

export default ResetAccount;
