import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { checkAuth, register } from "../../utils/AuthApi";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [status, setstatus] = useState("");
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    isLogged();
  }, []);

  const isLogged = async () => {
    const res = await checkAuth();
    if (res) {
      navigate("/dashboard");
    } else {
      setLoading(false);
      return;
    }
  };

  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setloading(true);
      const res = await register(formData);
      if (!res.success) {
        seterror(true);
        setstatus(res.reply);
        setloading(false);
      } else {
        seterror(false);
        setstatus(res.reply);
        setloading(loading);
        navigate("/verify", {
          state: { fromRegister: true, email: formData.email },
        });
      }
    }
  };

  if (Loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full select-none">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-300 rounded-lg justify-evenly md:px-10 px-5 py-10 md:py-20 md:w-2/6 w-[90%] gap-10 items-center"
      >
        <h1 className="text-2xl font-bold">Create your account</h1>

        {/* Username */}
        <label className="floating-label w-full">
          <span>Username</span>
          <input
            required
            type="text"
            placeholder="username"
            className="input input-md w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                className="text-red-500 text-sm mt-1 ml-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {errors.username}
              </motion.p>
            )}
          </AnimatePresence>
        </label>

        {/* Email */}
        <label className="floating-label w-full">
          <span>Your Email</span>
          <input
            required
            type="text"
            placeholder="mail@site.com"
            className="input input-md w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                className="text-red-500 text-sm mt-1 ml-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </label>

        {/* Password */}
        <label className="floating-label w-full relative">
          <span>Password</span>
          <input
            required
            type={show ? "text" : "password"}
            placeholder="password"
            className="input input-md w-full"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className="absolute right-5 top-2/4 -translate-y-2/4 z-10 cursor-pointer">
            {show ? (
              <FaEye className="text-red-600" onClick={() => setShow(!show)} />
            ) : (
              <FaEyeSlash
                className="text-[#1d4e7e]"
                onClick={() => setShow(!show)}
              />
            )}
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                className="text-red-500 text-sm mt-1 ml-1 fixed font-bold"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </label>

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Login"
          )}
        </button>

        <p>
          Already have an account,
          <Link to="/login">
            {" "}
            <span className="text-[#1d4e7e] cursor-pointer hover:underline">
              Register
            </span>
          </Link>
        </p>
        <p
          className={`absolute bottom-10 ${
            error ? "text-red-600" : "text-[#1d4f7f]"
          }`}
        >
          {status}
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
