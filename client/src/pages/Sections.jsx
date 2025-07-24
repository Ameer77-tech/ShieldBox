import React from "react";
import Search from "../components/sections/Search";
import SectionCard from "../components/sections/SectionCard";
import { FaPlus } from "react-icons/fa";

const Sections = () => {
  return (
    <div className="md:w-full min-h-screen flex flex-col md:ml-76 md:p-10 p-5">
      <Search />
      <div className="flex justify-between items-center mt-13">
      <p className="font-medium text-3xl">My Sections</p>
      <button className="btn btn-primary mr-2">
        <FaPlus className="mr-2" />
        Add Section
      </button>
      </div>
      <div className="mt-5 grid md:grid-cols-3 grid-cols-1 md:gap-5 gap-5">
        <SectionCard />
        <SectionCard />
        <SectionCard />
      </div>
    </div>
  );
};

export default Sections;
