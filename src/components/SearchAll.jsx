import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Search } from 'lucide-react'
import MovieCard from './MovieCard';
import Spinner from "./Spinner";
import { useDebounce } from 'react-use';
import { useNavigate } from 'react-router';
const SearchAll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [search,setSearch] = useState("");
  const[movieList,setMovieList] = useState([]);

  useDebounce(()=> setDebouncedSearchTerm(search),600,[search]);
const navigate = useNavigate();

  const handleChange = (e) =>{
    setSearch(e.target.value);
  }
const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };


  const searchMovies = async(query)=>{
    setIsLoading(true);
    try {
      const endpoint = `${API_BASE_URL}/search/multi?query=${encodeURIComponent(query)} & language=en-US`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      }

    const filteredResults = data.results.filter((item) => {
      const isValidType = item.media_type === 'movie' || item.media_type === 'tv';
      const isValidLanguage = item.original_language === 'en' || item.original_language === 'hi' || item.original_language === 'ja' ;

      const hasValidTitle = item.title !== 'NA' && item.name !== 'NA' && (item.title || item.name);
      const hasValidOverview = item.overview && item.overview !== 'NA';
      const hasValidPoster = item.poster_path && item.poster_path !== 'NA';

      return isValidType && isValidLanguage && hasValidTitle && hasValidOverview && hasValidPoster;
    });
      setMovieList(filteredResults || []);

    } catch (error) {
      console.error(`Error fetching movies:`, error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    searchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm]);



  return (
    <>
    <Navbar></Navbar>
    <div className='search flex flex-col gap-4 px-10 py-30 xl:px-60  md:pt-14 md:pt-0"' >
        <h1 className='text-3xl font-semibold text-white'>Search </h1>
        
        <div className='text-white'>

        <span className='border-1 px-4 rounded-sm flex gap-2 items-center border-gray-400 py-3'>
      <Search></Search>
          <input type="text" onChange={handleChange} className='w-full text-lg outline-none ' placeholder='Search for Movies'/>
        </span>

        </div>
      <div className='w-full flex justify-center items-center'>


      {search== "" ? (

        <div className='text-white flex flex-col items-center mt-30'>
        <Search size={36}></Search>
        <h1 className='text-xl text-center md:text-2xl'>Search for movie titles, or use filters to explore</h1>
      </div>
      ) : isLoading == true ? 
      
      (
   
 <Spinner className="h-8 w-8" />

      ) 
      :
      (
        // Movies List
        <ul className='grid grid-cols-1 gap-3 gap-y-20 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5;'>
          {movieList.map((movie) =>( 
            <MovieCard 
            key={movie.id}
            movie={movie}
            onClick={()=>navigate(`/movies/${movie.id}`)}/>
          ))}
          

          </ul>
      )
  }
    </div>
      </div>
    </>
  )
}

export default SearchAll