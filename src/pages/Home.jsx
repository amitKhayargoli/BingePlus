import React, { useEffect, useState } from 'react'
import { Spinner } from "@material-tailwind/react";

import Navbar from '../components/navbar'
import hero from "/thunderbolts.png";
import { useNavigate } from 'react-router';
import MovieCard from '../components/MovieCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import icon from "/icon.png"
import info from "/Info.png"
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};


const Home = () => {

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint =`${API_BASE_URL}/trending/movie/day?language=en-US`;
      const endpoint2 = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
      const response = await fetch(endpoint, API_OPTIONS);
      const response2 = await fetch(endpoint2,API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      const data2 = await response2.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      }
      if (data.Response2 === 'False') {
        setErrorMessage(data.Error);
        setTopRatedList([]);
        return;
      }

      setMovieList(data.results || []);
      setTopRatedList(data2.results || []);
    } catch (error) {
      console.error(`Error fetching movies:`, error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
    fetchMovies();
  }, []);



  return (
    <>
    <Navbar/>
 <div className="relative flex flex-col justify-center movie-details text-white">
      <img className='lg:aspect-auto w-auto aspect-[9/16] object-cover' src={hero} alt="" />

 <div className="p-2 sm:p-5 md:p-10 absolute">
    <h1 className="text-2xl sm:text-4xl font-bold gray-gradient">Thunderbolts*</h1>
      <p className='w-80 md:w-110 text-sm font-extralight'>After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.</p>
      
      {/* Buttons */}
      
    <div className='flex gap-4'>
        
      <div className='cursor-pointer w-[130px] flex p-3 bg-white text-black font-semibold rounded-xl items-center'>
        <img className='w-[12px] h-[15px] mr-2' src={icon} alt="" />
        <h1>Watch Now</h1>
      </div>
      <div onClick={()=>navigate('/movies/986056')}  className='cursor-pointer w-[100px] flex p-3 bg-black text-white font-semibold rounded-xl items-center'>
        <img className='w-[15px] h-[15px] mr-2' src={info} alt="" />
        <h1>Details</h1>
      </div>
    </div>
      </div>

    </div>


 
       <section className="all-movies px-5 mb-8">
          <h2 className='text-xl font-bold'>Trending Now</h2>

                {isLoading ? (
                    // <Spinner />
                          <Spinner className="h-8 w-8" />
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <div>
                    <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        breakpoints={{
            320:{
                slidesPerView:2,
            },
             640: {
      slidesPerView: 3,
    },

    768: {
      slidesPerView: 3,
    },

    1024: {
      slidesPerView: 4,
    },

    1280: {
      slidesPerView: 5,
    },
        }}
        navigation
        loop={movieList.length > 5} 
        className="mySwiper"
        >
        {movieList.map((movie) => (
            <SwiperSlide key={movie.id}>
            <MovieCard
                movie={movie}
                onClick={() => navigate(`/movies/${movie.id}`)}
            />
            </SwiperSlide>
        ))}
        </Swiper>
            </div>
          )}
        </section>
 
       <section className="all-movies px-5">
          <h2 className='text-xl font-bold'>Top Rated</h2>

                {isLoading ? (
      <Spinner className="h-8 w-8" />

                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <div>
                    <Swiper
        modules={[Navigation]}
        spaceBetween={10}
       breakpoints={{
            320:{
                slidesPerView:2,
            },
             640: {
      slidesPerView: 3,
    },

    768: {
      slidesPerView: 3,
    },

    1024: {
      slidesPerView: 4,
    },

    1280: {
      slidesPerView: 5,
    },
        }}
        navigation
        loop={topRatedList.length > 5} 
        className="mySwiper"
        >
        {topRatedList.map((movie) => (
            <SwiperSlide key={movie.id}>
            <MovieCard
                movie={movie}
                onClick={() => navigate(`/movies/${movie.id}`)}
            />
            </SwiperSlide>
        ))}
        </Swiper>
            </div>
          )}
        </section>


    </>
  )
}

export default Home