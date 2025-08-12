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

  // Handle next episode button click
  const handleNextEpisode = () => {
    if (!selectedEpisode || episodes.length === 0) return;
    
    const currentIndex = episodes.findIndex(e => e.id === selectedEpisode.id);
    if (currentIndex < episodes.length - 1) {
      // Go to next episode in current season
      const nextEpisode = episodes[currentIndex + 1];
      setSelectedEpisode(nextEpisode);
      updateUrl(selectedSeason, nextEpisode.episode_number);
    } else if (seasons.length > 0) {
      // Current episode is last in season, try to go to next season
      const currentSeasonIndex = seasons.findIndex(s => s.season_number === selectedSeason);
      if (currentSeasonIndex < seasons.length - 1) {
        // There is a next season available
        const nextSeason = seasons[currentSeasonIndex + 1].season_number;
        setSelectedSeason(nextSeason);
        // fetchEpisodes will be triggered by the useEffect, and the first episode will be selected
      }
    }
  };

  useEffect(() => {
    fetchShow();
  }, [id]);

  useEffect(() => {
    if (selectedSeason) {
      fetchEpisodes(selectedSeason);
    }
  }, [selectedSeason, id]);

  // When episodes change, or ep from url changes, select the correct episode
  useEffect(() => {
    if (episodes.length > 0) {
      const episodeFromUrl = episodes.find(
        (e) => e.episode_number == ep
      );
      if (episodeFromUrl) {
        setSelectedEpisode(episodeFromUrl);
      } else {
        setSelectedEpisode(episodes[0]);
      }
    }
  }, [episodes, ep]);

  // Listen for message events from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if the message is from our iframe and is about the next button
      if (event.data && typeof event.data === 'string') {
        // Some players send JSON strings, so we need to try parsing it
        try {
          const data = JSON.parse(event.data);
          if (data.action === 'next' || data.type === 'next' || data.command === 'next') {
            handleNextEpisode();
          }
        } catch (e) {
          // If it's not JSON, check if it's a simple string command
          if (event.data === 'nextEpisode' || event.data === 'next') {
            handleNextEpisode();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedEpisode, episodes, seasons, selectedSeason]);

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
                onLoad={() => {
                  // Add a script to the iframe to intercept the next button click
                  try {
                    const iframe = document.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                      // Override the next button click in the iframe
                      const script = document.createElement('script');
                      script.textContent = `
                        // Find and intercept the next button click
                        document.addEventListener('DOMContentLoaded', () => {
                          const nextButton = document.querySelector('.next-button, .next-episode-button, [data-action="next"]');
                          if (nextButton) {
                            nextButton.addEventListener('click', () => {
                              window.parent.postMessage('next', '*');
                            });
                          }
                          
                          // Also intercept the end of video event
                          const videoElement = document.querySelector('video');
                          if (videoElement) {
                            videoElement.addEventListener('ended', () => {
                              window.parent.postMessage('next', '*');
                            });
                          }
                        });
                      `;
                      iframe.contentDocument.head.appendChild(script);
                    }
                  } catch (e) {
                    console.error('Failed to inject script into iframe:', e);
                  }
                }}
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
                    ? "text-black bg-white px-4 py-2 rounded-lg font-semibold"
                    : "text-white px-4 py-2 rounded-lg font-semibold"
                }
                onClick={() => handleSeasonSelect(season.season_number)}
              >
                {season.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2  gap-3">
            {episodes.map((ep) => (
              <Episodes
                key={ep.id}
                onClick={() => handleEpisodeSelect(ep)}
                episode={ep}
                show={show}
                season={selectedSeason}
                isCurrentlyPlaying={selectedEpisode && selectedEpisode.id === ep.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchTV;
