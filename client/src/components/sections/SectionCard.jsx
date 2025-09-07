import { FaFolderOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteSection, renameSection } from "../../utils/AppApi";

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
    } else {
      console.log("Error deleting section");
    }
    setLoading(false);
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
        setNewName(newName);
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }} // animate when ~30% visible
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { type: "spring", stiffness: 200 },
      }}
      whileTap={{ scale: 0.98 }}
      className="m-4"
    >
      <div className="card w-72 bg-base-200 shadow-lg hover:shadow-2xl rounded-2xl ring-1 ring-primary/30">
        <div className="card-body items-center text-center space-y-3">
          {/* Folder Icon */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaFolderOpen className="text-primary text-6xl" />
          </motion.div>

          {/* Section Name */}
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : isEditing ? (
            <input
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              className="input input-bordered input-sm w-full text-center"
            />
          ) : (
            <h2 className="text-xl font-bold text-base-content">{name}</h2>
          )}

          {/* Items count */}
          <p className="text-sm text-gray-400">{itemsPresent} items</p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to={`/sections/${name}/${id}`}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="btn btn-primary btn-sm"
              >
                View
              </motion.button>
            </Link>

            {isEditing ? (
              <>
                <button
                  disabled={loading}
                  onClick={() => handleRename("ok")}
                  className="btn btn-success btn-sm"
                >
                  Ok
                </button>
                <button
                  disabled={loading}
                  onClick={() => setisEditing("")}
                  className="btn btn-error btn-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  disabled={loading}
                  onClick={() => handleRename("edit")}
                  className="btn btn-secondary btn-sm"
                >
                  Rename
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleDelete(id)}
                  className="btn btn-error btn-sm"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
