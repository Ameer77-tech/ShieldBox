import React from "react";
import SummaryCard from "./SummaryCard";
import RecentlyViewed from "./RecentlyViewed";
import Activity from "./Activity";
import Tip from "./Tip";
import Footer from "./Footer";


const Summary = () => {
  return (
    <div className="md:p-5 flex flex-col gap-15">
      <div className="grid md:grid-cols-3 md:gap-6">
        <SummaryCard
          title="Sections Created"
          count="12"
          button="Add New Section"
        />
        <SummaryCard title="Items Added" count="25" button="Add New Item" />
        <SummaryCard title="Important" count="3" button="Add More" />
      </div>
      <div>
        <RecentlyViewed />
      </div>
      <div>
        <Activity/>
      </div>
      <div>
        <Tip/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Summary;
