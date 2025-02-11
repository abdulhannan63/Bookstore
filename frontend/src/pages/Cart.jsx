import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setcart] = useState()
  const [total, settotal] = useState(0)
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  // getting the data of user's cart books
  useEffect(() => {
    const fth = async () => {
      const response = await axios.get(`http://localhost:1000/api/v2/get-cart-book`, { headers });
      setcart(response.data.data)

    }
    fth();
  }, [cart])
  // function ti delete from cart
  const handledelete = async (e) => {
    const response = await axios.put(`http://localhost:1000/api/v2/delete-from-cart/${e}`, {}, { headers });
    alert(response.data.message)

  }
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((e) => {
        total += e.price;
      })
      settotal(total);
      total = 0;
    }
  }, [cart]);
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v2/place-order", { order: cart },
        { headers }
      )
      alert(response.data.message)
      navigate("/profile/orderHistory")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='bg-zinc-900 px-12 h-auto md:h-screen py-8'>
      {!cart &&<div className='h-[100%] w-full flex items-center justify-center'><Loader /></div> }
      {
        cart && cart.length === 0 && (
          <div className="h-screen bg-zinc-900">
            <div className='h-[100%] flex items-center justify-center flex-col'>
              <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
                Empty Cart
              </h1>
            </div>
          </div>
        )}
      {
        cart && cart.length > 0 && (
          <>
            <h1 className="text-5xl  font-semibold text-zinc-500 mb-8">
              Your Cart
            </h1>
            {
              cart.map((e, i) => (
                <>
                  <div key={i} className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'>
                    <img src={e.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover ' />
                    <div className="w-full md:w-auto">
                      <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                        {e.title}
                      </h1>
                      <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                        {e.desc.slice(0, 100)}...
                      </p>
                      <p className='text-normal text-zinc-300 mt-2 md:block lg:hidden'>
                        {e.desc.slice(0, 65)}...
                      </p>
                      <p className='text-normal text-zinc-300 mt-2 block lg:hidden'>
                        {e.desc.slice(0, 100)}...
                      </p>
                    </div>
                    <div className='flex
                      mt-4 w-full md:w-auto items-center justify-between '>
                      <h2 className='text-zinc-100 text-3xl font-semibold flex '>
                        ₹ {e.price}
                      </h2>
                      <button className='bg-red-100 text-red-800 border border-red-700 rounded p-2 ms-12 '
                        onClick={() => handledelete(e._id)}><AiFillDelete /></button>
                    </div>
                  </div>
                </>
              ))
            }
          </>
        )}
      {
        cart && cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h2 className='text-3xl text-zinc-200 font-semibold'>
                Total Amount
              </h2>
              <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                <h2>{cart.length} Books </h2><h2>{total}</h2>
              </div>
              <div className='w-[100%] mt-3'>
                <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200'
                  onClick={PlaceOrder}>
                  Place Your Order
                </button>
              </div>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default Cart