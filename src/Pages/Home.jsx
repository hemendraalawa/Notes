import React from 'react'
import Navbar from '../Components/Navbar'
import CreateNote from '../Components/CreateNote'
import YourNotes from '../Components/YourNotes'

const Home = () => {
  return (
    <>
    <div className="Home w-screen">
      <Navbar/>
      <div className='flex flex-col md:flex-row '>
      <CreateNote/>
      <YourNotes/>
      </div>
    </div>
    
    </>
  )
}

export default Home