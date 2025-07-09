import React from 'react'

import { useParams } from 'react-router';
import Navbar from '../components/navbar';

const WatchMovie = () => {
      const { id } = useParams();
  return (
    <>
    <Navbar/>
    <div className='flex justify-center w-full h-full'>
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