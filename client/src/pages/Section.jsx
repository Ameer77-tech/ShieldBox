import { FaArrowLeft, FaPlus, FaFolderOpen } from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { checkAuth } from "../utils/AuthApi";
import { secretKeyContext } from "../contexts/KeyContext";
import { AnimatePresence, motion } from "motion/react";
import ItemField from "../components/sections/ItemField";
import { getItems, updateLastViewed } from "../utils/AppApi";
import AddItemForm from "../components/sections/AddItemForm";


export default function InsideSection() {
  const [Items, setItems] = useState([]);
  const [Loading, setloading] = useState(false);
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const id = params.sectionid;
  const name = params.sectionname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setisEditing] = useState("");
  const [status, setstatus] = useState("")

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
        updateLastViewed(id)
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
  };

  const getFields = async () => {
    setloading(true);
    const response = await getItems(id);
    let { items } = response;
    if(items?.length < 1){
      setstatus("Empty")
      setloading(false)
      return
    }
    if (response.success) {
      setItems(items);
      setloading(false);
    } else {
      console.log("Server Error");
      setloading(false);
    }
  };

  const handleItemDelete = (name) => {
    const existing = [...Items];
    const updated = existing.filter((item) => {
      if (name != item.itemName) return true;
      else return false;
    });
    setItems(updated);
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
        {Loading && (
          <span className="loading loading-spinner loading-xl absolute left-2/4 -translate-x-2/4 top-2/4"></span>
        )}
        <AnimatePresence>
          {showForm && (
            <AddItemForm
              setShowForm={setShowForm}
              getFields={getFields}
              sectionId={id}
            />
          )}
        </AnimatePresence>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/sections">
            <button className="btn btn-xs btn-neutral ml-10 md:ml-0">
              <FaArrowLeft className="mr-2" />
              back
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
                <FaFolderOpen size={20} />
              </motion.div>
            </div>
          </div>

          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm text-[0.7rem]">
            <FaPlus className="mr-2" />
            Add Item
          </button>
        </div>

        {/* Items Table */}
        {Items.length < 1 && (
          <p className="text-gray-700 text-lg top-2/4 absolute left-2/4">
            {status}
          </p>
        )}
        <div className="overflow-x-auto relative">
          <table className="table w-full overflow-hidden">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <motion.tbody>
              <AnimatePresence>
                {Items.map((item, idx) => {
                  return (
                    <ItemField
                      key={idx}
                      name={item.itemName}
                      value={item.itemValue}
                      sectionId={id}
                      index={idx}
                      itemDeleteHandler={handleItemDelete}
                      isEditing={isEditing === idx}
                      setisEditing={setisEditing}
                      getFields={getFields}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
