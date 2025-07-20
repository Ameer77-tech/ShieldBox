import React from 'react'

const Verify = () => {
  return (
    <div className="flex justify-center items-center min-h-screen select-none">
      <form className="card bg-base-300 rounded-lg justify-evenly md:px-10 md:py-10 md:w-2/6 w-[90%] px-5 py-7 gap-10 items-center">
        <h1 className="text-2xl font-bold text-center text-blue-800">Enter the Verification Code Sent To Your Email</h1>
           <input
            required
            type="text"
            placeholder="code"
            className="input input-md w-full text-center text-lg"
          />
           <button className="btn btn-soft btn-info">Submit</button>
           <p>
            Did not receive the code,{" "}
            <button 
            className="text-[#1d4e7e] cursor-pointer hover:underline">
              Resend code
            </button>
          </p>
      </form>
      </div>
  )
}

export default Verify