import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [show, setshow] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen w-full select-none">
      <form className="card bg-base-300 rounded-lg justify-evenly md:px-10 px-5 py-10 md:py-20 md:w-2/6 w-[90%] gap-10 items-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <label className="floating-label w-full">
          <span>username</span>
          <input
            required
            type="text"
            placeholder="username"
            className="input input-md w-full"
          />
        </label>
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
        <button className="btn btn-primary">Register</button>

        <p>
          Already have an account,{" "}
          <Link to="/login">
            {" "}
            <span className="text-[#1d4e7e] cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
