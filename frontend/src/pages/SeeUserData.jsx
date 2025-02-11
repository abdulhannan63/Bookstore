import React from 'react'
import { RxCross1 } from "react-icons/rx";
const SeeUserData = ({ userDiv, userdivdata, setuserdiv }) => {
  return (
    <>
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80
      `}></div>{" "}
      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center `}>
        <div className="bg-zinc rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]">
          <div className='flex items-center justify-between '>
            <h1 className='text-2xl font-semibold'>User Information</h1>
            <button className='  ' onClick={() => setuserdiv('hidden')}>
              <RxCross1 />
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Username : {" "}
              <span className='font-semibold'>{userdivdata.username}</span>
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Email : {" "}
              <span className='font-semibold'>{userdivdata.email}</span>
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Address : {" "}
              <span className='font-semibold'>{userdivdata.address}</span>
            </label>
          </div>
        </div>
      </div>


    </>
  )
}

export default SeeUserData