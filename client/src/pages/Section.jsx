import { FaArrowLeft, FaPlus, FaFolderOpen } from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { checkAuth } from "../utils/AuthApi";
import { secretKeyContext } from "../contexts/KeyContext";
import { motion } from "motion/react";
import ItemField from "../components/sections/ItemField";
import { getItems } from "../utils/AppApi";

export default function InsideSection() {
  const [Items, setItems] = useState([]);
  const [Loading, setloading] = useState(false);
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const params = useParams();
  const id = params.sectionid;
  const name = params.sectionname;
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
        getFields();
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
  };

  const getFields = async () => {
    setloading(true);
    const response = await getItems(id);
    let { items } = response;
    if (response.success) {
      setItems(items);
      setloading(false);
    } else {
      console.log("Server Error");
      setloading(false);
    }
  };

   const handleItemDelete = (name)=>{
    const existing = [ ...Items ]
    const updated = existing.filter(item=>{
      if(name != item.itemName)
        return true
      else
        return false
    })
    setItems(updated)
   } 

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
        {Loading && (
          <span className="loading loading-spinner loading-xl absolute left-2/4 -translate-x-2/4 top-2/4"></span>
        )}
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/sections">
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
                {name}
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
              {Items.map((item, idx) => {
                return (
                  <ItemField
                    key={idx}
                    name={item.itemName}
                    value={item.itemValue}
                    sectionId={id}
                    itemDeleteHandler={handleItemDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
