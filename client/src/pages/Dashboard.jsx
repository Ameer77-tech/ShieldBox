import React from 'react'
import NavBar from '../components/dashboard/NavBar'
import MainHeading from '../components/dashboard/MainHeading'
import Summary from '../components/dashboard/Summary'




const Dashboard = () => {
  return (
    <div className='md:flex md:justify-between md:items-center'>
    <NavBar/>
    <div className='w-full min-h-screen flex flex-col md:ml-76'> 
    <MainHeading/>
    <Summary/>
    </div>
    </div>
  )
}

export default Dashboard