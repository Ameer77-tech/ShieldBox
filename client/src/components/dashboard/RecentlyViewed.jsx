// FolderCard.jsx
import React from "react";
import { FaFolder } from "react-icons/fa"; // npm install react-icons

export default function RecentlyViewed({ sectionName = "My Section", onView = () => {} }) {
  return (
    <div className="card bg-base-200 hover:bg-base-300 shadow-lg transition w-60">
      <div className="card-body items-center text-center p-6">
        {/* Folder icon */}
        <FaFolder size={40} className="text-primary mb-3" />

        {/* Section name */}
        <h2 className="card-title text-base font-semibold">{sectionName}</h2>

        {/* View button */}
        <div className="card-actions mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={onView}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
