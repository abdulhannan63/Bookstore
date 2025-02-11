import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Navbar = () => {
    const [mob, setmob] = useState('hidden')
    const links = [
        { name: 'Home', url: '/' },
        { name: 'All-Books', url: '/all-books' },
        { name: 'Cart', url: '/cart' },
        { name: 'Profile', url: '/profile' },
        { name: 'Admin Profile', url: '/profile' },
    ];
    const isloggedin = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    
    if (isloggedin === false) {
        links.splice(2, 2);
    }
    if (isloggedin === true && role === 'admin') {
        links.splice(3, 1);
    }
    if (isloggedin === true && role === 'user') {
        links.splice(4, 1);
    }
    return (
        <>
            <nav className='relative z-50 bg-zinc-800 text-white px-8 py-4 flex justify-between items-center '>
                <div className='flex items-center'>
                    <img className='h-6 md:h-10 me-4' src="/icons8-book-48.png" alt="logo" />
                    <h1 className='text-l md:text-2xl font-semibold '>BookStore</h1>
                </div>
                <div className='nav-links bhouse block md:flex gap-4 items-center '>
                    <div className='hidden md:flex  gap-4'>
                        {links.map((e, i) => (<div key={i} className='flex items-center'>
                            {(e.name === 'Profile' || e.name === 'Admin Profile'  )?
                                <NavLink to={e.url} key={i} className=' cursor-pointer px-1 py-1 mb-1  font-semibold  bg-blue-500 rounded '>{e.name}{" "}</NavLink> :
                                <NavLink to={e.url} key={i} className=' cursor-pointer hover:text-blue-500 transition-all duration-300'>{e.name}{" "}</NavLink>
                            }
                        </div>
                        ))}
                    </div>
                    <div className='hidden md:flex  gap-4'>
                        {isloggedin === false && (
                            <>
                                <NavLink to={'/login'} className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-400 '>LogIn</NavLink>
                                <NavLink to={"/signup"} className='px-2 py-1  bg-blue-500 rounded'>SingUp</NavLink>
                            </>)
                        }
                    </div>
                    <button onClick={() => mob === "hidden" ? setmob("") : setmob('hidden')} className='block md:hidden text-white text-2xl hover:text-zinc-500'>
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            {/* mobile  view*/}
            <div className={`${mob} bg-zinc-800 h-screen  absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((e, i) => (
                    <NavLink to={e.url} key={i} className='mb-4 cursor-pointer text-white text-3xl font-semibold hover:text-blue-500 transition-all duration-300'>
                        {e.name}{" "}
                    </NavLink>
                ))}
                {isloggedin === false && (
                    <>
                        <NavLink to={'/login'} className='px-2 py-1 mb-4 text-xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 '>LogIn</NavLink>
                        <NavLink to={"/signup"} className='px-2 py-1 mb-4 text-xl font-semibold  bg-blue-500 rounded'>SingUp</NavLink>
                    </>)
                }
            </div>
        </>
    )
}

export default Navbar
