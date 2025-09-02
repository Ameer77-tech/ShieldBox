import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/auth/Login"));
const CreateAccount = lazy(() => import("./pages/auth/CreateAccount"));
const Verify = lazy(() => import("./pages/auth/Verify"));
const SetKey = lazy(() => import("./pages/auth/SetKey"));
const EnterKey = lazy(() => import("./pages/auth/EnterKey"));
const ResetAccount = lazy(() => import("./pages/auth/ResetAccount"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sections = lazy(() => import("./pages/Sections"));
const Section = lazy(() => import("./pages/Section"));
const AccSettings = lazy(() => import("./pages/settings/AccSettings"));

const AnimatedRoutes = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const location = useLocation();

  return (
    <AnimatePresence mode="wait" location={location}>
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sections" element={<Sections />} />
          <Route
            path="/sections/:sectionname/:sectionid"
            element={<Section />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/setkey" element={<SetKey />} />
          <Route path="/enterkey" element={<EnterKey />} />
          <Route path="/resetaccount" element={<ResetAccount />} />
          <Route path="/settings" element={<AccSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

export default App;
