import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";


const Login = () => {
  // hooks
  const [values, setvalue] = useState({
    username: "",
    password: "",
  })
  const dispatch= useDispatch()
  const navigate = useNavigate();
  // functions
  const Change = (e) => {
    const { name, value } = e.target;
    setvalue({ ...values, [name]: value });
  }
  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post('http://localhost:1000/api/v1/login', values);
        navigate("/profile");
        
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        alert("logged In Successfully!")
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  return (
    <div className='h-screen flex items-center justify-center bg-zinc-900 px-12 py-8'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-zinc-800 dark:border-zinc-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" value={values.username} onChange={Change} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={values.password} onChange={Change} required />
          </div>
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submit}>Login to your account</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <NavLink to='/signup' className="text-blue-700 hover:underline dark:text-blue-600">Create account</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login