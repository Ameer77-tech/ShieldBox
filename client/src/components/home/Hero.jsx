import React from "react";

const Hero = () => {
  return (
    <div className="hero bg-base-200 md:min-h-screen h-150" id="home">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="md:text-7xl text-5xl font-bold bg-gradient-to-r from-[#ffffff] to-[#3abdf8] text-transparent bg-clip-text">SHIELDBOX</h1>
          <p className="mb-3 mt-2 md:text-2xl">Your All-in-One Encrypted Vault</p>
          <p className="mt-2 text-slate-500 md:text-xl text-center">
            Store everyThing that Matters - Passwords, Personal Info, Business
            Data, Medical Records, and more -- securely in one place
          </p>
          <button className="btn btn-primary mt-10 md:text-lg">Go to your vault</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
