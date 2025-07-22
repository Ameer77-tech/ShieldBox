import React, { useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Footer from "../components/home/Footer";

const Home = () => {
  const [active, setactive] = useState("home");
  return (
    <>
      <HomeHeader active={active} setactive={setactive} />
      <Hero />
      <Services />
      <Footer />
    </>
  );
};

export default Home;
