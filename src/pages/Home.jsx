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
import { Info } from "lucide-react";
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

      const responses = await Promise.all([
        fetch(endpoint, API_OPTIONS),
        fetch(endpoint2, API_OPTIONS),
        fetch(endpoint3, API_OPTIONS),
        fetch(endpoint4, API_OPTIONS),
        fetch(endpoint5, API_OPTIONS),
      ]);

      for (const response of responses) {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
      }

      const [data, data2, data3, data4, data5] = await Promise.all(
        responses.map((res) => res.json())
      );

      const processData = (data, setter, listName) => {
        if (data.Response === "False") {
        setErrorMessage(data.Error);
        setter([]);
        return false;
      }
      const resultsWithBlurHash = data.results.map(item => ({
        ...item,
        blur_hash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." // Placeholder blur hash
      }));
      setter(resultsWithBlurHash || []);
      return true;
    };

    if (
      processData(data, setMovieList, "movieList") &&
      processData(data2, setTopRatedList, "topRatedList") &&
      processData(data3, setTvList, "tvList") &&
      processData(data4, setRomComList, "romComList") &&
      processData(data5, setNetflixList, "netflixList")
    ) {
      // All data fetched and processed successfully
    }
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
      <div className="flex bg-[var(--primary)] flex-col justify-center items-center movie-details text-[var(--secondary)] bg-[url(/thunderbolts.png)] lg:aspect-auto h-[40vh] bg-cover sm:bg-cover sm:h-[95vh]">
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
              className="mt-2 cursor-pointer flex px-2 py-3 md:p-4 bg-[var(--button-primary)] text-black font-semibold rounded-xl items-center"
            >
              <img className="w-[12px] h-[15px] mx-2" src={icon} alt="" />
              <h1>Watch Now</h1>
            </div>
            <div
              onClick={() => navigate("/movies/986056")}
              className="mt-2 cursor-pointer flex px-2 py-3 md:p-4 bg-[var(--primary)] text-[var(--secondary)] font-semibold rounded-xl items-center gap-2"
            >
              <Info />
              <h1>Details</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-5 bg-[var(--primary)] mb-10">
        <CardSlider
          title="Trending Now"
          movieList={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <CardSlider
          title="Top Rated"
          movieList={topRatedList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <CardSlider
          title="Popular TV Shows"
          tvList={tvList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <CardSlider
          title="Romantic Comedy Movies"
          movieList={romComList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <CardSlider
          title="Netflix Originals"
          tvList={netflixList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </>
  );
};

export default Home;
