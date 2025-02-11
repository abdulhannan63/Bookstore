import axios from 'axios';
import React from 'react'
import { NavLink } from 'react-router-dom';
const BookCard = ({ data, favourate }) => {
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token") }`,
    bookid:data._id,
  }
  const handleRemove = async () =>{
    const response = await axios.put('http://localhost:1000/api/v2/delete-from-favourite',{},{headers});
    console.log(response);
    alert(response.data.message)
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <NavLink to={`/view-book-details/${data._id}`}>
        <div className="max-w-sm rounded-lg shadow dark:bg-zinc-800">
          <div className='rounded-t-lg bg-zinc-900  flex items-center justify-center'>
            <img className=" w-[60%] h-48 " src={data.url} alt="" />
          </div>
          <div className="p-5 ">
            <h5 className="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
            <p className='text-zinc-500'>{`by ${data.author}`}</p>
            <p className='text-white mb-2 font-xl'>{`₹ ${data.price}`}</p>

          </div>
        </div>
      </NavLink>
      { favourate &&(
        <button className='bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt=4'
        onClick={handleRemove}>Remove from Favourite
        </button>)
      }
    </div>
  )

}

export default BookCard