import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import { NavLink } from 'react-router-dom';
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import OrderHistory from '../components/sidebar/OrderHistory';
import SeeUserData from './SeeUserData';
const AllOrders = () => {
  const [Data, setData] = useState();
  const [Options, setOptions] = useState(-1)
  const [Values, setValues] = useState({status : ""})
  const [userDiv, setuserdiv] = useState("hidden")
  const [userdivdata, setuserdivdata] = useState()
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fth = async () => {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-orders", { headers });
      setData(response.data.data);
    }
    fth();
  }, [Data])

  const change = (e) =>{
    const {value} = e.target;
    setValues({status:value});
  }
  const submitChanges = async (i)=>{
    const id = Data[i]._id;
    const response = await axios.put(`http://localhost:1000/api/v2//update-status/${id}`,Values,{headers});
    alert(response.data.message);
    
  }
  Data && Data.splice(Data.length-1,1);
  return (
    <>
      {!Data && <div className='h-screen flex items-center justify-center'> <Loader /> </div>}
      {Data && Data.length === 0 && (<>
        <div className='h-[80vh] p-4 text-zinc-100 '>
          <div className="h-[100%] flex flex-col items-center justify-center ">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" className='h-[20vh] mb-8' alt="" />
          </div>
        </div>
      </>)
      }
      {Data && Data.length > 0 && (<>
        <div className='md:h-[100%] p-0 md:p-4 text-zinc-100 '>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            All Order
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-4'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
              <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1 className='text-center'>price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%] '>
              <h1 className='text-center'> <FaUserLarge /></h1>
            </div>
          </div>
          {
            Data.map((item, index) => (
              <>
                <div className="bg-zinc-800 w-full rounded py-2 px-4 flex items-center justify-between gap-1 md:gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                  <div className='w-[3%]'>
                    <h1 className='text-center'>{index + 1}</h1>
                  </div>
                  <div className='w-[4%] md:w-[22%] text-[10px] lg:text-[14px] '>
                    <NavLink to={`/view-book-details/${item.book._id}`} className='text-center'>{item.book.title}</NavLink>
                  </div>
                  <div className='w-0 md:w-[45%] hidden md:block'>
                    <h1 className='text-center'>{item.book.desc.slice(0, 50)}</h1>
                  </div>
                  <div className='w-[17%] md:w-[9%]'>
                    <h1 className='text-center'>₹ {item.book.price}</h1>
                  </div>
                  <div className='w-[30%] md:w-[16%]'>
                    <h1 className='font-semibold '>
                      <button className='hover:scale-105 transition-all duration-300 '>
                        {
                          item.status === "order placed" ? (
                            <div className='text-yellow-500'>{item.status}</div>
                          ) : item.status === "canceled" ? (<div className='text-red-500'>{item.status}</div>) :
                          <div className='text-green-500'>{item.status}</div>
                        }
                      </button>
                      <div className={` flex text-[10px] lg:text-[14px] `}>
                        <select name="status" id=""
                        onChange={change} className='bg-gray-800'>
                          {([
                           "order placed","pending","shipped","delivered","canceled"
                          ]).map((e,i)=>(
                            <option key={i} value={e}>{e}</option>                            
                          ))}
                        </select>
                        <button className='text-green-500 hover:text-pink-600 mx-2'
                        onClick={()=>{
                          submitChanges(index)
                        }} >
                          <FaCheck />
                        </button>
                      </div>
                    </h1>
                  </div>
                  <div className='w-[10%] md:w-[5%] '>
                    <button className='text-xl hover:text-orange-500' onClick={()=>{
                      setuserdiv("fixed");
                      setuserdivdata(item.user);
                    }}>
                      <IoOpenOutline />
                    </button>
                  </div>
                </div>
              </>))}
        </div>
      </>)}
      { userdivdata && (
        <SeeUserData userDiv={userDiv} userdivdata={userdivdata} setuserdiv={setuserdiv} />
      )

      }
    </>
  )
}

export default AllOrders