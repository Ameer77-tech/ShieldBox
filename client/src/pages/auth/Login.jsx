import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [show, setshow] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen select-none">
      <form className="card bg-base-300 rounded-lg justify-evenly md:px-10 md:py-20 md:w-2/6 w-[90%] px-5 py-7 gap-10 items-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <label className="floating-label w-full">
          <span>Your Email</span>
          <input
            required
            type="text"
            placeholder="mail@site.com"
            className="input input-md w-full"
          />
        </label>
        <label className="floating-label w-full relative">
          <span>Password</span>
          <input
            required
            type={`${show ? "text" : "password"}`}
            placeholder="password"
            className="input input-md w-full"
          />
          {show ? (
            <FaEye
              onClick={() => setshow(!show)}
              className={`text-red-600 absolute right-5 top-2/4 -translate-y-2/4 cursor-pointer z-10`}
            />
          ) : (
            <FaEyeSlash
              onClick={() => setshow(!show)}
              className={`text-[#1d4e7e] absolute right-5 top-2/4 -translate-y-2/4 cursor-pointer z-10`}
            />
          )}
        </label>
        <button className="btn btn-primary">Login</button>

        <p>
          Don't have an account,{" "}
          <Link to="/register">
            <span className="text-[#1d4e7e] cursor-pointer hover:underline">
              Register
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
