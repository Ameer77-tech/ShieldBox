import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import Verify from "./pages/auth/Verify";
import SetKey from "./pages/auth/SetKey";
import EnterKey from "./pages/auth/EnterKey";
import ResetAccount from "./pages/auth/ResetAccount";
import NotFound from "./pages/NotFound";
import Sections from "./pages/Sections";
import NavBar from "./components/dashboard/NavBar";
import Section from "./pages/Section";

const AnimatedRoutes = () => {
  const location = useLocation();
  

  return (
    <>
      <AnimatePresence mode="wait" location={location}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allsections" element={<Sections />} />
          <Route path="/section/:sectionid" element={<Section />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/setkey" element={<SetKey />} />
          <Route path="/enterkey" element={<EnterKey />} />
          <Route path="/resetaccount" element={<ResetAccount />} />
          <Route path="/resetaccount" element={<ResetAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
