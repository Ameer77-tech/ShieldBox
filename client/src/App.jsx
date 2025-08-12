import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

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
import Section from "./pages/Section";
import AccSettings from "./pages/settings/AccSettings";

const AnimatedRoutes = () => {
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
   }, [])
   
  const location = useLocation()

  return (
 
      <AnimatePresence mode="wait" location={location}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/sections/:sectionname/:sectionid" element={<Section />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/setkey" element={<SetKey />} />
          <Route path="/enterkey" element={<EnterKey />} />
          <Route path="/resetaccount" element={<ResetAccount />} />
          <Route path="/settings" element={<AccSettings/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
   
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
