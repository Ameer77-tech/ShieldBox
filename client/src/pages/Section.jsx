import { FaArrowLeft, FaPlus, FaFolderOpen } from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { checkAuth } from "../utils/AuthApi";
import { secretKeyContext } from "../contexts/KeyContext";
import { AnimatePresence, motion } from "motion/react";
import ItemCard from "../components/sections/ItemField" // updated ItemField → ItemCard
import AddItemForm from "../components/sections/AddItemForm";
import { getItems, updateLastViewed } from "../utils/AppApi";
import { decrypt } from "../utils/EncryptDecrypt";

export default function InsideSection() {
  const [Items, setItems] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const [showForm, setShowForm] = useState(false);
  const params = useParams();
  const id = params.sectionid;
  const name = params.sectionname;
  const navigate = useNavigate();
  const [isEditing, setisEditing] = useState("");
  const [status, setstatus] = useState("");

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
      if (!savedKey) {
        navigate("/enterkey");
      } else {
        getFields();
        updateLastViewed(id);
        setSecretKey(savedKey);
      }
    }
    setLoading(false);
  };

  const getFields = async () => {
    const key = sessionStorage.getItem("secretkey");
    if (!key) {
      navigate("/enterkey");
      return;
    }
    setLoading(true);
    try {
      const response = await getItems(id);
      if (!response.success) {
        console.log("Server Error");
        setLoading(false);
        return;
      }

      const decryptedItems = await Promise.all(
        response.items.map(async (item) => ({
          ...item,
          itemName: await decrypt(item.itemName, key),
          itemValue: await decrypt(item.itemValue, key),
        }))
      );

      setItems(decryptedItems);
      if (decryptedItems.length === 0) setstatus("No items added yet.");
    } catch (err) {
      console.error("Decryption error:", err);
      setstatus("Failed to decrypt data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex md:justify-between md:items-start min-h-screen">
      <NavBar />

      <div className="p-6 w-full md:ml-76">
        {Loading && (
          <div className="min-h-screen grid place-items-center bg-black/20 fixed inset-0 z-50">
            <span className="loading loading-spinner loading-xl fixed left-2/4 -translate-x-2/4 top-2/4"></span>
          </div>
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
            </button>
          </Link>

          <div className="flex md:w-full justify-center items-center md:gap-5 gap-3">
            <h1 className="md:text-2xl text-sm font-bold overflow-hidden">
              <motion.p
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.7 }}
              >
                {name}
              </motion.p>
            </h1>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3, delay: 0.7 }}
            >
              <FaFolderOpen size={20} />
            </motion.div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary btn-sm text-[0.7rem]"
          >
            <FaPlus className="mr-2" />
            Add Item
          </button>
        </div>

        {/* Items Grid */}
        {Items.length === 0 ? (
          <p className="text-gray-700 text-lg text-center mt-10">{status}</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {Items.map((item, idx) => (
                <ItemCard
                  key={item.itemId}
                  itemId={item.itemId}
                  name={item.itemName}
                  value={item.itemValue}
                  sectionId={id}
                  index={idx}
                  isEditing={isEditing === idx}
                  setisEditing={setisEditing}
                  getFields={getFields}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
