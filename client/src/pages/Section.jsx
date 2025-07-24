import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFolderOpen,
} from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { checkAuth } from "../utils/AuthApi";

export default function InsideSection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
            <h1 className="md:text-2xl text-sm font-bold">Personal Section</h1>{" "}
            <FaFolderOpen size={25} />
          </div>

          <button className="btn btn-primary">
            <FaPlus className="mr-2" />
            Add Item
          </button>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((item) => (
                <tr key={item}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
