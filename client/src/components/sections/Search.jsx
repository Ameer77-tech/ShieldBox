import React, { useState, useEffect } from "react";

const Search = ({ allSections, setAllSections, copySections }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const update = (e) => {
    handleChange(e);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setAllSections([...copySections]);
    } else {
      const filteredSections = copySections.filter((section) =>
        section.name.toLowerCase().includes(value.toLowerCase())
      );
      setAllSections(filteredSections);
    }
  };

  return (
    <label className="input md:w-2/4 w-3/4 ml-5 flex items-center border rounded-lg px-2">
      <svg
        className="h-5 w-5 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        onChange={update}
        value={searchTerm}
        className="pl-2 outline-none w-full bg-transparent"
        type="search"
        placeholder="Browse Sections"
      />
    </label>
  );
};

export default Search;
