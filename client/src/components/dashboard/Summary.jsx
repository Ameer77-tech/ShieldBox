import React from "react";
import SummaryCard from "./SummaryCard";
import RecentlyViewed from "./RecentlyViewed";
import Activity from "./Activity";
import Tip from "./Tip";
import Footer from "./Footer";
import { motion } from "motion/react";

const Summary = () => {
  return (
    <motion.div className="md:p-5 flex flex-col gap-15">
      <div className="grid md:grid-cols-3 md:gap-6">
        <SummaryCard
          title="Sections Created"
          count="12"
          button="View"
          index={1}
        />
        <SummaryCard title="Items Added" count="25" button="View" index={2} />
        <SummaryCard title="Important" count="3" button="Add More" index={3} />
      </div>
      <div className="p-5 shadow-xl">
        <h2 className="text-[#6a6a6b] mb-10 font-semibold text-sm">
          Recently Viewed
        </h2>
        <div className="flex flex-wrap shrink-0 gap-5">
          <RecentlyViewed index={1} />
          <RecentlyViewed index={2} />
          <RecentlyViewed index={3} />
        </div>
      </div>
      <h3 className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Your Activity
      </h3>
      <div className="h-100 overflow-y-scroll">
        <ul className="list bg-base-100 rounded-box shadow-md gap-10">
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
          <Activity />
        </ul>
      </div>
      <div>
        <Tip />
      </div>
      <div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Summary;
