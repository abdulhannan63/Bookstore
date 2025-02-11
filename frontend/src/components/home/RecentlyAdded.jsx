import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../bookCard/BookCard'
import Loader from '../Loader/Loader';
const RecentlyAdded = () => {
    const [Data, setData] = useState([]);
    useEffect(() => {
      const fth = async ()=>{
        const response =await axios.get('http://localhost:1000/api/v2/get-recent-books');
        setData(response.data.data);
      }
      fth();
    }, [])
    
    return (           

    <div className='mt-8 px-4'>
        <h4 className='text-3xl text-yellow-100 '>Recently Added</h4>
        {!Data && <div className=' flex items-center justify-center my-8 '> <Loader /> </div> }
        <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        
           {Data && Data.map((e,i) =>( 
            <div key={i}>
            <BookCard data={e} />
            </div>) )}
        </div>
    </div>
  )
}

export default RecentlyAdded