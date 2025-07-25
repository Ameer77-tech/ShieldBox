import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFolderOpen,
} from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { checkAuth } from "../utils/AuthApi";
import { secretKeyContext } from "../contexts/KeyContext";
import { motion } from "motion/react";

export default function InsideSection() {
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setLoading(true);
    const response = await checkAuth();
    if (!response.success) {
      navigate("/login");
    } else if (!response.isKeySet) {
      navigate("/setkey");
    } else {
      const savedKey = sessionStorage.getItem("secretkey");
      if (!savedKey) navigate("/enterkey");
      else {
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-ring h-20 w-20"></span>
      </div>
    );
  }
  return (
    <div className="md:flex md:justify-between md:items-center">
      <NavBar />

      <div className="p-6 w-full md:ml-76">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/allsections">
            <button className="btn btn-sm btn-neutral">
              <FaArrowLeft className="mr-2" />
              Back
            </button>
          </Link>

          <div className="flex md:w-full justify-center items-center md:gap-5 gap-3">
            <h1 className="md:text-2xl text-sm font-bold overflow-hidden">
              <motion.p
                initial={{
                  y: "-100%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.7,
                }}
              >
                Personal Section
              </motion.p>
            </h1>{" "}
            <div className="overflow-hidden">
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: 0,
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.3,
                  delay: 0.7,
                }}
              >
                <FaFolderOpen size={25} />
              </motion.div>
            </div>
          </div>

          <button className="btn btn-primary">
            <FaPlus className="mr-2" />
            Add Item
          </button>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="table w-full overflow-hidden">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 5, 5, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
              ].map((item) => (
                <motion.tr
                  initial={{
                    opacity: 0,
                    scale: 0.99,
                    y: -20,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    whileInView: {
                      ease: "easeInOut",
                      duration: 0.7,
                    },
                  }}
                  viewport={{ once: true }}
                  key={item}
                >
                  <td className="font-medium">Gmail</td>
                  <td>454545</td>
                  <td>
                    <button className="btn btn-xs btn-neutral mr-2">
                      <FaEdit />
                    </button>
                    <button className="btn btn-xs btn-error">
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
