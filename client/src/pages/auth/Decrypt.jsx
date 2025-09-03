import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { decrypt } from "../../utils/EncryptDecrypt";

const Decrypt = () => {
  const [loading, setLoading] = useState(true); // State for loading process
  const [progress, setProgress] = useState(0); // State for progress percentage
  const location = useLocation(); // Access the passed state (key)
  const navigate = useNavigate();
  const [isValid, setisValid] = useState(false);
  useEffect(() => {
    let interval;

    async function decryption() {
      try {
        const key = location.state?.key;
        console.log(typeof key);

        if (!key) {
          alert("No decryption key provided! Redirecting...");
          navigate("/");
          return;
        }

        setProgress(0);
        setLoading(true);

        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
            }
            return prev + 10;
          });
        }, 220);

        setTimeout(async () => {
          try {
            const cipher = localStorage.getItem("test-data");
            if (!cipher) {
              console.error("No cipher text found in localStorage!");
              setLoading(false);
              return;
            }
            console.log(cipher);

            const testData = await decrypt(cipher, key);
            console.log("Decrypted:", testData);
            setisValid(true);
            sessionStorage.setItem("secretkey", key);
          } catch (err) {
            console.error("Wrong key or decryption failed:", err);
            setisValid(false);
            alert("Invalid key! Redirecting...");
            navigate("/enterkey");
          } finally {
            setLoading(false);
          }
        }, 2000);
      } catch (err) {
        console.error("Decryption setup failed:", err);
        setLoading(false);
        navigate("/enterkey");
      }
    }

    decryption();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200">
      <div className="card bg-base-300 shadow-xl p-8 rounded-lg w-[90%] md:w-1/3">
        <h1 className="text-2xl font-bold text-center mb-5">Decrypting Data</h1>
        <p className="text-sm text-center mb-5">
          Please wait while we decrypt your data.
        </p>

        {loading ? (
          <div className="mt-5">
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            ></progress>
            <p className="text-center mt-2">{progress}%</p>
          </div>
        ) : (
          <div className="text-center mt-5">
            <p
              className={`${
                isValid ? "text-green-500" : "text-red-600"
              } font-bold`}
            >
              {isValid ? "Decryption Complete" : "Wrong Key"}
            </p>
            {isValid && (
              <button
                className="btn btn-primary mt-5"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Decrypt;
