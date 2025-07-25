import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import icon from "/icon.png";
import youtube from "/Youtube.png";
import Spinner from "../components/Spinner";
import { Plus, Star } from "lucide-react";
import tick from "/tick.png";
import Episodes from "../components/Episodes";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const TVDetails = () => {
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [backdropUrl, setBackdropUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [alternativeShows, setAlternativeShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const fetchShow = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/tv/${id}`, API_OPTIONS);
      const data = await response.json();
      // Filter out specials (season_number === 0)
      const filteredSeasons = (data.seasons || []).filter(
        (s) => s.season_number !== 0
      );
      setSeasons(filteredSeasons);
      setSelectedSeason(
        filteredSeasons.length > 0 ? filteredSeasons[0].season_number : null
      );

      const response2 = await fetch(
        `${API_BASE_URL}/tv/${id}/recommendations`,
        API_OPTIONS
      );
      const data2 = await response2.json();
      setAlternativeShows(data2.results || []);
      setShow(data);
    } catch (err) {
      console.error("Error fetching show:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getShowLogoPath = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/tv/${id}/images?api_key=${API_KEY}`,
        API_OPTIONS
      );
      const data = await response.json();
      const logo =
        data.logos.find((logo) => logo.iso_639_1 === "en") || data.logos[0];
      const url =
        data.backdrops && data.backdrops[2]
          ? data.backdrops[2].file_path
          : data.backdrops && data.backdrops[0]
            ? data.backdrops[0].file_path
            : null;
      if (url) setBackdropUrl(`https://image.tmdb.org/t/p/w1920${url}`);
      if (logo) {
        return `https://image.tmdb.org/t/p/original${logo.file_path}`;
      }
      return null;
    } catch (err) {
      console.error("Error fetching logo:", err);
      return null;
    }
  };

  const fetchEpisodes = async (seasonNumber) => {
    if (!seasonNumber) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/tv/${id}/season/${seasonNumber}`,
        API_OPTIONS
      );
      const data = await response.json();
      setEpisodes(data.episodes || []);
    } catch (err) {
      setEpisodes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setShow(null);
    setBackdropUrl(null);
    setLogoUrl(null);
    setAlternativeShows([]);
    setIsBackdropLoaded(false);
    setSeasons([]);
    setSelectedSeason(null);
    setEpisodes([]);
    fetchShow();
    getShowLogoPath()
      .then((url) => {
        setLogoUrl(url);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (selectedSeason) {
      fetchEpisodes(selectedSeason);
    }
  }, [selectedSeason, id]);

  if (!show) return;

  const releasedYear = show.first_air_date
    ? show.first_air_date.split("-")[0]
    : "N/A";

  const formatRuntime = (arr) => {
    if (!arr || arr.length === 0) return "N/A";
    const min = arr[0];
    const m = min % 60;
    return `${m}m`;
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
        className="overflow-hidden mt-10 md:mt-0 movie-details text-[var(--text-primary)] flex flex-col justify-center items-center relative min-h-[60vh] md:min-h-[80vh] py-14 md:py-0"
        style={{
          backgroundImage:
            backdropUrl && isBackdropLoaded ? `url(${backdropUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* inside image div */}
        {isBackdropLoaded ? (
          <div className="flex flex-col">
            <div className="text-center flex flex-col items-center md:mt-20 gap-5 px-4 z-10 w-full">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${show.name}`}
                  className="mx-auto max-w-xs object-contain"
                />
              ) : (
                <h1 className="text-4xl font-bold">{show.name}</h1>
              )}

              <h1 className="text-[#616161] font-semibold">
                {releasedYear} • {formatRuntime(show.episode_run_time)}
              </h1>

              <div className="flex gap-4">
                <div
                  onClick={() =>
                    navigate(
                      `/watchshow/${id}/${selectedSeason}/${episodes[0].episode_number}`
                    )
                  }
                  className="cursor-pointer flex p-3 bg-[var(--secondary)] text-black font-semibold rounded-lg items-center"
                >
                  <img className="w-3 mr-2" src={icon} alt="Watch Icon" />
                  <h1 className="text-sm">Watch Now</h1>
                </div>
                <div className="cursor-pointer flex p-3 bg-black text-[var(--text-primary)] font-semibold rounded-lg items-center">
                  {/* <img className="w-5 mr-2" src={youtube} alt="YouTube Icon" /> */}
                  <Plus className="text-[var(--text-primary)] w-5 mr-2" />
                  <h1 className="text-sm">Watchlist</h1>
                </div>
              </div>

              <div>
                <h1 className="text-[#ffffff]">
                  {Number(show.vote_average?.toFixed(1))} IMDB Rating
                </h1>

                <h1 className="italic text-[#737373]">"{show.tagline}"</h1>
              </div>

              <div className="md:w-160 max-w-3xl">
                <h1 className="font-semibold">Synopsis</h1>
                <p className="text-[#8E8E8E]">{show.overview}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        )}
      </div>

      <div className="px-10 md:px-15 lg:px-20 text-[var(--text-primary)] flex flex-col gap-5 mt-10">
        <div className="flex gap-5">
          <h1 className="text-[var(--text-primary)] text-lg md:text-2xl font-semibold  border-b-3">
            Episodes
          </h1>
          <h1 className="text-[var(--text-primary)] text-lg  md:text-2xl font-semibold  ">
            Details
          </h1>
          <h1 className="text-[var(--text-primary)] text-lg  md:text-2xl font-semibold  ">
            Cast & Crew
          </h1>
        </div>
        <div className="text-[var(--text-primary)] md:text-lg font-bold flex flex-wrap md:flex-row items-center gap-4">
          <h1 className="text-[var(--text-primary)]">Select Season:</h1>
          {seasons.map((season) => (
            <button
              key={season.id}
              className={
                selectedSeason === season.season_number
                  ? "text-black p-3 bg-[var(--season-active)] rounded-lg font-semibold"
                  : "text-[var(--text-primary)] p-3 bg-[var(--season-inactive)] rounded-lg font-semibold"
              }
              onClick={() => setSelectedSeason(season.season_number)}
            >
              {season.name}
            </button>
          ))}
        </div>

        <div className="bg-[var(--card)] w-full p-4 rounded-lg flex flex-col items-center ">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[var(--text-primary)] text-lg font-bold">
              {seasons.find((s) => s.season_number === selectedSeason)?.name ||
                "Season"}
            </h1>
            <h1 className="">
              {episodes.length} episode{episodes.length !== 1 ? "s" : ""}
            </h1>
          </div>

          {/* Progress */}
          <h1 className="bg-[#333333] w-full rounded-lg">
            <div className="bg-[#ffffff] w-1/2 h-1 rounded-lg"></div>
          </h1>
        </div>

        <div className="flex gap-2 flex-wrap">
          {episodes.map((ep) => (
            <Episodes
              key={ep.id}
              episode={ep}
              show={show}
              season={selectedSeason}
            />
          ))}
        </div>

        {isBackdropLoaded && (
          <div className="all-movies text-[var(--text-primary)] text-xl font-bold">
            <h1>Recommended For You</h1>
            <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
              {alternativeShows.slice(0, 5).map((tv) => (
                <img
                  key={tv.id}
                  loading="lazy"
                  className="rounded-lg cursor-pointer"
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                  onClick={() => navigate(`/tv/${tv.id}`)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Seasons */}

      {/* Recommendations only after backdrop is loaded */}
    </>
  );
};

export default TVDetails;
