import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import icon from "/icon.png";
import youtube from "/Youtube.png";
import MovieCard from "../components/MovieCard";
import LazyLoad from "react-lazyload";
import Spinner from "../components/Spinner";
import { Plus, Star, Watch } from "lucide-react";
import WatchMovie from "./WatchMovie";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [posterURL, setposterURL] = useState(null);
  const [backdropUrl, setbackdropUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [alternativeMovies, setAlternativeMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("overview");
  const [watchMovie, setWatchMovie] = useState(false);

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
      const data = await response.json();

      const response2 = await fetch(
        `${API_BASE_URL}/movie/${id}/recommendations`,
        API_OPTIONS
      );
      const data2 = await response2.json();

      if (data2.Response === "False") {
        setErrorMessage(data.Error);
        setAlternativeMovies([]);
        return;
      }
      setAlternativeMovies(data2.results || []);
      console.log(data2);
      setMovie(data);
    } catch (err) {
      console.error("Error fetching movie:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getMovieLogoPath = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${id}/images?api_key=${API_KEY}`,
        API_OPTIONS
      );
      const data = await response.json();

      const posters =
        data.posters.find((poster) => poster.iso_639_1 === "en") ||
        data.posters[0];
      setposterURL(`https://image.tmdb.org/t/p/w500${posters.file_path}`);

      const logo =
        data.logos.find((logo) => logo.iso_639_1 === "en") || data.logos[0];
      const url = data.backdrops[0].file_path;
      setbackdropUrl(`https://image.tmdb.org/t/p/w1920${url}`);

      console.log(url);
      if (logo) {
        return `https://image.tmdb.org/t/p/original${logo.file_path}`;
      }
      return null;
    } catch (err) {
      console.error("Error fetching logo:", err);
      return null;
    }
  };

  useEffect(() => {
    setMovie(null);
    setbackdropUrl(null);
    setLogoUrl(null);
    setAlternativeMovies([]);
    setIsBackdropLoaded(false);
    setWatchMovie(null);
    setposterURL(null);
    setTab("overview");

    fetchMovie();
    getMovieLogoPath()
      .then((url) => {
        setLogoUrl(url);
      })
      .catch(() => {});
  }, [id]);

  console.log(movie);

  if (!movie) return;

  const releasedYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const formatRuntime = (min) => {
    if (!min) return "N/A";
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  const formatMillions = (num) => {
    if (!num || num === 0) return "N/A";
    return `$${(num / 1_000_000).toFixed(0)}M`;
  };

  return (
    <>
      <Navbar />
      {/* Preload background image to handle isBackdropLoaded */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt="backdrop preload"
          style={{ display: "none" }}
          onLoad={() => setIsBackdropLoaded(true)}
        />
      )}
      <div
        className="movie-details text-[var(--text-secondary)] flex flex-col relative py-14 md:py-0 mt-10 md:mt-0 md:h-[80vh] w-full"
        style={{
          backgroundImage:
            backdropUrl && isBackdropLoaded && !watchMovie
              ? `url(${backdropUrl})`
              : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "16/9",
        }}
      >
        {/* Gradient overlays */}
        {!watchMovie && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
          </>
        )}

        {/* Backdrop area: either video or details */}
        {watchMovie ? (
          <div
            className="w-full h-full min-h-[400px] flex items-center justify-center z-10"
            style={{ aspectRatio: "16/9" }}
          >
            <WatchMovie id={id} />
          </div>
        ) : isBackdropLoaded && !watchMovie ? (
          <div className="flex gap-2 md:gap-8 z-10 h-45 md:h-80 w-full pl-5 md:pl-25 mt-20 text-[var(--secondary)]">
            <img src={posterURL} className="w-30 md:w-55 rounded-lg" alt="" />
            <div className="flex flex-col gap-3">
              <h1 className="md:text-4xl font-bold">{movie.title}</h1>
              <h1 className="text-sm text-[var(--text-secondary)]">
                {releasedYear} • {formatRuntime(movie.runtime)}
              </h1>
              <h1 className="">"{movie.tagline}"</h1>
              <span className="flex gap-2">
                <h1>{movie.vote_average.toFixed(1)}</h1>
                <h1>IMDB Rating</h1>
              </span>
              <h1 className="w-3/5 hidden md:flex">{movie.overview}</h1>

              <div className="md:flex flex-col md:flex-row gap-4 hidden ">
                <div
                  onClick={() => setWatchMovie(true)}
                  className="cursor-pointer flex  items-center justify-center gap-2 bg-[var(--secondary)] px-6 rounded-lg transition duration-300"
                >
                  <img src={icon} alt="YouTube" className="w-3 h-3" />
                  <h1 className="text-[var(--primary)] font-medium">
                    Watch Now{" "}
                  </h1>
                </div>
                <div className="cursor-pointer flex items-center justify-center gap-2  bg-[var(--primary)] border-1 border-gray-200 px-4 py-3 rounded-lg transition duration-300">
                  <Plus></Plus>
                  <h1 className="text-[var(--secondary)] font-medium">
                    Add to Watchlist
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        )}
      </div>
      {/* Watch now and other controls */}
      <div className="text-[var(--text-secondary)] flex flex-col gap-2 px-5 mt-4 ">
        {/* Watch now Button */}
        <div className="flex flex-col md:flex-row gap-4 md:hidden">
          <div
            onClick={() => setWatchMovie(true)}
            className="cursor-pointer flex flex-1 items-center justify-center gap-2 bg-[var(--secondary)] px-4 py-3 rounded-xl transition duration-300"
          >
            <img src={icon} alt="YouTube" className="w-3 h-3" />
            <h1 className="text-[var(--primary)] font-semibold">Watch Now </h1>
          </div>
          <div className="cursor-pointer flex flex-1 items-center justify-center gap-2  bg-[var(--primary)] border-1 border-gray-200 px-4 py-3 rounded-xl transition duration-300">
            <Plus></Plus>
            <h1 className="text-[var(--text-primary)] font-semibold">
              Watchlist
            </h1>
          </div>
        </div>
        <div>
          <h1 className="md:hidden">{movie.overview}</h1>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex text-md font-semibold border-b-2 border-[var(--maintab-border)]">
            <button
              onClick={() => setTab("overview")}
              className={
                tab == "overview"
                  ? `border-b-2 flex-1 p-2 border-[var(--secondary)]`
                  : `flex-1 p-2`
              }
            >
              Overview
            </button>
            <button
              onClick={() => setTab("cast")}
              className={
                tab == "cast"
                  ? `border-b-2 flex-1 p-2 border-[var(--secondary)]`
                  : `flex-1 p-2`
              }
            >
              Cast
            </button>
            <button
              onClick={() => setTab("reviews")}
              className={
                tab == "reviews"
                  ? `border-b-2 flex-1 p-2 border-[var(--secondary)]`
                  : `flex-1 p-2`
              }
            >
              Reviews
            </button>
          </div>
          {tab === "overview" && (
            <div className="p-4 bg-linear-to-r from-[#0A0A0A] rounded-xl border-2 border-[#282727]">
              <h1 className="text-xl font-bold text-[var(--secondary)]">
                Movie Details
              </h1>
              <span className="flex justify-between">
                <h1 className="">Release Date </h1>
                <h1 className="text-[var(--secondary)]">
                  {movie.release_date}
                </h1>
              </span>
              <span className="flex justify-between">
                <h1 className="text-textgray">Status</h1>
                <h1 className="text-[var(--text-secondary)]">{movie.status}</h1>
              </span>
              <span className="flex justify-between">
                <h1 className="text-textgray">Runtime</h1>
                <h1 className="text-[var(--text-secondary)]">
                  {formatRuntime(movie.runtime)}
                </h1>
              </span>
              <span className="flex justify-between">
                <h1 className="text-textgray">Budget</h1>
                <h1 className="text-[var(--text-secondary)]">
                  {formatMillions(movie.budget)}
                </h1>
              </span>
              <span className="flex justify-between">
                <h1 className="text-textgray">Revenue</h1>
                <h1 className="text-[var(--text-secondary)]">
                  {formatMillions(movie.revenue)}
                </h1>
              </span>
              <span className="flex justify-between">
                <h1 className="text-textgray">Language</h1>
                <h1 className="text-[var(--text-secondary)]">
                  {movie.original_language}
                </h1>
              </span>
            </div>
          )}
          <div></div>
        </div>
      </div>
      {/* Recommendations only after backdrop is loaded ? Now I am updating it to show recommendations before the backdrop is loaded*/}
      {!watchMovie && (
        <div className="all-movies text-[var(--text-secondary)] text-xl font-bold px-12">
          <h1>Recommended For You</h1>
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {alternativeMovies.slice(0, 5).map((movie) => (
              <img
                key={movie.id}
                loading="lazy"
                className="rounded-lg cursor-pointer"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
