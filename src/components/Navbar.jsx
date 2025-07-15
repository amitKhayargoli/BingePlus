import React from 'react';
import { useNavigate } from 'react-router';
import {
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
    <li onClick={()=>navigate('/movies')} className="cursor-pointer text-sm gray-gradient flex items-center transition-all duration-200"><Film className='w-[18px] mr-1 text-white' alt="" />Movies</li>
    <li className="cursor-pointer text-sm gray-gradient flex items-center"><Tv className='w-[18px]  mr-1 text-white'  alt="" />TV Shows</li>
    <li className="cursor-pointer text-sm gray-gradient flex items-center"><Bookmark className='w-[18 px] h-[20px] text-white'   alt="" />Watchlist</li>

</ul>

<div className='md:flex items-center gap-5 hidden '>

<div className='px-2 py-1 border-1 border-gray-600 rounded-lg flex gap-2 max-w-40  '>

  <Search className='w-[22px] h-[22px]' alt="" />

  <input type="text" className='outline-none placeholder:text-white text-white ' placeholder='Start searching' />


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
      <div className='md:hidden fixed bottom-0 left-0 right-0 bg-black text-white z-50 shadow-t px-5 py-4 flex justify-between items-center'>
        
        
        <span className='flex flex-col items-center'>
          <Film onClick={() => navigate('/movies')} className="w-6 h-6 cursor-pointer " />
            <h1>Movies</h1>
          </span>

          <span className='flex flex-col items-center'>

        <Tv onClick={() => navigate('/tv')} className="w-6 h-6 cursor-pointer" />
            <h1>Shows</h1>

          </span>




<span className='flex flex-col items-center'>

        
        <Search onClick={() => navigate('/search')} className="w-6 h-6 cursor-pointer" />
               <h1>Search</h1>
</span>

<span className='flex flex-col items-center'>
        <User onClick={() => navigate('/profile')} className="w-6 h-6 cursor-pointer" />
<h1>User</h1>
</span>
      </div>




      
    </>
  );
};

export default Navbar;
