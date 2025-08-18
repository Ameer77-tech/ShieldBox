
import React from "react";
import { FaFolder } from "react-icons/fa"; 
import { Link } from "react-router-dom";

export default function RecentlyViewed({ id, name }) {
  return (
    <div className="card bg-base-200 hover:bg-base-300 shadow-lg transition w-60 h-50">
      <div className="card-body items-center text-center p-6">
        {/* Folder icon */}
        <FaFolder size={40} className="text-primary mb-3" />

        {/* Section name */}
        <h2 className="card-title text-base font-semibold">{name}</h2>

        {/* View button */}
        <div className="card-actions mt-3">
          <Link to={`/sections/${name}/${id}`}>
            {" "}
            <button className="btn btn-primary btn-sm">View</button>
          </Link> 
        </div>
      </div>
    </div>
  );
}
