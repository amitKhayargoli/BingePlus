import React from "react";
import tick from "/tick.png";

const Episodes = ({ episode, show, season, onClick, isCurrentlyPlaying }) => {
  if (!episode) return null;
  return (
    <div
      onClick={onClick}
      className={`relative mb-4 cursor-pointer group ${isCurrentlyPlaying ? '' : ''}`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/original/${episode.still_path}`
              : show && show.poster_path
                ? `https://image.tmdb.org/t/p/original/${show.poster_path}`
                : ""
          }
          alt={episode.name}
          className={`w-full object-cover rounded-lg transition-all duration-250 ${isCurrentlyPlaying ? 'brightness-75' : ''} group-hover:brightness-50`}
        />
        
        {/* Episode number overlay that appears on hover (only for non-playing episodes) */}
        {!isCurrentlyPlaying && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <div className="text-white font-bold text-xl bg-opacity-50 px-4 py-2 rounded-lg">
              S{season} E{episode.episode_number}
            </div>
          </div>
        )}
        
        {/* Now Playing indicator */}
        {isCurrentlyPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#00000082] z-10">
            <div className="text-white font-bold text-lg px-4 py-2 rounded-lg text-center">
              Now Playing<br />S{season} E{episode.episode_number}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Episodes;