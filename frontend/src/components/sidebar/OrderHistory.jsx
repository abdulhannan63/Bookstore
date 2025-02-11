import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import BookCard from '../bookCard/BookCard'
import { NavLink } from 'react-router-dom'

const OrderHistory = () => {
  const [hist, sethist] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fth = async () => {
      const response = await axios.get('http://localhost:1000/api/v2/get-order-history', { headers });
      // console.log(response.data.data);

      sethist(response.data.data);
    }
    fth()
  }, [])
  return (

    <>
{ !hist && <div className=' flex items-center justify-center  '> <Loader /> </div> }
      {!hist && <div className='text-2xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center h-screen'>No Order History</div>}
      {hist && hist.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100 '>
          <div className="h-[100%] flex flex-col items-center justify-center ">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" className='h-[20vh] mb-8' alt="" />
          </div>
        </div>
      )}
      {hist && hist.length > 0 && (

        <div className='h-[100%] p-0 md:p-4 text-zinc-100 '>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-4'>
            <div className='w-[3%]'>
              <h1 className='text-center'>S.No</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block '>
              <h1 className='text-center'>Mode</h1>
            </div>
          </div>
          {
            hist.map((item, index) => (
              <div key={index} className='w-full bg-zinc-800rounded py-2 px-4 gap-4 flex hover:bg-zinc-900 hover:cursor-pointer'>
                <div className='w-[3%]'>
                  <h1 className='text-center'>{index + 1}</h1>
                </div>
                <div className='w-[22%]'>
                  <h1 className='text-center'>
                    <NavLink to={`/get-books-by-id/${item.book._id}`}>{item.book.title}</NavLink>
                  </h1>
                </div>
                <div className='w-[45%]'>
                  <h1 className='text-center'>{item.book.desc.slice(0, 50)}...</h1>
                </div>
                <div className='w-[9%]'>
                  <h1 className='text-center'>₹{item.book.price}</h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className='text-center font font-semibold text-gray-500'>{
                    item.status === "order placed" ? (
                      <div className='text-yellow-500'>{item.status}</div>
                    ) : item.status === "cancelled" ? (<div className='text-red-500'>{item.status}</div>) :
                      (item.status)
                  }</h1>
                </div>
                <div className='w-none md:w-[5%] hidden md:block '>
                  <h1 className='text-center'>COD</h1>
                </div>
              </div>
            ))
          }
        </div>
      )

      }
    </>
  )
}

export default OrderHistory