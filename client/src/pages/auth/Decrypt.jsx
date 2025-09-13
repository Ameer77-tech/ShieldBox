import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { encrypt, decrypt } from "../../utils/EncryptDecrypt";
import { motion } from "motion/react";
import { getTestData } from "../../utils/AuthApi";

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

        if (!key) {
          alert("No decryption key provided! Redirecting...");
          navigate("/enterkey");
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
            const cipher = await getTestData();
            if (!cipher) {
              console.error("No cipher text found!");
              setLoading(false);
              return;
            }
            await decrypt(cipher.encryptedString, key);
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card bg-base-300 shadow-2xl p-8 rounded-2xl w-full max-w-md"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-3"
        >
          Decrypting Data
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-center mb-5 text-gray-400"
        >
          Please wait while we decrypt your data.
        </motion.p>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5"
          >
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            ></progress>
            <motion.p
              key={progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-3 text-gray-500 font-medium"
            >
              {progress}%
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-5"
          >
            <p
              className={`${
                isValid ? "text-green-500" : "text-red-600"
              } font-bold text-lg`}
            >
              {isValid ? "✅ Decryption Complete" : ""}
            </p>

            {isValid && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary mt-6 w-full"
                onClick={() =>
                  navigate("/dashboard", {
                    replace: true,
                    state: { from: "decrypt", key: "" },
                  })
                }
              >
                Go to Dashboard
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Decrypt;
