import React from 'react'

import { useParams } from 'react-router';
import Navbar from '../components/Navbar';

const WatchMovie = () => {
      const { id } = useParams();
  return (
    <>
    <Navbar/>
    <div className='flex justify-center w-full h-full mt-10 sm:mt-0'>
<div className="aspect-video w-full">
  <iframe
    src={`https://vidlink.pro/movie/${id}`}
    allowFullScreen
    className="w-full h-full"
    title="Movie Player"
  />
</div>
    </div>
    </>
  )
}

export default WatchMovie