import React from 'react';
import { useNavigate } from 'react-router';
import {
  Home,
  Film,
  Tv,
  Bookmark,
  Search,
  User,
  Sun,
  Moon
} from 'lucide-react';

import avatar from "/avatar.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>

    <div className='hidden bg-black sticky top-0 z-40 md:flex items-center justify-between px-5 py-3'>
     <h1 onClick={()=>navigate('/')} class="cursor-pointer text-xl text-gradient">
  Binge+
</h1>
<ul className='hidden text-white md:flex gap-8 ml-20'>
  <li
    onClick={() => navigate('/movies')}
    className="cursor-pointer text-sm flex items-center px-3 py-2 rounded-4xl transition-all duration-200 hover:bg-[#0c0c0c]  "
  >
    <Film className="w-[18px] mr-1 text-white" />
    <span className="gray-gradient">Movies</span>
  </li>

  <li
    onClick={() => navigate('/tv')}
    className="cursor-pointer text-sm flex items-center px-3 py-2 rounded-4xl transition-all duration-200 hover:bg-[#0c0c0c]"
  >
    <Tv className="w-[18px] mr-1 text-white" />
    <span className="gray-gradient">TV Shows</span>
  </li>

  <li
    onClick={() => navigate('/watchlist')}
    className="cursor-pointer text-sm flex items-center px-3 py-2 rounded-4xl transition-all duration-200 hover:bg-[#0c0c0c]"
  >
    <Bookmark className="w-[18px] h-[20px] mr-1 text-white" />
    <span className="gray-gradient">Watchlist</span>
  </li>
</ul>

<div className='md:flex items-center gap-5 hidden '>

<div className='border-1 rounded-lg flex gap-2 '>

  <Search  onClick={()=>{
    navigate("/search")
  }} className='w-[22px] h-[22px] text-white cursor-pointer' alt="" />

  {/* <input onClick={()=>{
    navigate("/search")
  }} type="text" className='outline-none placeholder:text-white text-white cursor-pointer flex-1' placeholder='Start searching' /> */}


</div>  
  <img src={avatar} className='w-[40px]' alt="" />
</div>
    </div>
  


      {/* Mobile Header*/}

      <div className='flex justify-between fixed z-50 top-0 left-0 right-0 md:hidden bg-black px-5 py-3'>

            <li className="cursor-pointer text-sm gray-gradient flex items-center"><Bookmark className='w-[18 px] h-[20px] text-white'   alt="" /></li>
     <h1 onClick={()=>navigate('/')} class="cursor-pointer text-xl text-gradient">
  Binge+
</h1>
            <li className="cursor-pointer text-sm gray-gradient flex items-center"><Sun className='w-[18 px] h-[20px] text-white'   alt="" /></li>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-[4px] text-white z-50 shadow-t px-5 py-2 flex justify-between items-center'>
        
        
        <span className='flex flex-col items-center'>
          <Home onClick={() => navigate('/')} className="w-5 h-5 cursor-pointer " />
            <h1>Home</h1>
          </span>
        <span className='flex flex-col items-center'>
          <Film onClick={() => navigate('/movies')} className="w-5 h-5 cursor-pointer " />
            <h1>Movies</h1>
          </span>

          <span className='flex flex-col items-center'>

        <Tv className="w-5 h-5 cursor-pointer" />
            <h1>Shows</h1>

          </span>




<span className='flex flex-col items-center'>

        
        <Search onClick={() => navigate('/search')} className="w-5 h-5 cursor-pointer" />
               <h1>Search</h1>
</span>

<span className='flex flex-col items-center'>
        <User  className="w-5 h-5 cursor-pointer" />
<h1>User</h1>
</span>
      </div>




      
    </>
  );
};

export default Navbar;
