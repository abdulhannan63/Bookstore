import React from 'react'
import heroS from '../../assets/pngwing.com.png';

const Hero = () => {
    return (
        <div className='h-screen lg:h-[75vh] flex flex-col-reverse md:flex-row  items-center justify-center my-9'>
            <div className='w-full m lg:w-3/6 flex flex-col item-center lg:items-start justify-center'> <h3 className='text-3xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
                Discover Your Next greate Read</h3>
                <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
                    Uncover captivating stories, enriching the Knowledge, and endless
                    inspiration in our curated of books
                </p>
                <div className="mt-8">
                    <button className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:text-zinc-800 rounded-full'>
                        Discover Books
                    </button>
                </div>
            </div>
            <div className='w-full mt-2 lg:w-3/6 h-auto  flex items-center justify-center mb-5'>
                <img src={heroS} className='h-[30rem]' alt="hero" />
            </div>
        </div>
    )
}

export default Hero