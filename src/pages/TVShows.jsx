import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ShowCard from "../components/ShowCard";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router";
const TVShows = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showList, setShowList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchShows = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/tv/top_rated?language=en-US&page=1`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error);
        setShowList([]);
        return;
      }

      setShowList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies:`, error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-10 md:pt-0">
        <div className="wrapper">
          <header className="flex items-center"></header>

          <section className="all-movies px-10 md:px-20 text-white">
            <h1 className="text-4xl font-bold">TV Shows</h1>

            {isLoading ? (
              <Spinner className="h-8 w-8 fixed top-1/2 left-1/2" />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {showList.map((show) => (
                  <ShowCard
                    key={show.id}
                    show={show}
                    onClick={() => navigate(`/tv/${show.id}`)}
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

export default TVShows;
