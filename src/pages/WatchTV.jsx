import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Episodes from "../components/Episodes";
import { Helmet } from "react-helmet";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const WatchTV = () => {
  const navigate = useNavigate();
  const { id, season, ep } = useParams();
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // For S1.E1 label
  const [currentLabel, setCurrentLabel] = useState("");

  // Fetch show and seasons
  const fetchShow = async () => {
    const response = await fetch(`${API_BASE_URL}/tv/${id}`, API_OPTIONS);
    const data = await response.json();
    // Filter out specials
    const filteredSeasons = (data.seasons || []).filter(
      (s) => s.season_number !== 0
    );
    setShow(data);
    setSeasons(filteredSeasons);
    setSelectedSeason(
      filteredSeasons.length > 0 ? filteredSeasons[0].season_number : null
    );
  };

  // Fetch episodes for selected season
  const fetchEpisodes = async (seasonNumber) => {
    if (!seasonNumber) return;
    const response = await fetch(
      `${API_BASE_URL}/tv/${id}/season/${seasonNumber}`,
      API_OPTIONS
    );
    const data = await response.json();
    setEpisodes(data.episodes || []);

    if (!selectedEpisode && data.episodes && data.episodes.length > 0) {
      setSelectedEpisode(data.episodes[0]);
    }
  };

  const updateUrl = (newSeason, newEp) => {
    navigate(`/watchshow/${id}/${newSeason}/${newEp}`, { replace: true });
  };

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(null);

    if (episodes.length > 0) {
      updateUrl(seasonNumber, episodes[0].episode_number);
    } else {
      updateUrl(seasonNumber, 1);
    }
  };
  // When selecting an episode
  const handleEpisodeSelect = (epObj) => {
    setSelectedEpisode(epObj);
    updateUrl(selectedSeason, epObj.episode_number);
  };

  useEffect(() => {
    fetchShow();
  }, [id]);

  useEffect(() => {
    if (selectedSeason) {
      fetchEpisodes(selectedSeason);
    }
  }, [selectedSeason, id]);

  // When episodes change, auto-select first if not already selected
  useEffect(() => {
    if (
      episodes.length > 0 &&
      (!selectedEpisode || !episodes.find((e) => e.id === selectedEpisode.id))
    ) {
      setSelectedEpisode(ep);
    }
  }, [episodes]);

  return (
    <>
      <Helmet>
        <title>{`Watch ${show?.name || ""} Season ${selectedSeason || ""}`}</title>
        <meta
          property="og:title"
          content={`Watch ${show?.name || ""} Season ${selectedSeason || ""}`}
        />
        <meta
          property="og:description"
          content={`Stream ${show?.name || ""} Season ${selectedSeason || ""} online for free!`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      {/* <Navbar />   */}
      <div className="flex h-[100vh] md:mt-0 flex-wrap relative overflow-hidden">
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Left: Video Player */}
        <div
          className={`${sidebarOpen ? "md:mr-80" : ""} flex-grow bg-black flex items-center justify-center flex-col transition-all duration-300 w-full`}
        >
          {/* Sidebar Toggle Button (always visible) */}
          {!sidebarOpen && (
            <button
              className="fixed top-0 right-0 z-50 bg-[#232323] text-white px-3 py-2 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              Show Episodes
            </button>
          )}
          {/* Currently Watching Label */}
          {selectedEpisode && (
            <div className="w-full h-full flex flex-col items-center">
              <iframe
                src={`https://vidlink.pro/tv/${id}/${season}/${ep}?secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`}
                allowFullScreen
                className="w-full h-full border-none"
                title={selectedEpisode.name}
              />
            </div>
          )}
        </div>

        {/* Right: Episodes List (Collapsible Sidebar) */}
        <div
          className={`fixed bg-linear-to-b from-[#181818] top-0 right-0 h-full w-90 hover:w-120 max-w-full bg-black flex flex-col overflow-y-auto p-3 hide-scrollbar z-40 transition-all duration-300 transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Collapse Button (always visible) */}
          <button
            className="absolute top-2 right-2 z-50 bg-[#232323] text-white px-2 py-1 rounded-md shadow-lg"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </button>
          <h1 className="text-2xl font-bold text-white mb-4">Episodes</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {seasons.map((season) => (
              <button
                key={season.id}
                className={
                  selectedSeason === season.season_number
                    ? "text-black px-4 py-2 bg-white rounded-lg font-semibold"
                    : "text-white px-4 py-2 bg-[#232323] rounded-lg font-semibold"
                }
                onClick={() => {
                  setSelectedSeason(season.season_number);
                  setSelectedEpisode(null);
                }}
              >
                {season.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {episodes.map((ep) => (
              <div key={ep.id} onClick={() => setSelectedEpisode(ep)}>
                <Episodes episode={ep} show={show} season={season} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchTV;
