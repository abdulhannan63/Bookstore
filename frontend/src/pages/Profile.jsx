import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader/Loader'
import Sidebar from '../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import MobileNav from '../components/sidebar/MobileNav'

const Profie = () => {
  const [profile, setprofile] = useState()
  // const isloggedin = useSelector();
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token") }`,
  }
  useEffect(()=>{
    const fth = async () =>{
      const response = await axios.get('http://localhost:1000/api/v1/get-user-info',{headers});
      setprofile(response.data);
      
    }
    fth();
  },[])

  return (
    <div className={`bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 g-4 text-white`}>
      {!profile && <div className='w-full h-[100%] flex items-center justify-center '><Loader /></div> }
      {profile && 
      <>
        <div className={`w-full  ${(profile.favourate.length>0)?"h-auto":"h-screen"} lg:h-screen mb-4 lg:me-4 md:w-1/6`}>
          <Sidebar data={profile}/>
          <MobileNav />
        </div>
        <div className="w-full md:w-5/6">
          <Outlet />
        </div>
      </>

      }
    </div>
  )
}

export default Profie