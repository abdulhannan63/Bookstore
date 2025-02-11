import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const BookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    const isloggesin = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token") }`,
        bookid:id,
    }
    useEffect(() => {
        const fth = async () => {
            const response = await axios.get(`http://localhost:1000/api/v2/get-books-by-id/${id}`);
            setData(response.data.data);
        }
        fth();
    }, [])

    const handleFav= async()=>{
        const response = await axios.put(`http://localhost:1000/api/v2/add-book-favourite`,{},{headers});
        console.log(response);
        alert(response.data.message)
    }
    const handleCart= async()=>{
        const response = await axios.put(`http://localhost:1000/api/v2/add-to-cart`,{},{headers});
        console.log(response);
        alert(response.data.message)
    }
    const BookDelete = async ()=>{
        const res =  await axios.delete("http://localhost:1000/api/v2/deletebook",{headers});
        navigate('/all-books')
        alert(res.data.message);
    }

    return (
        <>
            {Data && (
                <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row  gap-8'>
                    <div className="bg-zinc-800 h-[60vh] lg:h-[88vh] w-full lg:w-3/6">
                        {" "}
                        <div className='flex flex-col lg:flex-row items-center justify-center p-7 lg:p-12 rounded'>
                            <img src={Data.url} className='h-[50vh] lg:h-[70vh] rounded object-cover' alt="photo" />
                            {isloggesin === true && role === "user" &&
                                <div className='flex flex-row gap-2 lg:flex-col items-center justify-between mt-4 lg:mt-0  ms-3 '>
                                    <button className='bg-white rounded lg:rounded-full text-3xl p-2 text-red-500' onClick={handleFav} ><FaHeart /></button>
                                    <button className='bg-white rounded lg:rounded-full text-3xl p-2 lg:mt-4 text-blue-500' onClick={handleCart}><FaCartPlus /></button>
                                </div>}
                            {isloggesin === true && role === "admin" &&
                                <div className='flex flex-row gap-2 lg:flex-col items-center justify-between mt-4 lg:mt-0  ms-3 '>
                                    <Link to={`/updatebook/${id}`} className='bg-white rounded lg:rounded-full text-3xl p-2 text-blue-500'  ><FaEdit /></Link>
                                    <button className='bg-white rounded lg:rounded-full text-3xl p-2 lg:mt-4 text-red-500' onClick={BookDelete} ><MdDelete /></button>
                                </div>}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6 ">
                        <h1 className='text-3xl text-zinc-300 font-semibold'>{Data.title}</h1>
                        <p className="text-zinc-300 mt-1">By {Data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
                        <p className="text-zinc-500 flex items-center justify-start mt-4 text-xl"> <GrLanguage className='me-3' /> {Data.language}</p>
                        <p className="flrx mt-4 items-center justify-start text-zinc-400">Price : ₹{Data.price}</p>

                    </div>
                </div>
            )}
            {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>}
        </>
    )
}

export default BookDetails