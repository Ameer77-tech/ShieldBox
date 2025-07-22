import React from 'react'

const SummaryCard = (props) => {
  return (
     <div className="card md:w-96 bg-base-100 md:card-xl shadow-sm ">
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p className="text-4xl">
            {props.count}
          </p>
          <div className="justify-end card-actions">
            <button className="btn btn-soft btn-primary text-accent hover:text-white">{props.button}</button>
          </div>
        </div>
      </div>
  )
}

export default SummaryCard