import React, { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

import Navbar from "../components/Navbar";
import hero from "/thunderbolts.png";
import { useNavigate } from "react-router";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import icon from "/icon.png";
import info from "/Info.png";
import CardSlider from "../components/CardSlider";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [netflixList, setNetflixList] = useState([]);
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [recentlyAiredTVList, setRecentlyAiredTVList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [romComList, setRomComList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/trending/movie/day?language=en-US`;
      const endpoint2 = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
      const endpoint3 = `${API_BASE_URL}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=1000`;

      //Rom com movies
      const endpoint4 = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749,35&vote_count.gte=400`;
      const endpoint5 = `${API_BASE_URL}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_providers=8&with_genres=80&watch_region=US`;

      const response = await fetch(endpoint, API_OPTIONS);
      const response2 = await fetch(endpoint2, API_OPTIONS);
      const response3 = await fetch(endpoint3, API_OPTIONS);
      const response4 = await fetch(endpoint4, API_OPTIONS);
      const response5 = await fetch(endpoint5, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      const data4 = await response4.json();
      const data5 = await response5.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      }
      if (data.Response2 === "False") {
        setErrorMessage(data.Error);
        setTopRatedList([]);
        return;
      }

      if (data3.Response === "False") {
        setErrorMessage(data3.Error);
        setTvList([]);
        return;
      }

      if (data4.Response === "False") {
        setErrorMessage(data4.Error);
        setRomComList([]);
        return;
      }

      if (data5.Response === "False") {
        setErrorMessage(data5.Error);
        setNetflixList([]);
        return;
      }

      setMovieList(data.results || []);
      console.log(movieList);
      setTopRatedList(data2.results || []);
      setTvList(data3.results || []);
      setRomComList(data4.results || []);
      setNetflixList(data5.results || []);
    } catch (error) {
      console.error(`Error fetching movies:`, error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center movie-details text-white bg-[url(/thunderbolts.png)] lg:aspect-auto h-[40vh] bg-cover sm:bg-cover sm:h-[95vh]">
        {/* <img className='lg:aspect-auto w-auto object-cover ' src={hero} onLoad={() => setIsBackdropLoaded(true)}  alt="" /> */}

        <div className="p-2 sm:p-5 md:p-10 text-center flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-bold gray-gradient">
            Thunderbolts*
          </h1>
          <p className="hidden sm:block w-100 md:w-150 text-lg font-extralight">
            After finding themselves ensnared in a death trap, seven
            disillusioned castoffs must embark on a dangerous mission that will
            force them to confront the darkest corners of their pasts.
          </p>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row text-sm md:text-md gap-0 md:gap-4 justify-center">
            <div
              onClick={() => navigate("/movies/986056")}
              className="mt-2 cursor-pointer flex px-2 py-3 md:p-4 bg-white text-black font-semibold rounded-xl items-center"
            >
              <img className="w-[12px] h-[15px] mx-2" src={icon} alt="" />
              <h1>Watch Now</h1>
            </div>
            <div
              onClick={() => navigate("/movies/986056")}
              className="mt-2 cursor-pointer flex px-2 py-3 md:p-4 bg-black text-white font-semibold rounded-xl items-center"
            >
              <img className="w-[20px] h-[20px] mx-2" src={info} alt="" />
              <h1>Details</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-5">

        <CardSlider title="Trending Now" movieList={movieList} isLoading={isLoading} errorMessage={errorMessage} />
        <CardSlider title="Top Rated" movieList={topRatedList} isLoading={isLoading} errorMessage={errorMessage} />
        <CardSlider title="Popular TV Shows" tvList={tvList} isLoading={isLoading} errorMessage={errorMessage} />
        <CardSlider title="Romantic Comedy Movies" movieList={romComList} isLoading={isLoading} errorMessage={errorMessage} />
        <CardSlider title="Netflix Originals" tvList={netflixList} isLoading={isLoading} errorMessage={errorMessage} />
      </div>
    </>
  );
};

export default Home;
