import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between px-5 py-2'>
     <h1 onClick={()=>navigate('/')} class="cursor-pointer text-xl text-gradient">
  Binge+
</h1>
<ul className='hidden text-white md:flex gap-8'>
    <li onClick={()=>navigate('/movies')} className="cursor-pointer text-sm gray-gradient">Movies</li>
    <li className="cursor-pointer text-sm gray-gradient">TV Shows</li>
    <li className="cursor-pointer text-sm gray-gradient">Collections</li>

</ul>

<ul>
    <li className="hidden md:flex text-md text-gradient">Search Movies</li>

</ul>
    </div>
  )
}

export default Navbar