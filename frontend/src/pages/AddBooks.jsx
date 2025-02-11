import axios from 'axios'
import React, { useState } from 'react'

const AddBooks = () => {
    const [data, setdata] = useState({
        url: "",
        title: "",
        author: "",
        desc: "",
        price: 0,
        language: "",
    })
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const change = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    }
    const submit = async () => {
        try {
            if (
                data.url === "" ||
                data.title === "" ||
                data.author === "" ||
                data.desc === "" ||
                !data.price ||
                data.language === ""
            ) {
                alert("All fields are Required");
            }
            const response = await axios.post("http://localhost:1000/api/v2/addbook",
                data, { headers });
            setdata({
                url: "",
                title: "",
                author: "",
                desc: "",
                price: 0,
                language: "",
            })
            alert(response.data.message)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl front-semibold text-zinc-500 mb-8'>Add Book</h1>
            <div className="p-4 bg-zinc-800  rounded">
                <div>
                    <label htmlFor="" className='text-zinc-400'>Image</label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='url of image'
                        name='url'
                        required
                        value={data.url}
                        onChange={change}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Title</label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='Title of image'
                        name='title'
                        required
                        value={data.title}
                        onChange={change}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Author Name</label>
                    <input type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='Author of image'
                        name='author'
                        required
                        value={data.author}
                        onChange={change}
                    />
                </div>
                <div className='mt-4 flex gap-4'>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>Language</label>
                        <input type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Language'
                            name='language'
                            required
                            value={data.language}
                            onChange={change}
                        />
                    </div>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>Language</label>
                        <input type="number"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Price'
                            name='price'
                            required
                            value={data.price}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Description</label>
                    <textarea type="text"
                        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                        placeholder='desc...........'
                        name='desc'
                        required
                        value={data.decs}
                        onChange={change}
                    />
                </div>
                <button className='mt-4 px-3 bg-blue-500 text-white font-semi-bold py-2 rounded hover:bg-blue-600' onClick={submit}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default AddBooks