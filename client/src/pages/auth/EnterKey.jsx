import React, { useRef, useState, useEffect, useContext } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../../utils/AuthApi";
import { secretKeyContext } from "../../contexts/KeyContext";

const EnterKey = () => {
  const navigate = useNavigate();
  const { secretkey, setSecretKey } = useContext(secretKeyContext);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  };
  const [keyArray, setKeyArray] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }

  const handleInput = (e, idx) => {
    let value = e.target.value;
    // Only keep the last character entered
    value = value.slice(-1);

    const tempArr = keyArray.map((val, index) => (idx === index ? value : val));
    setKeyArray(tempArr);

    // Move to next input if not last and value is not empty
    if (value && idx < keyArray.length - 1) {
      inputRef.current[idx + 1].focus();
    } else if (!value) {
      // Optionally, if input is cleared, stay or move back
      inputRef.current[idx].focus();
    } else {
      inputRef.current[idx].blur();
    }
  };

  const handleKey = (e, idx) => {
    const enteredKey = e.key;
    if (enteredKey === "Backspace") {
      if (keyArray[idx]) {
        // If current input is not empty, clear it
        const tempArr = keyArray.map((val, index) =>
          idx === index ? "" : val
        );
        setKeyArray(tempArr);
        // Prevent default backspace behavior (so it doesn't go to previous input)
        e.preventDefault();
      } else if (idx > 0) {
        // If already empty, move focus to previous input
        inputRef.current[idx - 1].focus();
      }
    } else if (enteredKey === "Enter" || enteredKey === "Space") {
      if (idx < keyArray.length - 1) {
        inputRef.current[idx + 1].focus();
      } else {
        inputRef.current[idx].blur();
      }
    }
  };
  const handleSubmit = () => {
    const input = keyArray.join("");
    if (input.length < 6) {
      setStatus("Key must be 6 digits long");
      return;
    } else {
      setSecretKey(input);
      navigate("/decrypt", { state: { key: input } });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen select-none">
      <div className="card bg-base-300 rounded-lg justify-evenly md:px-10 md:py-10 md:w-2/6 w-[90%] px-5 py-7 gap-10 items-center">
        <h1 className="text-xl font-[rajdhani] font-bold text-center">
          Enter the unlock key to continue
        </h1>
        <div className="flex justify-between w-full items-center ">
          {keyArray.map((digit, idx) => (
            <input
              ref={(el) => (inputRef.current[idx] = el)}
              key={idx}
              value={digit}
              onKeyDown={(e) => handleKey(e, idx)}
              onChange={(e) => handleInput(e, idx)}
              className="max-w-9 text-lg border-2 border-slate-600 py-2 px-2 text-center focus:border-blue-700 outline-0 rounded-lg"
            ></input>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-soft btn-info font-[rajdhani]"
        >
          CONTINUE
        </button>
        <p>
          Forgot the Key ?{" "}
          <Link to="/resetaccount" className="text-red-700 hover:underline">
            Reset Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EnterKey;
