import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../bookCard/BookCard';
import Loader from '../Loader/Loader';

const Favourates = () => {
  const [favs, setfavs] = useState()
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token") }`,
  }
  // getting the data of user's favourate books
  useEffect(()=>{
    const fth = async () =>{
      const response = await axios.get('http://localhost:1000/api/v2/get-favourate-book',{headers});
      setfavs(response.data.data)
    }
    fth();
  },[favs])

  return (
    <>
    {favs && favs.length === 0 && <div className='text-2xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center h-scren'>No Favourite Books</div> }
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        { !favs && <div className=' flex items-center justify-center  '> <Loader /> </div> }
        {favs && favs.map((e,i)=><div cla key={i}>
          <BookCard data={e} favourate={true}/>
        </div>)

        }
    </div>
    </>
  )
}

export default Favourates