import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/bookCard/BookCard'
import axios from 'axios';

const Allbooks = () => {
  const [Data, setData] = useState();
    useEffect(() => {
      const fth = async ()=>{
        const response =await axios.get('http://localhost:1000/api/v2/getbooks');
        setData(response.data.data);
      }
      fth();
    }, [])
    
  return (
    <>
    {Data &&
      (<div className='bg-zinc-900 h-[100%] md:h-auto px-12 py-8' >
      <h4 className='text-3xl text-yellow-100 text-center'> All Books </h4>
        {!Data && <div className=' flex items-center justify-center my-8 '> <Loader /> </div> }
        <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
           {Data && Data.map((e,i) =>( 
            <div key={i}>
            <BookCard data={e} />
            </div>) )}
        </div>
      </div>)}
            {!Data && <div className='h-screen flex items-center justify-center bg-zinc-900 px-12 py-8 '><Loader /> </div>

            }
    </>
  )
}

export default Allbooks