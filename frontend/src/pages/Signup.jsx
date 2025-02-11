import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [values, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  })
  const navigate = useNavigate()
  const Change = (e) => {
    const { name, value } = e.target;
    setvalue({ ...values, [name]: value });
  }
  const submit = async () =>{
    try {
      if(values.username==="" ||values.email==="" || values.password==="" || values.address==="" ){
        alert("Please fill all the fields");
      }else{
        navigate('/login')
        const response = await axios.post('http://localhost:1000/api/v1/signup', values);
        // console.log(response);
      }
      
    } catch (err ) {
      err.response.data.message
      console.log(err);
    }
  }
  return (
    <>
      <div className='h-screen flex items-center justify-center bg-zinc-900 px-12 py-8'>
        <div className="w-full max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-zinc-800 dark:border-zinc-800">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platdiv</h5>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
              <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white" value={values.username} onChange={Change} placeholder="name" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Your email</label>
              <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white" value={values.email} onChange={Change} placeholder="name@company.com" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-500 dark:placeholder-gray-400  dark:text-white" value={values.password} onChange={Change} required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
              <textarea type="text" name="address"  placeholder="address....." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white" value={values.address} onChange={Change} required />
            </div>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submit}>Resigter</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an Account? <NavLink to='/login' className="text-blue-700 hover:underline dark:text-blue-600">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Signup