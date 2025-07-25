import React from "react";
import tick from "/tick.png";
import { useNavigate } from "react-router";

const Episodes = ({ episode, show, season }) => {
  const navigate = useNavigate();
  if (!episode) return null;
  return (
    <div
      onClick={() =>
        navigate(`/watchshow/${show.id}/${season}/${episode.episode_number}`)
      }
      className="flex flex-col md:flex-row item s-center bg-[var(--watch-tv-sidebar-fg)] rounded-xl py-4 px-4 md:px-6 mb-4 shadow-sm hover:bg-[#232323] transition-all duration-200 w-full cursor-pointer"
    >
      <div className="flex flex-col items-center md:mr-6 min-w-[80px] w-full md:w-auto mb-2 md:mb-0">
        <img
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/original/${episode.still_path}`
              : show && show.poster_path
                ? `https://image.tmdb.org/t/p/original/${show.poster_path}`
                : ""
          }
          alt={episode.name}
          className="rounded-lg w-full   max-w-[300px] object-cover border border-[#232323] mb-2"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
          <h1 className="text-white text-base md:text-lg font-bold break-words">
            {episode.name || "Episode"}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {/* <span className='text-green-400 text-xs md:text-sm font-semibold'>✔ Watched</span> */}
            {/* <button className='text-xs text-gray-400 hover:text-white'>Mark Unwatched</button> */}
            {/* <button className='ml-2 bg-white text-black rounded px-3 py-1 flex items-center gap-1 text-xs md:text-sm font-semibold hover:bg-gray-200'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M4 4l12 6-12 6V4z' />
              </svg>
              Play
            </button> */}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs mt-1">
          {episode.runtime ? `${episode.runtime}m` : ""}{" "}
          {episode.air_date && <>• {episode.air_date}</>}
        </div>
        <p className="text-[#b0b0b0] text-xs md:text-sm mt-2 break-words">
          {episode.overview.slice(0, 60) + "..." || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default Episodes;
