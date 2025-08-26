import React, { useEffect, useState } from "react";
import { checkAuth } from "../../utils/AuthApi";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyCode } from "../../utils/AuthApi";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setemail] = useState("");
  const [code, setcode] = useState("");
  const [status, setstatus] = useState("");
  const [error, seterror] = useState(false);
  const data = location.state;
  const [loading, setLoading] = useState(false);
  const [Loading, setloading] = useState(false);
  
  useEffect(() => {
    if (data != null) {
      setemail(data.email);
      return;
    }
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setLoading(false);
      navigate("/dashboard");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code === "") {
      setstatus("Enter Your Code");
      return;
    }
    setloading(true);
    const res = await verifyCode(code, email);
    if (!res.success) {
      seterror(true);
      setstatus(res.reply);
      setloading(false)
      setLoading(false);
    } else {
      seterror(false);
      setstatus(res.reply);
      setLoading(false);
      navigate("/setkey", {
        state: {
          email,
        },
      });
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
    <div className="flex justify-center items-center min-h-screen select-none">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="card bg-base-300 rounded-lg justify-evenly md:px-10 md:py-10 md:w-2/6 w-80 px-5 py-7 gap-10 items-center"
      >
        <h1 className="text-2xl font-bold text-center text-blue-800">
          Enter the Verification Code Sent To Your Email
        </h1>
        <input
          onChange={(e) => setcode(e.target.value)}
          required
          type="text"
          placeholder="code"
          value={code}
          className="input input-md w-full text-center text-lg"
        />
        <button disabled={Loading} className="btn btn-soft btn-info">
          {Loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Submit"
          )}
        </button>
        <p>
          Did not receive the code,{" "}
          <button className="text-[#1d4e7e] cursor-pointer hover:underline">
            Resend code
          </button>
        </p>
        <p
          className={`md:absolute md:bottom-17 ${
            error ? "text-red-600" : "text-[#1d4f7f]"
          }`}
        >
          {status}
        </p>
      </form>
    </div>
  );
};

export default Verify;
