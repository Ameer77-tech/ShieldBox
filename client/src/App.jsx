import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount"
import Verify from "./pages/auth/Verify";
import Key from "./pages/auth/Key";


const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <>
     
        <AnimatePresence mode="wait" location={location}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/verify" element={<Verify />} />
             <Route path="/key" element={<Key />} />
          </Routes>
        </AnimatePresence>
      
    </>
  );
};

const App = ()=>{
  return (
     <BrowserRouter>
      <AnimatedRoutes/>
     </BrowserRouter>
  )
}

export default App;
