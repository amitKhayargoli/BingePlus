import React from 'react'
import Navbar from '../components/navbar'
import { useParams } from 'react-router';

const WatchMovie = () => {
      const { id } = useParams();
  return (
    <>
    <Navbar/>
    <div className='flex justify-center w-full h-full'>
        <iframe
  src={`https://vidlink.pro/movie/${id}`}
  frameborder="0"
  allowfullscreen
></iframe>
    </div>
    </>
  )
}

export default WatchMovie