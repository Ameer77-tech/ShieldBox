import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Home from "./pages/home";
import Dashboard from "./pages/home";
import Login from "./pages/auth/login";
import CreateAccount from "./pages/auth/createAccount";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<CreateAccount />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
};

export default App;
