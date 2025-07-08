import React from 'react'

// const textgradient = "font-bold bg-gradient-to-b from-white to-black bg-clip-text text-transparent";
const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-5'>
     <h1 class="text-2xl text-gradient">
  Binge+
</h1>
<ul className='text-white flex gap-8'>
    <li className="text-xl gray-gradient">Home</li>
    <li className="text-xl gray-gradient">Movies</li>
    <li className="text-xl gray-gradient">TV Shows</li>
    <li className="text-xl gray-gradient">Collections</li>

</ul>

<ul>
    <li className="text-xl text-gradient">Search Movies</li>

</ul>
    </div>
  )
}

export default Navbar