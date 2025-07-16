import React from 'react'
import { motion, spring } from 'motion/react'

const card = ({ title, content, index, img }) => {
  
  return (
   
      <motion.div 
      initial={{
        y:-20,
        opacity:0
      }}
      whileInView={{
        y:0,
        opacity:1
      }}
      transition={{
        type:spring,
        duration:0.5,
        stiffness: 90,
        delay: index * 0.1
      }}
      className="card bg-base-100 md:w-96 md:h-96 w-80 shadow-sm overflow-none">
        <div className="card-body">
          <h2 className="card-title text-[#01d1b1]">{title}</h2>
          <p>{content}</p>
        </div>
        <motion.figure
       
        >
          <motion.img
           whileHover={{
          scale:1.05
        }}
            src={img}
            alt="img"
          />
        </motion.figure>
      </motion.div>

  )
}

export default card