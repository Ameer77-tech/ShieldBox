import { FaFolderOpen } from "react-icons/fa";
import { motion, spring } from "motion/react";
import { Link } from 'react-router-dom'

export default function SectionCard() {
  return (
    <motion.div
    initial = {{
      opacity : 0,
      scale : 0.98,
      y : -20
    }}
    whileHover={{
      scale : 1.03,
      rotate: -2
    }}
    whileInView={{
      scale : 1,
      opacity : 1,
      y : 0
    }}
    transition={{
      whileInView : {
        ease : 'easeInOut',
        duration : 0.7
      }
    }}
    >
    <div
      className="card w-90 bg-neutral shadow-lg hover:shadow-xl transition ring-1 ring-primary/30"
    >
      <div className="card-body items-center text-center">
        <FaFolderOpen className="text-primary text-6xl mb-4" />
        <h2 className="text-2xl font-bold">Personal</h2>
        <p className="text-sm text-gray-500 mb-4">12 items</p>
        <div className="card-actions justify-center">
          <Link to="/section/3433"><button className="btn btn-primary btn-md">View</button></Link>
          <button className="btn btn-neutral btn-md">Rename</button>
          <button className="btn btn-error btn-md">Delete</button>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
