import React from "react";

const Activity = () => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md gap-10">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Your Activity
      </li>
      <li className="list-row">
        <div className="list-col-grow text-md uppercase font-semibold">
          Created New Section
        </div>
        <div className="text-green-600">Recent</div>
      </li>
       <li className="list-row">
        <div className="list-col-grow text-md uppercase font-semibold">
          Added New Item
        </div>
        <div className="text-gray-600">2d ago</div>
      </li>
       <li className="list-row">
        <div className="list-col-grow text-md uppercase font-semibold">
          Deleted an Item
        </div>
        <div className="text-gray-600">10d ago</div>
      </li>
    </ul>
  );
};

export default Activity;
