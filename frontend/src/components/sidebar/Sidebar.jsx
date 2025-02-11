import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = ({ data }) => {
  const dispatch = useDispatch()
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
      <div className='flex flex-col items-center justify-center '>
        {" "}
        <img src={data.avatar} className='h-[12vh]' alt="" />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>
          {data.username}
        </p>
        <p className='mt-1 text-normal text-zinc-400 text-sm'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'>
        </div>
      </div>
      {role === "admin" && (<div className='w-full flex-col items-center justify-center hidden md:flex'>
        <NavLink to='/profile'
          className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>All Orders</NavLink>
        <NavLink to='/profile/add-book'
          className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Add Book</NavLink>
      </div>)
      }
      {role === "user" && (
        <div className='w-full flex-col items-center justify-center hidden md:flex'>
          <NavLink to='/profile'
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Favourites</NavLink>
          <NavLink to='/profile/orderHistory'
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Order History</NavLink>
          <NavLink to='/profile/settings'
            className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Settings</NavLink>
        </div>
      )

      }
      <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center' onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/");
      }
      }>Logout <FaArrowRightFromBracket className='ms-4' /> </button>
    </div>
  )
}

export default Sidebar