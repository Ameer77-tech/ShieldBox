import { FaFolderOpen } from "react-icons/fa";
import { motion, spring } from "motion/react";
import { Link } from "react-router-dom";
import {
  deleteSection,
  getAllSections,
  renameSection,
} from "../../utils/AppApi";
import { useState } from "react";

export default function SectionCard({
  name,
  itemsPresent,
  id,
  deleteHandler,
  isEditing,
  setisEditing,
  getSections,
}) {
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteSection(id);
    if (response) {
      deleteHandler(id);
      setLoading(false);
    } else {
      console.log("Error");
      setLoading(false);
    }
  };

  const handleRename = async (str) => {
    if (str === "edit") {
      setisEditing(id);
    } else {
      if (newName === name) setisEditing("");
      else {
        setLoading(true);
        await renameSection(id, newName);
        await getSections();
        setisEditing("");
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scale: 0.98,
        y: -20,
      }}
      whileTap={{
        scale: 1.03,
        rotate: -2,
      }}
      whileHover={{
        scale: 1.03,
        rotate: -2,
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
      exit={{ y: -20, opacity: 0 }}
    >
      <div className="card w-90 bg-neutral shadow-lg hover:shadow-xl transition ring-1 ring-primary/30">
        <div className="card-body items-center text-center">
          <FaFolderOpen className="text-white text-6xl mb-4" />
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : isEditing ? (
            <input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              className="p-2 text-center outline-none border-b-2 border-b-accent text-accent"
            />
          ) : (
            <h2 className="text-2xl font-bold text-white">{name}</h2>
          )}
          <p className="text-sm text-gray-500 mb-4">{itemsPresent} items</p>
          <div className="card-actions justify-center">
            <Link to={`/sections/${name}/${id}`}>
              <button 
              disabled={loading}
              className="btn btn-primary btn-md">View</button>
            </Link>
            {isEditing ? (
              <button
                disabled={loading}
                onClick={() => handleRename("ok")}
                className="btn btn-neutral btn-md text-blue-600"
              >
                Ok
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={() => handleRename("edit")}
                className="btn btn-neutral btn-md"
              >
                Rename
              </button>
            )}
            {isEditing ? (
              <button
                onClick={() => setisEditing("")}
                className="btn btn-error btn-md"
              >
                Cancel
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={() => handleDelete(id)}
                className="btn btn-error btn-md"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Delete"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
