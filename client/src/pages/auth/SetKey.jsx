import { checkAuth, isKeySet } from "../../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect, useContext } from "react";
import { secretKeyContext } from "../../contexts/KeyContext";

const SetKey = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setstatus] = useState("");
  const { key, setSecretKey } = useContext(secretKeyContext);
  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const response = await checkAuth();
    if (!response.success) {
      navigate("/login");
    } else if (response.isKeySet) {
      navigate("/dashboard");
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

  const setTheKey = async () => {
    const key = keyArray.join("");
    if (key.length < 6) {
      setstatus("Key must be 6 digits long");
    } else {
      let ok = confirm("Continue to set the Key ?");
      if (!ok) {
        return;
      }
      setstatus("");
      setSecretKey(key);
      setKeyArray(["", "", "", "", "", ""]);
      const response = await isKeySet();
      if (!response) console.log("Error occured");
      else navigate("/dashboard");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen select-none">
      <div className="card bg-base-300 rounded-lg justify-evenly md:px-10 md:py-10 md:w-2/6 w-[90%] px-5 py-7 gap-10 items-center">
        <h1 className="text-xl font-[rajdhani] font-bold">
          Set a secret key for your app
        </h1>
        <div className="flex justify-between w-full items-center ">
          {keyArray.map((digit, idx) => (
            <input
              ref={(el) => (inputRef.current[idx] = el)}
              key={idx}
              value={digit}
              onKeyDown={(e) => handleKey(e, idx)}
              onChange={(e) => handleInput(e, idx)}
              className="max-w-12 text-lg border-2 border-slate-600 py-3 text-center focus:border-blue-700 outline-0 rounded-lg"
            ></input>
          ))}
        </div>
        <p className="text-red-600 absolute md:bottom-2/4 bottom-53 text-sm">
          {status}
        </p>
        <button
          onClick={setTheKey}
          className="btn btn-soft btn-info font-[rajdhani]"
        >
          SET
        </button>
        <div className="flex justify-center items-center">
          <p className="text-gray-700 text-sm inline text-center">
            Note: Your key is never stored on our servers. Only you know it. If
            you lose or forget your key, we cannot help you recover it, and you
            will lose access to your data. Please write it down and keep it in a
            safe place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetKey;
