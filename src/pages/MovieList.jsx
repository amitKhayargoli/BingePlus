import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useNavigate } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import "../index.css"; // optional for styles
import Navbar from "../components/Navbar";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieList = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&vote_count.gte=1000&with_genres=35`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
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
      <main className="pt-10 md:pt-0">
        <div className="wrapper">
          <header className="flex items-center"></header>

          <section className="all-movies px-10 md:px-20 text-white">
            <h1 className="text-4xl font-bold">Movies</h1>

            {isLoading ? (
              <Spinner className="h-8 w-8 fixed top-1/2 left-1/2" />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => navigate(`/movies/${movie.id}`)}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default MovieList;
