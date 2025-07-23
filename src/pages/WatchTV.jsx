import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
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

const WatchTV = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // For S1.E1 label
  const [currentLabel, setCurrentLabel] = useState("");

  // Fetch show and seasons
  const fetchShow = async () => {
    const response = await fetch(`${API_BASE_URL}/tv/${id}`, API_OPTIONS);
    const data = await response.json();
    // Filter out specials
    const filteredSeasons = (data.seasons || []).filter(
      (s) => s.season_number !== 0,
    );
    setShow(data);
    setSeasons(filteredSeasons);
    setSelectedSeason(
      filteredSeasons.length > 0 ? filteredSeasons[0].season_number : null,
    );
  };

  // Fetch episodes for selected season
  const fetchEpisodes = async (seasonNumber) => {
    if (!seasonNumber) return;
    const response = await fetch(
      `${API_BASE_URL}/tv/${id}/season/${seasonNumber}`,
      API_OPTIONS,
    );
    const data = await response.json();
    setEpisodes(data.episodes || []);
    // Auto-select first episode if none selected
    if (!selectedEpisode && data.episodes && data.episodes.length > 0) {
      setSelectedEpisode(data.episodes[0]);
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

  // When episodes change, auto-select first if not already selected
  useEffect(() => {
    if (
      episodes.length > 0 &&
      (!selectedEpisode || !episodes.find((e) => e.id === selectedEpisode.id))
    ) {
      setSelectedEpisode(episodes[0]);
    }
  }, [episodes]);

  // Update the S1.E1 label whenever selectedSeason or selectedEpisode changes
  useEffect(() => {
    if (selectedSeason && selectedEpisode) {
      setCurrentLabel(
        `S${selectedSeason}.E${selectedEpisode.episode_number}`
      );
    } else {
      setCurrentLabel("");
    }
  }, [selectedSeason, selectedEpisode]);

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] mt-20 md:mt-0 flex-wrap">
        {/* Left: Video Player */}
        <div className="flex-grow bg-black flex h-100 items-center justify-center flex-col">
          {/* Currently Watching Label */}
          {selectedEpisode && (
            <div className="w-full h-full flex flex-col items-center">
              <iframe
                src={`https://vidlink.pro/tv/${id}/${selectedSeason}/${selectedEpisode.episode_number}?secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`}
                allowFullScreen
                className="w-full h-full rounded-lg border-none"
                title={selectedEpisode.name}
              />
            </div>
          )}
        </div>

        {/* Right: Episodes List */}
        <div className="w-full md:max-w-md bg-black flex flex-col h-full md:overflow-y-auto p-3 hide-scrollbar">
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
                <Episodes episode={ep} show={show} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchTV;
