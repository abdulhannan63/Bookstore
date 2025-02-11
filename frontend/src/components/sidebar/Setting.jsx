import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
const Setting = () => {
  const [Prof, setProf] = useState();
  const [val, setval] = useState({ address: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fth = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-user-info', { headers });
      console.log(response);
      setProf(response.data);
      setval({ address: response.data.address });
    }
    fth();
  }, [])
  const change=(e)=>{
    const {name,value} = e.target;
    setval({...val,[name]:value});
  }
  const changeAddress = async () =>{
    const response = await axios.put('http://localhost:1000/api/v1/update-address',
    val, { headers });
    alert(response.data.message)
    console.log(response);
    
  }
  return (
    <>
      {!Prof && <div className='w-full h-[100%] flex items-center justify-center '><Loader /></div>}{' '}
      {Prof && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100 '>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">UserName</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {Prof.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className=''>
                {Prof.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="address">Address</label>
            <textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows='5'
              placeholder='Address'
              name='address' value={val.address} 
              onChange={change}
              >

            </textarea>
          </div>
          <div className='mt-4 flex justify-end '>
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 -2 hover:bg-yellow-400' onClick={changeAddress}>
              Update
            </button>
          </div>

        </div>
      )

      }
    </>
  )
}

export default Setting