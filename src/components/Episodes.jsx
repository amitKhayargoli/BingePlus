import React from 'react'
import tick from "/tick.png";

const Episodes = ({show}) => {

    
  return (
            <div className='bg-darksecondary w-full h-full flex p-4 gap-2 rounded-lg'>
          
          <div className=' bg-[#1a1a1a] flex-1 h-1/2'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.name}
              className='w-full object-cover rounded-lg h-1/2 aspect-[16/9]'
            />

          </div>

          <div className='flex-2'>
            <h1 className='text-lg md:text-xl font-bold'>Pilot</h1>
            
            <h1 className='flex gap-2 w-full text-textgray'>Episode 1 • 52m </h1>
            <img src={tick} alt="" /> 

            <h1 className='text-[#8E8E8E]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
          </div>

        </div>
  )
}

export default Episodes