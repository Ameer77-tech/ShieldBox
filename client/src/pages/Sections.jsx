import React, { useContext } from "react";
import Search from "../components/sections/Search";
import SectionCard from "../components/sections/SectionCard";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import NavBar from "../components/dashboard/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuth } from "../utils/AuthApi";
import { secretKeyContext } from "../contexts/KeyContext";
import { getAllSections } from "../utils/AppApi";
import { userContext } from "../contexts/UserContext";
import getData from "../utils/getDataFromStorage";
import AddSectionForm from "../components/sections/AddSectionForm";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

const Sections = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const [showForm, setshowForm] = useState(false);
  const { secretKey, setSecretKey } = useContext(secretKeyContext);
  const [loading, setLoading] = useState(true);
  const [sectionsLoading, setSectionsLoading] = useState(false);
  const [allSections, setAllSections] = useState([]);
  const [copySections, setcopySections] = useState([]);
  const [isEditing, setisEditing] = useState("");
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
        getSections();
        const existing = getData();
        setUserData(existing);
        setSecretKey(savedKey);
        setLoading(false);
      }
    }
  };

  const getSections = async () => {
    setSectionsLoading(true);
    const response = await getAllSections();
    if (response.success) {
      const { sections } = response;
      const existingSections = sections.map((section) => {
        return {
          name: section.name,
          items: section.items?.length,
          id: section._id,
        };
      });
      setSectionsLoading(false);
      setAllSections(existingSections);
      setcopySections(existingSections);
    } else console.log("Error fetching sections");
  };

  const deleteSection = (id) => {
    const existing = [...allSections];
    const updatedSections = existing.filter((section) => {
      if (id !== section.id) return true;
      else return false;
    });
    setAllSections(updatedSections);
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

      <div className="md:w-full min-h-screen flex flex-col md:ml-76 md:p-10 p-5">
        {sectionsLoading && (
          <span className="loading loading-spinner loading-xl absolute top-2/4 left-2/4 -translate-x-2/4"></span>
        )}
        <AnimatePresence>
          {" "}
          {showForm && (
            <AddSectionForm
              setShowForm={setshowForm}
              showForm={showForm}
              getSections={getSections}
            />
          )}
        </AnimatePresence>

        <div className="flex items-center ml-10 md:ml-0">
          <Link to="/dashboard">
            <FaChevronLeft size={25} className="hover:opacity-80" />
          </Link>
          <Search
            allSections={allSections}
            setAllSections={setAllSections}
            copySections={copySections}
          />
        </div>
        <div className="flex justify-between items-center mt-13">
          <p className="font-medium text-3xl">My Sections</p>
          <button
            onClick={() => setshowForm(true)}
            className="btn btn-primary mr-2"
          >
            <FaPlus className="mr-2" />
            Add Section
          </button>
        </div>
        <div className="mt-5 flex flex-wrap md:gap-5 gap-5">
          <AnimatePresence>
            {allSections.length < 1 ? (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="text-gray-600/50 mt-5"
              >
                No data
              </motion.h3>
            ) : (
              allSections.map((section) => {
                return (
                  <SectionCard
                    key={section.id}
                    name={section.name}
                    itemsPresent={section.items}
                    id={section.id}
                    deleteHandler={deleteSection}
                    isEditing={isEditing == section.id}
                    setisEditing={setisEditing}
                    getSections={getSections}
                  />
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Sections;
