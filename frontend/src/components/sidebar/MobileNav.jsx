import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (<>
        {role === "user" && (<div className='w-full flex items-center justify-between my-8 md:hidden'>
            <NavLink to='/profile'
                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Favourites</NavLink>
            <NavLink to='/profile/orderHistory'
                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Order History</NavLink>
            <NavLink to='/profile/settings'
                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Settings</NavLink>
        </div>)}
        {role === "admin" && (<div className='w-full flex items-center justify-between my-8 md:hidden'>
            <NavLink to='/profile'
                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>All Orders</NavLink>
            <NavLink to='/profile/add-book'
                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all '>Add Book</NavLink>
        </div>)}
    </>
    )
}

export default MobileNav